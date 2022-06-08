#!/usr/bin/env node

import SwaggerParser from "@apidevtools/swagger-parser"
import fs from "fs"
import { exit } from "process"
import { OpenAPIV3_1 } from "openapi-types"
import { compile, JSONSchema } from "json-schema-to-typescript"
import Ajv from "ajv"
import standaloneCode from "ajv/dist/standalone"
import addFormats from "ajv-formats"
import { format } from "prettier"

const validationPrefix = "validateSchema"
const validationBodyPrefix = "validateBodySchema"
const validationParameterPrefix = "validateParameterSchema"
const validationResponsePrefix = "validateResponseSchema"

function copy(e: any) {
    return JSON.parse(JSON.stringify(e))
}

function validate(apiPath: string): Promise<OpenAPIV3_1.Document> {
    return new Promise<OpenAPIV3_1.Document>((resolve, reject) => {
        SwaggerParser.validate(apiPath, (err, api) => {
            if (err) {
                reject(err)
            } else {
                resolve((api as OpenAPIV3_1.Document)!)
            }
        })
    })
}

function parse(apiPath: string): Promise<OpenAPIV3_1.Document> {
    return new Promise<OpenAPIV3_1.Document>((resolve, reject) => {
        SwaggerParser.parse(apiPath, (err, api) => {
            if (err) {
                reject(err)
            } else {
                resolve((api as OpenAPIV3_1.Document)!)
            }
        })
    })
}

function resolvePath(path: string) {
    let splitPath = path.split("/")
    if (splitPath.length > 2) {
        splitPath[0] = splitPath[1]
        splitPath[1] = "by"
    } else {
        return splitPath[1].charAt(0).toUpperCase() + splitPath[1].slice(1).toLowerCase()
    }
    return splitPath.map(el => {
        el = el.replace(/[{}]/gi, "")
        const split = el.split("_")
        return split.map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).join("")
    }).join("")
}

function formatName(name: string) {
    const split = name.split(/[ _]/)
    return split.map(el => {
        if (el.length > 1) {
            return el.charAt(0).toUpperCase() + el.slice(1)
        } else {
            return el.toUpperCase()
        }
    }).join("")
}

function formatMethodPath(path: string, method: string, upperCase: boolean = false) {
    if (upperCase)
        return method.charAt(0).toUpperCase() + method.slice(1).toLowerCase() + resolvePath(path)
    else
        return method.charAt(0).toLowerCase() + method.slice(1).toLowerCase() + resolvePath(path)
}

function schemaToTypeDefinition(schema: OpenAPIV3_1.SchemaObject): { typeDefinition: string, dependencies: Array<string> } {
    if (schema.title) {
        return { typeDefinition: formatName(schema.title), dependencies: [formatName(schema.title)] }
    }
    if (schema.allOf) {
        let type = undefined
        const typeDefinitions = []
        let dependencies: Array<string> = []
        for (const subschema of schema.allOf as Array<OpenAPIV3_1.SchemaObject>) {
            if (!type) type = subschema.type
            if (type != subschema.type) throw("Error: cannot merge types for allOf")
            const td = schemaToTypeDefinition(subschema)
            typeDefinitions.push(td.typeDefinition)
            dependencies = dependencies.concat(td.dependencies)
        }
        return { typeDefinition: typeDefinitions.join(" & "), dependencies: dependencies }
    }
    if (schema.anyOf) {
        const typeDefinitions = []
        let dependencies: Array<string> = []
        for (const subschema of schema.anyOf) {
            const td = schemaToTypeDefinition(subschema)
            typeDefinitions.push(td.typeDefinition)
            dependencies = dependencies.concat(td.dependencies)
        }
        return { typeDefinition: typeDefinitions.join(" | "), dependencies: dependencies }
    }
    if (schema.oneOf) {
        const typeDefinitions = []
        let dependencies: Array<string> = []
        for (const subschema of schema.oneOf) {
            const td = schemaToTypeDefinition(subschema)
            typeDefinitions.push(td.typeDefinition)
            dependencies = dependencies.concat(td.dependencies)
        }
        return { typeDefinition: typeDefinitions.join(" | "), dependencies: dependencies }
    }
    if (schema.enum) {
        return { typeDefinition: schema.enum.join(" | "), dependencies: [] }
    }
    if ((schema as any).const) {
        if (typeof (schema as any).const === "string")
            return { typeDefinition: `"${(schema as any).const}"`, dependencies: [] }
        else
            return { typeDefinition: `${(schema as any).const}`, dependencies: [] }
    }

    switch (schema.type) {
        case "object":
            const properties = []
            let dependencies: Array<string> = []
            if (schema.properties) {
                for (const property of Object.keys(schema.properties)) {
                    const td = schemaToTypeDefinition(schema.properties[property])
                    properties.push(`${property}: ${td.typeDefinition}`)
                    dependencies = dependencies.concat(td.dependencies)
                }
            }
            if (schema.additionalProperties && schema.additionalProperties == true) {
                properties.push("[k: string]: unknown")
            }
            return { typeDefinition: `{\n\t${properties.join("\n").replace(/\n/gi, "\n\t")}\n}`, dependencies: dependencies }

        case "array":
            const td = schemaToTypeDefinition((schema as OpenAPIV3_1.ArraySchemaObject).items)
            return { typeDefinition: `Array<${td.typeDefinition}>`, dependencies: td.dependencies }

        case "integer":
            return { typeDefinition: "number", dependencies: [] }

        case "boolean":
            return { typeDefinition: "boolean", dependencies: [] }

        case "number":
            return { typeDefinition: "number", dependencies: [] }

        case "string":
            return { typeDefinition: "string", dependencies: [] }

        case "null":
            return { typeDefinition: "null", dependencies: [] }
    }

    return { typeDefinition: "", dependencies: [] }
}

function generateBasicValidationFunctions(api: OpenAPIV3_1.Document) {
    const ajv = new Ajv({ code: { source: true, esm: true }, inlineRefs: false })
    addFormats(ajv)
    let mapping: any = {}

    if (api.components) {
        if (api.components.schemas) {
            for (const schemaName of Object.keys(api.components.schemas)) {
                const schemaId = `#/components/schemas/${schemaName}`
                ajv.addSchema(api.components.schemas[schemaName], schemaId)
                mapping[validationPrefix + formatName(schemaName)] = schemaId
            }
        }
        if (api.components.parameters) {
            for (const parameterName of Object.keys(api.components.parameters)) {
                const parameter = api.components.parameters[parameterName] as OpenAPIV3_1.ParameterObject
                if (parameter.schema) {
                    const schemaId = `#/components/parameters/${parameterName}`
                    ajv.addSchema(parameter.schema, schemaId)
                    mapping[validationParameterPrefix + formatName(parameter.name)] = schemaId
                }
            }
        }
    }
    if (api.paths) {
        for (const pathName of Object.keys(api.paths)) {
            const path = api.paths[pathName] as any
            for (const method of ["get", "post", "patch", "delete", "options", "head", "trace", "put"]) {
                if (path[method]) {
                    if (path[method].responses) {
                        for (const status of Object.keys(path[method].responses)) {
                            if (path[method].responses[status].content) {
                                const schemaId = `#/paths${pathName}/${method}/responses/${status}/content/application/json/schema`
                                ajv.addSchema(path[method].responses[status].content["application/json"].schema, schemaId)
                                mapping[validationResponsePrefix + formatMethodPath(pathName, method, true)] = schemaId
                            }
                        }
                    }
                    if (path[method].requestBody) {
                        const schemaId = `#/paths${pathName}/${method}/requestBody/content/application/json/schema`
                        ajv.addSchema(path[method].requestBody.content["application/json"].schema, schemaId)
                        mapping[validationBodyPrefix + formatMethodPath(pathName, method, true)] = schemaId
                    }
                }
            }
        }
    }
    let moduleCode = standaloneCode(ajv, mapping)
    return format(moduleCode, { parser: "babel", tabWidth: 4 })
}

async function generateTypes(api: OpenAPIV3_1.Document) {
    let properties
    if (api.components) {
        if (api.components.schemas) {
            properties = Object.fromEntries(Object.keys(api.components.schemas).map(x => [x, { "$ref": "#/components/schemas/" + x }]))
        }

        if (api.components.parameters) {
            properties = {...properties, ...Object.fromEntries(Object.keys(api.components.parameters).map(x => [x, { "$ref": "#/components/parameters/" + x + "/schema" }]))}
        }
        
        const superschema = { title: "superschema", type: "object", properties: properties, components: api.components }

        let ts = await compile((superschema as any) as JSONSchema, "Superschema", { style: { tabWidth: 4, semi: false } })
        ts = ts.replace(/export interface Superschema \{[\s\S]*?\}/gm, "")
        return ts.replace(/\n\s+\n/gm, "\n")
    }
    return ""
}

interface Route {
    basePath: string
    furtherPath: string
    method: string
    function: string
    dependencies: Array<string>
    parametersTypeDefinitions?: Array<{parameter: string, typeDefinition: string, parameterType: "query" | "path"}>
    bodyTypeDefinition?: string
    responseTypeDefinition?: Map<string, string>
    validationFunctionBody?: string
    validationFunctionsParameters: Array<{parameter: string, function: string}>
    validationFunctionsResponses?: Array<{status: string, function: string}>
}

async function collectRoutes(api: OpenAPIV3_1.Document): Promise<Array<Route>> {
    const dereferencedAPI = await SwaggerParser.dereference(copy(api))
    const Routes = []
    if (dereferencedAPI.paths) {
        for (const pathName of Object.keys(dereferencedAPI.paths)) {
            const path = dereferencedAPI.paths[pathName] as any
            for (const method of ["get", "post", "patch", "delete", "options", "head", "trace", "put"]) {
                if (path[method]) {
                    const route: Route = { 
                        basePath: pathName.split("/")[1],
                        furtherPath: "/:" + pathName.split("/").slice(2).map(el => el.replace(/[{}]/gi, "")).join("/"),
                        method: method,
                        function: formatMethodPath(pathName, method),
                        dependencies: [],
                        validationFunctionsParameters: [],
                        validationFunctionsResponses: []
                    }
                    if (route.furtherPath == "/:") route.furtherPath = "/"
                    if (path[method].responses) {
                        for (const status of Object.keys(path[method].responses)) {
                            if (path[method].responses[status].content) {
                                if (!route.responseTypeDefinition) route.responseTypeDefinition = new Map<string, string>()
                                route.validationFunctionsResponses!.push({ 
                                    status: status,
                                    function: validationResponsePrefix + formatMethodPath(pathName, method, true)
                                })
                                const schema = path[method].responses[status].content["application/json"].schema
                                const td = schemaToTypeDefinition(schema)
                                route.dependencies = route.dependencies.concat(td.dependencies)
                                route.responseTypeDefinition.set(status, td.typeDefinition)
                            }
                        }
                    }
                    if (path[method].requestBody) {
                        route.validationFunctionBody = validationBodyPrefix + formatMethodPath(pathName, method, true)
                        const schema = path[method].requestBody.content["application/json"].schema
                        const td = schemaToTypeDefinition(schema)
                        route.dependencies = route.dependencies.concat(td.dependencies)
                        route.bodyTypeDefinition = td.typeDefinition
                    }
                    if (path[method].parameters) {
                        route.parametersTypeDefinitions = []
                        for (const parameter of path[method].parameters) {
                            route.validationFunctionsParameters.push({ 
                                parameter: parameter.name,
                                function: validationParameterPrefix + formatName(parameter.name)
                            })
                            const td = schemaToTypeDefinition(parameter.schema)
                            route.dependencies = route.dependencies.concat(td.dependencies)
                            route.parametersTypeDefinitions.push({
                                parameter: parameter.name, 
                                typeDefinition: td.typeDefinition,
                                parameterType: parameter.in
                            })
                        }
                    }
                    route.dependencies = route.dependencies.filter((v, i, s) => s.indexOf(v) === i)
                    Routes.push(route)
                }
            }
        }
    }

    return Routes
}

function generateRoutes(basePath: string, routes: Array<Route>) {
    if (routes.find(route => route.basePath != basePath)) return ""

    let valDependencies: Array<string> = []
    let typeDependencies = []
    for (const route of routes) {
        for (const dependency of route.dependencies) {
            typeDependencies.push(dependency)
        }
    }
    typeDependencies = typeDependencies.filter((v, i, s) => s.indexOf(v) === i)

    const parametersMap = new Map<Route,string>()
    const bodyMap = new Map<Route,string>()
    const validationMap = new Map<Route, string>()

    routes.forEach(route => {
        const valFunctionName = `validateInput${route.function.charAt(0).toUpperCase() + route.function.slice(1)}`
        let validationInput: string = ""
        if (route.parametersTypeDefinitions && route.parametersTypeDefinitions.length > 0) {
            validationInput += route.bodyTypeDefinition ? "parameters, " : "parameters"
            parametersMap.set(route, `const parameters: {
                ${route.parametersTypeDefinitions?.map(td => `${td.parameter}: ${td.typeDefinition}`).join(",\n")}
            } = {
                ${route.parametersTypeDefinitions?.map(td => `${td.parameter}: ${
                    td.parameterType == "path" ? 'req.params["' + td.parameter + '"]' : 'req.query["' + td.parameter + '"]' }`).join(",\n")
                }
            }\n`)
        } else {
            parametersMap.set(route, "")
        }

        if (route.bodyTypeDefinition) {
            validationInput += "body"
            bodyMap.set(route, `const body: ${route.bodyTypeDefinition} = req.body\n`)
        } else {
            bodyMap.set(route, "")
        }

        if (validationInput.length > 0) {
            valDependencies.push(valFunctionName)
            validationMap.set(route, `if (!${valFunctionName}(${validationInput})) {
                return res.status(400).send()
            }\n`)
        } else {
            validationMap.set(route, "")
        }
    })

    const header = `import express from "express"
    import { checkJWT } from "../security"
    import * as ${basePath} from "../services/${basePath}"
    import { ${typeDependencies.join(", ")} } from "../types"
    import { ${valDependencies.join(", ")} } from "../validation/${basePath}"
    
    const router = express.Router()\n`

    return format(
        header + routes.map(route => {
            return `router.${route.method}("${route.furtherPath}", async (req, res) => {
                if (!checkJWT(req)) {
                    return res.status(401).send()
                }\n` 
                + parametersMap.get(route) 
                + bodyMap.get(route)
                + validationMap.get(route)
                + `try {
                    const result = await ${route.basePath}.${route.function}()
                    return res.status(result.status || 200).send(result.data)
                } catch (err) {
                    return res.status(500).send({
                        status: 500,
                        error: 'Server Error'
                    });
                }
            })`
        }
    ).join("\n\n"), { tabWidth: 4, semi: false, parser: "typescript" })
}

function generateServices(basePath: string, routes: Array<Route>) {
    if (routes.find(route => route.basePath != basePath)) return ""
    
    return format(routes.map(route => {
        return `export async function ${route.function}() {
            // add your implementation here

            return {
                status: 200,
                data: "${route.function} ok!"
            }
        }`
    }).join("\n\n"), { tabWidth: 4, semi: false, parser: "typescript" })
}

function generateValidationFunctions(basePath: string, routes: Array<Route>) {
    if (routes.find(route => route.basePath != basePath)) return ""

    let typeDependencies = []
    for (const route of routes) {
        for (const dependency of route.dependencies) {
            typeDependencies.push(dependency)
        }
    }
    typeDependencies = typeDependencies.filter((v, i, s) => s.indexOf(v) === i)

    let dependencies = []
    for (const route of routes) {
        for (const val of route.validationFunctionsParameters) {
            dependencies.push(val.function)
        }
        if (route.validationFunctionBody) {
            dependencies.push(route.validationFunctionBody)
        }
    }
    dependencies = dependencies.filter((v, i, s) => s.indexOf(v) === i)

    const argumentsMap = new Map<Route, string>()
    const validationMap = new Map<Route, string>()

    routes.forEach(route => {
        let args: string = ""
        let validation: string = ""
        if (route.parametersTypeDefinitions && route.parametersTypeDefinitions.length > 0) {
            args += `parameters: {
                ${route.parametersTypeDefinitions?.map(td => `${td.parameter}: ${td.typeDefinition}`).join("\n")}
            }`
            if (route.bodyTypeDefinition) args += ","
            validation += `if (parameters) {
                ${route.validationFunctionsParameters.map(val => {
                    return `if (!${val.function}(parameters.${val.parameter})) return false`
                }).join("\n")}
            }\n\n`
        }
        if (route.bodyTypeDefinition) {
            args += `body: ${route.bodyTypeDefinition}`
            validation += `if (body) {
                if (!${route.validationFunctionBody}(body)) return false
            }\n`
        }
        argumentsMap.set(route, args)
        validationMap.set(route, validation)
    })

    return format(
        `import { ${typeDependencies.join(", ")} } from "../types"
        import { ${dependencies.join(", ")} } from "./validation.mjs"
        
        `+ 
        routes.map(route => {
            const functionName = `validateInput${route.function.charAt(0).toUpperCase() + route.function.slice(1)}`
            if (route.bodyTypeDefinition || (route.parametersTypeDefinitions && route.parametersTypeDefinitions.length > 0)) {
                return `export function ${functionName}(${argumentsMap.get(route)}) {
                    ${validationMap.get(route)}
                    return true
                }`
            } else {
                return ""
            }
        }).join("\n\n"), { tabWidth: 4, semi: false, parser: "typescript" })
}

async function generate(apiPath: string, options: { outPath: string }) {
    const outPath = options.outPath
    const routesPath = outPath + "/routes"
    const servicesPath = outPath + "/services"
    const validationPath = outPath + "/validation"
    if (fs.existsSync(outPath)) fs.rmdirSync(outPath, { recursive: true })
    fs.mkdirSync(outPath)
    fs.mkdirSync(routesPath)
    fs.mkdirSync(servicesPath)
    fs.mkdirSync(validationPath)

    const parsedAPI = await parse(apiPath).catch((err) => {
        console.log(err)
        exit(1)
    })

    const routes = await collectRoutes(parsedAPI)
    const mapping = new Map<string, Array<Route>>()

    for (const route of routes) {
        if (!mapping.get(route.basePath)) mapping.set(route.basePath, [])
        mapping.get(route.basePath)?.push(route)
    }

    for (const key of mapping.keys()) {
        fs.writeFileSync(`${routesPath}/${key}.ts`, generateRoutes(key, mapping.get(key)!)!)
        fs.writeFileSync(`${servicesPath}/${key}.ts`, generateServices(key, mapping.get(key)!)!)
        fs.writeFileSync(`${validationPath}/${key}.ts`, generateValidationFunctions(key, mapping.get(key)!)!)
    }

    fs.writeFileSync(`${validationPath}/validation.mjs`, generateBasicValidationFunctions(parsedAPI))
    fs.writeFileSync(`${outPath}/types.ts`, await generateTypes(parsedAPI))
}

if (require.main === module) {
    generate(process.argv[2], { outPath: "./src/generated" })
}