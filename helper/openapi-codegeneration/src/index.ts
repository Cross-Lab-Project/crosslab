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
import nunjucks from "nunjucks"
import {
    SchemaData,
    ParameterData,
    OpenAPIData,
    ReferenceData,
    DefaultData,
    CallbackData,
    HeaderData, 
    OperationData, 
    PathItemData,
    LinkData,
    MediaTypeData,
    EncodingData,
    ResponseData,
    RequestBodyData,
    OperationMethod
} from "./types"
import { TypedEmitter } from "tiny-typed-emitter"
import path from "path"

/**
 * definition of possible events
 */
interface OpenAPIDataEvents {
    "schema": (schema: SchemaData) => void
    "parameter": (parameter: ParameterData) => void
    "callback": (callback: CallbackData) => void
    "header": (header: HeaderData) => void
    "operation": (operation: OperationData) => void
    "pathItem": (pathItem: PathItemData) => void
    "reference": (reference: ReferenceData) => void
    "link": (link: LinkData) => void
    "mediaType": (mediaType: MediaTypeData) => void
    "encoding": (encoding: EncodingData) => void
    "response": (response: ResponseData) => void
    "requestBody": (requestBody: RequestBodyData) => void
}

/**
 * eventEmitter used for intercepting parsing of openapi objects
 */
const eventEmitter = new TypedEmitter<OpenAPIDataEvents>()

/**
 * A simple function for copying an object
 * @param e object to be copied
 * @returns copy of input object
 */
function copy(e: any) {
    return JSON.parse(JSON.stringify(e))
}

/**
 * parses an openapi specification given by its path
 * @param apiPath path to the openapi specification
 * @returns parsed openapi specification
 */
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

/**
 * formats a path as follows:
 * /devices/{device_id}/availability -> DevicesByDeviceIdAvailability
 * @param path path to be formatted
 * @returns formatted path
 */
function formatPath(path: string) {
    let splitPath = path.split("/")
    if (splitPath.length > 2) {
        splitPath[0] = splitPath[1]
        splitPath[1] = "by"
    } else {
        return splitPath[1].charAt(0).toUpperCase() + splitPath[1].slice(1)
    }
    return splitPath.map(el => {
        el = el.replace(/[{}]/gi, "")
        const split = el.split("_")
        return split.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join("")
    }).join("")
}

/**
 * formats the name of an object as follows:
 * device_id -> DeviceId
 * @param name name to be formatted
 * @returns formatted name
 */
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

/**
 * formats the location of an openapi object as follows:
 * #/components/schemas/device_overview -> ComponentsSchemasDeviceOverview (minimize: false)
 * #/components/schemas/device_overview -> SchemasDeviceOverview (minimize: true)
 * @param location location to be formatted
 * @param minimize cut reoccurring parts of a location
 * @returns formatted location
 */
function formatLocation(location: string, minimize: boolean = false) {
    if (minimize) {
        location = location.replace("#/components/", "")
        location = location.replace("#/paths/", "")
        location = location.replace("/content/application/json/schema", "")
    }
    const split = location.replace("#","").split(/[ _/{}]/)
    return split.map(el => {
        if (el.length > 1) {
            return el.charAt(0).toUpperCase() + el.slice(1)
        } else {
            return el.toUpperCase()
        }
    }).join("")
}

/**
 * formats a given path and method as follows:
 * post, /devices/{device_id}/availability -> postDevicesByDeviceIdAvailability
 * @param path path to be formatted
 * @param method method to be formatted
 * @param upperCase if the first letter should be capitalized
 * @returns formatted method + path
 */
function formatMethodPath(path: string, method: OperationMethod, upperCase: boolean = false) {
    if (upperCase)
        return method.charAt(0).toUpperCase() + method.slice(1) + formatPath(path)
    else
        return method.charAt(0).toLowerCase() + method.slice(1) + formatPath(path)
}

/**
 * resolves the type declaration and type dependencies of a schema
 * @param schema SchemaObject for which to resolve type declaration and type dependencies
 * @param api used openapi-specification
 * @returns type declaration and type dependencies
 */
function schemaToTypeDeclaration(schema: OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject, api: OpenAPIV3_1.Document): { typeDeclaration: string, typeDependencies: Array<string> } {
    const derefSchema = isReferenceObject(schema) ? getReference(api, schema.$ref) as OpenAPIV3_1.SchemaObject : schema
    if (derefSchema.title) {
        return { typeDeclaration: formatName(derefSchema.title), typeDependencies: [formatName(derefSchema.title)] }
    }
    if (derefSchema.allOf) {
        let type = undefined
        const typeDeclarations = []
        let dependencies: Array<string> = []
        for (const subschema of derefSchema.allOf as Array<OpenAPIV3_1.SchemaObject>) {
            const derefSubschema = isReferenceObject(subschema) ? getReference(api, subschema.$ref) as OpenAPIV3_1.SchemaObject : subschema
            if (!type) type = derefSubschema.type
            if (type != derefSubschema.type) throw ("Error: cannot merge types for allOf")
            const td = schemaToTypeDeclaration(derefSubschema, api)
            typeDeclarations.push(td.typeDeclaration)
            dependencies = dependencies.concat(td.typeDependencies)
        }
        return { typeDeclaration: typeDeclarations.join(" & "), typeDependencies: dependencies }
    }
    if (derefSchema.anyOf) {
        const typeDeclarations = []
        let dependencies: Array<string> = []
        for (const subschema of derefSchema.anyOf) {
            const td = schemaToTypeDeclaration(subschema, api)
            typeDeclarations.push(td.typeDeclaration)
            dependencies = dependencies.concat(td.typeDependencies)
        }
        return { typeDeclaration: typeDeclarations.join(" | "), typeDependencies: dependencies }
    }
    if (derefSchema.oneOf) {
        const typeDeclarations = []
        let dependencies: Array<string> = []
        for (const subschema of derefSchema.oneOf) {
            const td = schemaToTypeDeclaration(subschema, api)
            typeDeclarations.push(td.typeDeclaration)
            dependencies = dependencies.concat(td.typeDependencies)
        }
        return { typeDeclaration: typeDeclarations.join(" | "), typeDependencies: dependencies }
    }
    if (derefSchema.enum) {
        return { typeDeclaration: derefSchema.enum.join(" | "), typeDependencies: [] }
    }
    if ((derefSchema as any).const) {
        if (typeof (derefSchema as any).const === "string")
            return { typeDeclaration: `"${(derefSchema as any).const}"`, typeDependencies: [] }
        else
            return { typeDeclaration: `${(derefSchema as any).const}`, typeDependencies: [] }
    }

    switch (derefSchema.type) {
        case "object":
            const properties = []
            let dependencies: Array<string> = []
            if (derefSchema.properties) {
                for (const property of Object.keys(derefSchema.properties)) {
                    const td = schemaToTypeDeclaration(derefSchema.properties[property], api)
                    properties.push(`${property}: ${td.typeDeclaration}`)
                    dependencies = dependencies.concat(td.typeDependencies)
                }
            }
            if (derefSchema.additionalProperties && derefSchema.additionalProperties == true) {
                properties.push("[k: string]: unknown")
            }
            return { typeDeclaration: `{\n\t${properties.join("\n").replace(/\n/gi, "\n\t")}\n}`, typeDependencies: dependencies }

        case "array":
            const td = schemaToTypeDeclaration((derefSchema as OpenAPIV3_1.ArraySchemaObject).items, api)
            return { typeDeclaration: `Array<${td.typeDeclaration}>`, typeDependencies: td.typeDependencies }

        case "integer":
            return { typeDeclaration: "number", typeDependencies: [] }

        case "boolean":
            return { typeDeclaration: "boolean", typeDependencies: [] }

        case "number":
            return { typeDeclaration: "number", typeDependencies: [] }

        case "string":
            return { typeDeclaration: "string", typeDependencies: [] }

        case "null":
            return { typeDeclaration: "null", typeDependencies: [] }
    }

    return { typeDeclaration: "any", typeDependencies: [] }
}

/**
 * checks if a given object has type ReferenceObject (type guard)
 * @param object any object to be checked
 * @returns if the given object has type ReferenceObject
 */
function isReferenceObject(object: any): object is OpenAPIV3_1.ReferenceObject {
    return Object.keys(object).includes("$ref")
}

/**
 * checks if a given DefaultData object has type ReferenceData (type guard)
 * @param object object of type DefaultData to be checked
 * @returns if the given object has type ReferenceData
 */
function isReferenceData(object: DefaultData): object is ReferenceData {
    return object.type == "reference"
}

/**
 * checks if the given string is an OperationMethod
 * @param str string to be checked
 * @returns if the given string is an OperationMethod
 */
function isOperationMethod(str: string): str is OperationMethod {
    return ["get", "put", "post", "delete", "options", "trace", "head", "patch"].includes(str)
}

/**
 * parses a SchemaObject | ReferenceObject to SchemaData | ReferenceData
 * @param api used openapi-specification
 * @param schema a SchemaObject | ReferenceObject to be parsed
 * @param location location of the object in the openapi specification
 * @returns parsed SchemaData | ReferenceData
 */
function parseSchemaObject(api: OpenAPIV3_1.Document, schema: OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject, location?: string): SchemaData | ReferenceData {
    if (!isReferenceObject(schema)) {
        const {typeDeclaration, typeDependencies} = schemaToTypeDeclaration(schema, api)
        const schemaData: SchemaData = {
            type: "schema",
            schema: schema,
            location: location,
            typeDeclaration: typeDeclaration,
            dependencies: typeDependencies
        }
        if (location) {
            schemaData.validationFunction = "validate" + formatLocation(location, true)
        }
        if (schema.title) {
            schemaData.name = formatName(schema.title)
        }
        eventEmitter.emit("schema", schemaData)
        return schemaData
    } else {
        const referenceData: ReferenceData = { 
            type: "reference", 
            refType: "schema",
            reference: schema,
            location: location
        }
        eventEmitter.emit("reference", referenceData)
        return referenceData
    }
}

/**
 * parses a ParameterObject | ReferenceObject to ParameterData | ReferenceData
 * @param api used openapi-specification
 * @param parameter a ParameterObject | ReferenceObject to be parsed
 * @param location location of the object in the openapi specification
 * @returns parsed ParameterObject | ReferenceData
 */
function parseParameterObject(api: OpenAPIV3_1.Document, parameter: OpenAPIV3_1.ParameterObject | OpenAPIV3_1.ReferenceObject, location?: string): ParameterData | ReferenceData {
    if (!isReferenceObject(parameter)) {
        const parameterData: ParameterData = {
            type: "parameter",
            in: parameter.in,
            name: parameter.name,
            parameter: parameter,
            required: parameter.required ?? false,
            location: location
        }
        if (parameter.schema) {
            parameterData.schema = parseSchemaObject(api, parameter.schema, location ? location + "/schema" : undefined )
        }
        eventEmitter.emit("parameter", parameterData)
        return parameterData
    } else {
        const referenceData: ReferenceData = { 
            type: "reference", 
            refType: "parameter",
            reference: parameter,
            location: location
        }
        eventEmitter.emit("reference", referenceData)
        return referenceData
    }
}

/**
 * TBD: https://spec.openapis.org/oas/v3.1.0#header-object
 * parses a HeaderObject | ReferenceObject to HeaderData | ReferenceData
 * @param api used openapi-specification
 * @param header a HeaderObject | ReferenceObject to be parsed
 * @param location location of the object in the openapi specification
 * @returns parsed HeaderData | ReferenceData
 */
function parseHeaderObject(api: OpenAPIV3_1.Document, header: OpenAPIV3_1.HeaderObject | OpenAPIV3_1.ReferenceObject, location?: string): HeaderData | ReferenceData {
    if (!isReferenceObject(header)) {
        const headerData: HeaderData = {
            type: "header",
            header: header,
            location: location
        }
        eventEmitter.emit("header", headerData)
        return headerData
    } else {
        const referenceData: ReferenceData = { 
            type: "reference", 
            refType: "header",
            reference: header,
            location: location
        }
        eventEmitter.emit("reference", referenceData)
        return referenceData
    }
}

/**
 * TBD: https://spec.openapis.org/oas/v3.1.0#encoding-object
 * parses an EncodingObject to EncodingData
 * @param api used openapi-specification
 * @param encoding an EncodingObject to be parsed
 * @param location location of the object in the openapi specification
 * @returns parsed EncodingData
 */
function parseEncodingObject(api: OpenAPIV3_1.Document, encoding: OpenAPIV3_1.EncodingObject, location?: string): EncodingData {
    const encodingData: EncodingData = {
        type: "encoding",
        encoding: encoding,
        location: location
    }
    eventEmitter.emit("encoding", encodingData)
    return encodingData
}

/**
 * parses a MediaTypeObject to MediaTypeData
 * @param api used openapi-specification
 * @param mediaType a MediaTypeObject to be parsed
 * @param key key of the MediaTypeObject, e.g. "application/json"
 * @param location location of the object in the openapi specification
 * @returns parsed MediaTypeData
 */
function parseMediaTypeObject(api: OpenAPIV3_1.Document, mediaType: OpenAPIV3_1.MediaTypeObject, key: string, location?: string): MediaTypeData {
    const mediaTypeData: MediaTypeData = {
        type: "mediaType",
        mediaType: mediaType,
        key: key,
        location: location
    }
    if (mediaType.schema) {
        mediaTypeData.schema = parseSchemaObject(api, mediaType.schema, location ? location + "/schema" : undefined)
    }
    if (mediaType.encoding) {
        mediaTypeData.encoding = []
        for (const encodingName in mediaType.encoding) {
            mediaTypeData.encoding.push(parseEncodingObject(api, mediaType.encoding[encodingName]))
        }
    }
    eventEmitter.emit("mediaType", mediaTypeData)
    return mediaTypeData
}

/**
 * TBD: https://spec.openapis.org/oas/v3.1.0#link-object
 * parses a LinkObject | ReferenceObject to LinkData | ReferenceData
 * @param api used openapi-specification
 * @param link a LinkObject | ReferenceObject to be parsed
 * @param location location of the object in the openapi specification
 * @returns parsed LinkData | ReferenceData
 */
function parseLinkObject(api: OpenAPIV3_1.Document, link: OpenAPIV3_1.LinkObject | OpenAPIV3_1.ReferenceObject, location?: string): LinkData | ReferenceData {
    if (!isReferenceObject(link)) {
        const linkData: LinkData = {
            type: "link",
            link: link,
            location: location
        }
        eventEmitter.emit("link", linkData)
        return linkData
    } else {
        const referenceData: ReferenceData = { 
            type: "reference", 
            refType: "link",
            reference: link,
            location: location
        }
        eventEmitter.emit("reference", referenceData)
        return referenceData
    }
}

/**
 * parses a ResponseObject | ReferenceObject to ResponseData | ReferenceData
 * @param api used openapi-specification
 * @param response a ResponseObject | ReferenceObject to be parsed
 * @param location location of the object in the openapi specification
 * @returns parsed ResponseData | ReferenceData
 */
function parseResponseObject(api: OpenAPIV3_1.Document, response: OpenAPIV3_1.ResponseObject | OpenAPIV3_1.ReferenceObject, location?: string): ResponseData | ReferenceData {
    if (!isReferenceObject(response)) {
        const responseData: ResponseData = {
            type: "response",
            response: response,
            location: location
        }
        if (response.headers) {
            responseData.headers = []
            for (const headerName in response.headers) {
                responseData.headers.push(parseHeaderObject(api, response.headers[headerName], location ? location + `/headers/${headerName}` : undefined ))
            }
        }
        if (response.content) {
            responseData.content = []
            for (const mediaType in response.content) {
                responseData.content.push(parseMediaTypeObject(api, response.content[mediaType], mediaType, location ? location + `/content/${mediaType}` : undefined ))
            }
        }
        if (response.links) {
            responseData.links = []
            for (const linkName in response.links) {
                responseData.links.push(parseLinkObject(api, response.links[linkName], location ? location + `/links/${linkName}` : undefined ))
            }
        }
        eventEmitter.emit("response", responseData)
        return responseData
    } else {
        const referenceData: ReferenceData = { 
            type: "reference", 
            refType: "response",
            reference: response
        }
        eventEmitter.emit("reference", referenceData)
        return referenceData
    }
}

/**
 * parses a RequestBodyObject | ReferenceObject to RequestBodyData | ReferenceData
 * @param api used openapi-specification
 * @param requestBody a RequestBodyObject | ReferenceObject to be parsed
 * @param location location of the object in the openapi specification
 * @returns parsed RequestBodyData | ReferenceData
 */
function parseRequestBodyObject(api: OpenAPIV3_1.Document, requestBody: OpenAPIV3_1.RequestBodyObject | OpenAPIV3_1.ReferenceObject, location?: string): RequestBodyData | ReferenceData {
    if (!isReferenceObject(requestBody)) {
        const requestBodyData: RequestBodyData = {
            type: "requestBody",
            requestBody: requestBody,
            required: requestBody.required ?? false,
            location: location
        }
        if (requestBody.content) {
            requestBodyData.content = []
            for (const mediaType in requestBody.content) {
                requestBodyData.content.push(parseMediaTypeObject(api, requestBody.content[mediaType], mediaType, location ? location + `/content/${mediaType}` : undefined ))
            }
        }
        eventEmitter.emit("requestBody", requestBodyData)
        return requestBodyData
    } else {
        const referenceData: ReferenceData = { 
            type: "reference", 
            refType: "requestBody",
            reference: requestBody,
            location: location
        }
        eventEmitter.emit("reference", referenceData)
        return referenceData
    }
}

/**
 * TBD: https://spec.openapis.org/oas/v3.1.0#callback-object
 * parses a CallbackObject | ReferenceObject to CallbackData | ReferenceData
 * @param api used openapi-specification
 * @param callback a CallbackObject | ReferenceObject to be parsed
 * @param location location of the object in the openapi specification
 * @returns parsed CallbackData | ReferenceData
 */
function parseCallbackObject(api: OpenAPIV3_1.Document, callback: OpenAPIV3_1.CallbackObject | OpenAPIV3_1.ReferenceObject, location?: string): CallbackData | ReferenceData {
    if (!isReferenceObject(callback)) {
        const callbackData: CallbackData = {
            type: "callback",
            callback: callback,
            location: location
        }
        eventEmitter.emit("callback", callbackData)
        return callbackData
    } else {
        const referenceData: ReferenceData = { 
            type: "reference", 
            refType: "callback",
            reference: callback,
            location: location 
        }
        eventEmitter.emit("reference", referenceData)
        return referenceData
    }
}

/**
 * parses an OperationObject to OperationData
 * @param api used openapi-specification
 * @param operation an OperationObject to be parsed
 * @param method the method of the operation (OperationMethod)
 * @param path path the operation belongs to (e.g. /devices/{device_id})
 * @param location location of the object in the openapi specification
 * @returns parsed OperationData
 */
function parseOperationObject(api: OpenAPIV3_1.Document, operation: OpenAPIV3_1.OperationObject, method: OperationMethod, path: string, location?: string): OperationData {
    const operationData: OperationData = {
        type: "operation",
        operation: operation,
        method: method,
        path: path,
        location: location
    }
    if (operation.parameters) {
        operationData.parameters = []
        for (const parameter of operation.parameters) {
            operationData.parameters.push(parseParameterObject(api, parameter))
        }
    }
    if (operation.requestBody) {
        operationData.requestBody = parseRequestBodyObject(api, operation.requestBody, location ? location + "/requestBody" : undefined )
    }
    if (operation.responses) {
        operationData.responses = []
        for (const status in operation.responses) {
            const responseData = parseResponseObject(api, operation.responses[status], location ? location + `/responses/${status}` : undefined )
            responseData.status = status
            operationData.responses.push(responseData)
        }
    }
    if (operation.callbacks) {
        operationData.callbacks = []
        for (const callbackName in operation.callbacks) {
            operationData.callbacks.push(parseCallbackObject(api, operation.callbacks[callbackName], location ? location + `/callbacks/${callbackName}` : undefined ))
        }
    }
    if (operation.security) {
        operationData.security = operation.security
    }
    eventEmitter.emit("operation", operationData)
    return operationData
}

/**
 * parses a PathItemObject to PathItemData
 * @param api used openapi-specification
 * @param pathItem a PathItemObject to be parsed
 * @param path path of the PathItemObject (e.g. /devices/{device_id})
 * @param location location of the object in the openapi specification
 * @returns parsed PathItemData
 */
function parsePathItemObject(api: OpenAPIV3_1.Document, pathItem: OpenAPIV3_1.PathItemObject, path: string, location?: string): PathItemData {
    const pathItemData: PathItemData = {
        type: "pathItem",
        pathItem: pathItem,
        location: location,
        basePath: path.split("/")[1],
        path: path
    }
    for (const method of ["head", "get", "put", "post", "delete", "options", "trace", "patch"]) {
        const operation = ((pathItem as any)[method] as OpenAPIV3_1.OperationObject)
        if (operation && isOperationMethod(method)) {
            if (!pathItemData.operations) pathItemData.operations = [] 
            pathItemData.operations.push(parseOperationObject(api, operation, method, path, location ? location + `/${method}` : undefined ))
        }
    }
    if (pathItem.parameters) {
        pathItemData.parameters = []
        for (const parameter of pathItem.parameters) {
            pathItemData.parameters.push(parseParameterObject(api, parameter))
        }
    }
    if (pathItem.$ref) {
        pathItemData.reference = pathItem.$ref
    }
    eventEmitter.emit("pathItem", pathItemData)
    return pathItemData
}

/**
 * gets an object from an openapi specification by its reference
 * @param api openapi specification to be searched
 * @param ref reference to the object
 * @returns referenced object if found else undefined
 */
function getReference(api: OpenAPIV3_1.Document, ref: string): any {
    ref = ref.replace("#/","")
    let current = api as any
    while (ref.length > 0) {
        let longestMatch = 0
        let keyValuePair: [string, unknown] | undefined
        Object.entries(current).forEach(e => {
            if (ref.startsWith(e[0]) && e[0].length > longestMatch) {
                keyValuePair = e
                longestMatch = e[0].length
            }
        })
        if (!keyValuePair) return undefined
        current = keyValuePair[1]
        ref = ref.slice(keyValuePair[0].length+1)
    }
    return current
} 

/**
 * disables all events, runs a function and enables them again
 * @param f function to be run
 * @returns return value of ran function
 */
function runWithoutEvents(f: () => any, eventNames?: Array<keyof OpenAPIDataEvents>) {
    const events = new Map<keyof OpenAPIDataEvents,any>()
    for (const key of eventEmitter.eventNames()) {
        if (!eventNames || eventNames.includes(key)) {
            events.set(key, eventEmitter.listeners(key))
            eventEmitter.removeAllListeners(key)
        }
    }
    const ret = f()
    for (const key of events.keys()) {
        for (const listener of events.get(key)) {
            eventEmitter.addListener(key, listener)
        }
    }
    return ret
}

/**
 * parses a given openapi specification to OpenAPIData
 * @param api openapi specification to be parsed
 * @returns parsed OpenAPIData 
 */
async function parseOpenAPIData(api: OpenAPIV3_1.Document): Promise<OpenAPIData> {
    const dereferencedAPI = await SwaggerParser.validate(copy(api)) as OpenAPIV3_1.Document

    const openAPIData: OpenAPIData = { 
        api: api,
        superschema: {
            title: "superschema",
            type: "object",
            properties: {},
            components: api.components,
            paths: api.paths
        }
    }

    const key = "type_"
    let index = 0

    /**
     * TBD: explain what happens here
     * @param schemaData 
     */
    const schemaCallback = (schemaData: SchemaData) => {
        if (schemaData.name && openAPIData.superschema && schemaData.location) {
            openAPIData.superschema.properties[key+index++] = { $ref: schemaData.location }
        }
        if (schemaData.validationFunction && schemaData.location) {
            if (!openAPIData.validationBlueprints) openAPIData.validationBlueprints = []
            openAPIData.validationBlueprints.push({
                name: schemaData.validationFunction,
                schema: schemaData.schema,
                schemaLocation: schemaData.location
            })
        }
        if (schemaData.schema.title && schemaData.location) {
            getReference(dereferencedAPI, schemaData.location).title = schemaData.schema.title
        }
    }

    /**
     * TBD: explain what happens here
     * @param referenceData 
     */
    const referenceCallback = (referenceData: ReferenceData) => {
        if (referenceData.refType == "schema" && referenceData.location) {
            if (!openAPIData.validationBlueprints) openAPIData.validationBlueprints = []
            openAPIData.validationBlueprints.push({
                name: "validate" + formatLocation(referenceData.location, true),
                schema: referenceData.reference,
                schemaLocation: referenceData.location
            })
        }
    }

    /**
     * TBD: explain what happens here
     * @param operationData 
     */
    const operationCallback = (operationData: OperationData) => {
        if (!openAPIData.routeFunctions) openAPIData.routeFunctions = {}
        const basePath = operationData.path.split("/")[1]

        const parameters = operationData.parameters ? operationData.parameters.map(p => {
            if (!isReferenceData(p)) {
                if (p.schema && p.schema.location) {
                    const reference = getReference(dereferencedAPI, p.schema.location)
                    const location = p.schema.location
                    runWithoutEvents(() => {
                        p.schema = parseSchemaObject(api, reference, location)
                    })
                }
                return p
            } else {
                return runWithoutEvents(() => {
                    const reference = getReference(dereferencedAPI, p.reference.$ref)
                    const parameter = parseParameterObject(api, reference, p.reference.$ref) as ParameterData
                    return parameter
                })
            }
        }) : undefined

        let body: RequestBodyData | undefined
        if (operationData.requestBody) {
            if (!isReferenceData(operationData.requestBody)) {
                if (operationData.requestBody.content) {
                    const content = operationData.requestBody.content.find(c => c.key == "application/json")
                    if (content && content.schema && content.schema.location) {
                        const reference = getReference(dereferencedAPI, content.schema.location)
                        const location = content.schema.location
                        runWithoutEvents(() => {
                            content.schema = parseSchemaObject(api, reference, location)
                        })
                    }
                }
                body = operationData.requestBody
            } else {
                runWithoutEvents(() => {
                    const reference = getReference(dereferencedAPI, (operationData.requestBody! as ReferenceData).reference.$ref)
                    body = parseRequestBodyObject(api, reference, operationData.requestBody!.location) as RequestBodyData
                })
            }
        }

        const responses = operationData.responses ? operationData.responses.map(r => {
            if (!isReferenceData(r)) {
                if (r.content) {
                    const content = r.content.find(c => c.key == "application/json")
                    if (content && content.schema && content.schema.location) {
                        const reference = getReference(dereferencedAPI, content.schema.location)
                        const location = content.schema.location
                        runWithoutEvents(() => {
                            content.schema = parseSchemaObject(api, reference, location)
                        })
                    }
                }
                return r
            } else {
                return runWithoutEvents(() => {
                    const reference = getReference(dereferencedAPI, r.reference.$ref)
                    const response = parseResponseObject(api, reference, r.location) as ResponseData
                    response.status = r.status
                    if (!response.status) console.error("Response has no status code!")
                    return response
                })
            }
        }) : undefined

        if (!openAPIData.routeFunctions[basePath]) openAPIData.routeFunctions[basePath] = []
        
        let scopes: Array<string> = []
        if (operationData.security) {
            const jwt = operationData.security.find(el => Object.keys(el).includes("JWT"))
            if (jwt) scopes = jwt["JWT"]
        }
        openAPIData.routeFunctions[basePath].push({
            name: formatMethodPath(operationData.path, operationData.method),
            method: operationData.method,
            path: operationData.path,
            validateInput: "validate" + formatMethodPath(operationData.path, operationData.method, true) + "Input",
            validateOutput: "validate" + formatMethodPath(operationData.path, operationData.method, true) + "Output",
            signature: formatMethodPath(operationData.path, operationData.method) + "Signature",
            scopes: scopes,
            parameters: parameters ? {
                cookie: parameters.filter(p => p.in == "cookie"),
                header: parameters.filter(p => p.in == "header"),
                path: parameters.filter(p => p.in == "path"),
                query: parameters.filter(p => p.in == "query")
            } : undefined,
            body: body,
            responses: responses as ResponseData[] | undefined,
            genericResponseStatuses: {
                "1XX": responses ? 
                    Array.from(Array(100).keys()).map(n => n + 100).filter(n => !responses.find(res => res.status == n.toString())) :
                    Array.from(Array(100).keys()).map(n => n + 100),
                "2XX": responses ? 
                    Array.from(Array(100).keys()).map(n => n + 200).filter(n => !responses.find(res => res.status == n.toString())) :
                    Array.from(Array(100).keys()).map(n => n + 200),
                "3XX": responses ? 
                    Array.from(Array(100).keys()).map(n => n + 300).filter(n => !responses.find(res => res.status == n.toString())) :
                    Array.from(Array(100).keys()).map(n => n + 300),
                "4XX": responses ? 
                    Array.from(Array(100).keys()).map(n => n + 400).filter(n => !responses.find(res => res.status == n.toString())) :
                    Array.from(Array(100).keys()).map(n => n + 400),
                "5XX": responses ? 
                    Array.from(Array(100).keys()).map(n => n + 500).filter(n => !responses.find(res => res.status == n.toString())) :
                    Array.from(Array(100).keys()).map(n => n + 500),
            }
        })
    }

    // register event listeners
    eventEmitter.on("schema", schemaCallback)
    eventEmitter.on("reference", referenceCallback)
    eventEmitter.on("operation", operationCallback)

    if (api.components) {
        // parse components
        openAPIData.components = {}
        if (api.components.schemas) {
            // parse schema objects
            openAPIData.components.schemas = []
            for (const schemaName in api.components.schemas) {
                const schema = api.components.schemas[schemaName]
                schema.title = schema.title ?? formatName(schemaName)
                const schemaData = parseSchemaObject(api, schema, `#/components/schemas/${schemaName}`)
                openAPIData.components.schemas.push(schemaData)
            }
        }
        if (api.components.parameters) {
            // parse parameter objects
            openAPIData.components.parameters = []
            for (const parameterName in api.components.parameters) {
                const parameter = api.components.parameters[parameterName]
                const parameterData = parseParameterObject(api, parameter, `#/components/parameters/${parameterName}`)
                openAPIData.components.parameters.push(parameterData)
            }
        }
        if (api.components.callbacks) {
            // parse callback objects
            openAPIData.components.callbacks = []
            for (const callbackName in api.components.callbacks) {
                const callback = api.components.callbacks[callbackName]
                const callbackData = parseCallbackObject(api, callback, `#/components/callbacks/${callbackName}`)
                openAPIData.components.callbacks.push(callbackData)
            }
        }
        if (api.components.requestBodies) {
            // parse requestBody objects
            openAPIData.components.requestBodies = []
            for (const requestBodyName in api.components.requestBodies) {
                const requestBody = api.components.requestBodies[requestBodyName]
                const requestBodyData = parseRequestBodyObject(api, requestBody, `#/components/requestBodies/${requestBodyName}`)
                openAPIData.components.requestBodies.push(requestBodyData)
            }
        }
        if (api.components.pathItems) {
            // parse pathItem objects
            openAPIData.components.pathItems = []
            for (const pathItemName in api.components.pathItems) {
                const pathItem = api.components.pathItems[pathItemName]
                const pathItemData = parsePathItemObject(api, pathItem, pathItemName, `#/components/pathItems/${pathItemName}`)
                openAPIData.components.pathItems.push(pathItemData)
            }
        }
        if (api.components.responses) {
            // parse response objects
            openAPIData.components.responses = []
            for (const responseName in api.components.responses) {
                const response = api.components.responses[responseName]
                const responseData = parseResponseObject(api, response, `#/components/responses/${responseName}`)
                openAPIData.components.responses.push(responseData)
            }
        }
        if (api.components.headers) {
            // parse header objects
            openAPIData.components.headers = []
            for (const headerName in api.components.headers) {
                const header = api.components.headers[headerName]
                const headerData = parseHeaderObject(api, header, `#/components/headers/${headerName}`)
                openAPIData.components.headers.push(headerData)
            }
        }
    }

    if (api.paths) {
        // parse paths
        openAPIData.paths = []
        for (const pathName in api.paths) {
            // parse pathItem objects
            const pathItem = api.paths[pathName]
            if (pathItem) {
                const pathItemData = parsePathItemObject(api, pathItem, pathName, `#/paths/${pathName}`)
                openAPIData.paths.push(pathItemData)
            }
        }
    }

    // remove event listeners
    eventEmitter.off("schema", schemaCallback)
    eventEmitter.off("reference", referenceCallback)
    eventEmitter.off("operation", operationCallback)

    return openAPIData
}

/**
 * generates a file types.ts containing all necessary type declarations for the superschema of the given OpenAPIData
 * @param openAPIData OpenAPIData containing a superschema
 * @param outPath path to write file to
 */
async function generateTypes(openAPIData: OpenAPIData, outPath: string) {
    let ts = await compile(openAPIData.superschema as JSONSchema, "Superschema", { style: { tabWidth: 4, semi: false } })
    ts = ts.replace(/export interface Superschema \{[\s\S]*?\}/gm, "")
    ts = ts.replace(/\n\s+\n/gm, "\n")

    fs.writeFileSync(`${outPath}/types.ts`, nunjucks.render("types.njk", {
        pregeneratedTypes: ts
    }))
}

/**
 * gets the type and validation (function) dependencies for a given OpenAPIData
 * @param openAPIData OpenAPIData for which to get dependencies
 * @returns type and validation dependencies of given OpenAPIData
 */
function getDependencies(
    openAPIData: OpenAPIData, 
    options?: { 
        types?: {
            parameter?: boolean
            body?: boolean
            response?: boolean 
        }
        validation?: {
            parameter?: boolean
            body?: boolean
            response?: boolean 
        }
    }
): Map<string,{ typeDependencies: Array<string>, validationDependencies: Array<string> }> {

    // correctly initialize options
    const _options = {
        types: {
            parameter: options ? (options.types ? (options.types.parameter ?? true) : true) : true,
            body: options ? (options.types ? (options.types.body ?? true) : true) : true,
            response: options ? (options.types ? (options.types.response ?? true) : true) : true 
        },
        validation: {
            parameter: options ? (options.validation ? (options.validation.parameter ?? true) : true) : true,
            body: options ? (options.validation ? (options.validation.body ?? true) : true) : true,
            response: options ? (options.validation ? (options.validation.response ?? true) : true) : true 
        }
    }

    const map = new Map<string,{ typeDependencies: Array<string>, validationDependencies: Array<string> }>()
    if (openAPIData.routeFunctions) {
        for (const key in openAPIData.routeFunctions) {
            const typeDependencies: Array<string> = []
            const validationDependencies: Array<string> = []
            openAPIData.routeFunctions[key].forEach(rf => {
                if (rf.parameters) {
                    if (rf.parameters.cookie) {
                        for (const parameter of rf.parameters.cookie) {
                            if (parameter.schema && parameter.schema.dependencies) {
                                if (parameter.schema.validationFunction && _options.validation.parameter) {
                                    validationDependencies.push(parameter.schema.validationFunction)
                                }
                                if (parameter.schema.dependencies && _options.types.parameter) {
                                    typeDependencies.push(parameter.schema.dependencies)
                                }
                            }
                        }
                    }
                    if (rf.parameters.header) {
                        for (const parameter of rf.parameters.header) {
                            if (parameter.schema && parameter.schema.dependencies) {
                                if (parameter.schema.validationFunction && _options.validation.parameter) {
                                    validationDependencies.push(parameter.schema.validationFunction)
                                }
                                if (parameter.schema.dependencies && _options.types.parameter) {
                                    typeDependencies.push(parameter.schema.dependencies)
                                }
                            }
                        }
                    }
                    if (rf.parameters.path) {
                        for (const parameter of rf.parameters.path) {
                            if (parameter.schema && parameter.schema.dependencies) {
                                if (parameter.schema.validationFunction && _options.validation.parameter) {
                                    validationDependencies.push(parameter.schema.validationFunction)
                                }
                                if (parameter.schema.dependencies && _options.types.parameter) {
                                    typeDependencies.push(parameter.schema.dependencies)
                                }
                            }
                        }
                    }
                    if (rf.parameters.query) {
                        for (const parameter of rf.parameters.query) {
                            if (parameter.schema && parameter.schema.dependencies) {
                                if (parameter.schema.validationFunction && _options.validation.parameter) {
                                    validationDependencies.push(parameter.schema.validationFunction)
                                }
                                if (parameter.schema.dependencies && _options.types.parameter) {
                                    typeDependencies.push(parameter.schema.dependencies)
                                }
                            }
                        }
                    }
                }
                if (rf.body && rf.body.content) {
                    const content = rf.body.content.find(c => c.key == "application/json")
                    if (content && content.schema) {
                        if (content.schema.validationFunction && _options.validation.body) {
                            validationDependencies.push(content.schema.validationFunction)
                        }
                        if (content.schema.dependencies && _options.types.body) {
                            typeDependencies.push(content.schema.dependencies)
                        }
                    }
                }
                if (rf.responses) {
                    for (const response of rf.responses) {
                        if (response.content) {
                            const content = response.content.find(c => c.key == "application/json")
                            if (content && content.schema) {
                                if (content.schema.validationFunction && _options.validation.response) {
                                    validationDependencies.push(content.schema.validationFunction)
                                }
                                if (content.schema.dependencies && _options.types.response) {
                                    typeDependencies.push(content.schema.dependencies)
                                }
                            }
                        }
                    }
                }
            })
            const cleanTypeDependencies: Array<string> = []
            for (const td of typeDependencies) {
                for (const dep of td) {
                    if (!cleanTypeDependencies.includes(dep)) cleanTypeDependencies.push(dep)
                }
            }
            const cleanValidationDependencies = validationDependencies.filter((v,i,s) => s.indexOf(v) == i)
            map.set(key, { typeDependencies: cleanTypeDependencies, validationDependencies: cleanValidationDependencies })
        }
    }

    return map
}

/**
 * generates a file validation.ts containing validation functions for all schemas (ValidationBlueprints) of the given OpenAPIData
 * generates files {basePath}.ts containing validation functions for the input and output of all operations corresponding to basePath
 * @param openAPIData OpenAPIData with ValidationBlueprints
 * @param outPath path to write files to
 */
function generateValidationFunctions(openAPIData: OpenAPIData, outPath: string) {
    const ajv = new Ajv({ code: { source: true, esm: true }, verbose: true, inlineRefs: false })
    addFormats(ajv)
    let mapping: any = {}
    if (openAPIData.validationBlueprints) {
        for (const validationBlueprint of openAPIData.validationBlueprints) {
            ajv.addSchema(validationBlueprint.schema, validationBlueprint.schemaLocation)
            mapping[validationBlueprint.name] = validationBlueprint.schemaLocation
        }
    }
    let moduleCode = standaloneCode(ajv, mapping)
    fs.writeFileSync(`${outPath}/validation.ts`, "//@ts-nocheck\n" + format(moduleCode, { parser: "babel", tabWidth: 4 }))

    const dependencies = getDependencies(openAPIData, { types: { response: false } })
    if (openAPIData.routeFunctions) {
        for (const key in openAPIData.routeFunctions) {
            fs.writeFileSync(`${outPath}/${key}.ts`, nunjucks.render("validation.njk", {
                functions: openAPIData.routeFunctions[key],
                typeDependencies: dependencies.get(key) ? dependencies.get(key)!.typeDependencies : [],
                validationDependencies: dependencies.get(key) ? dependencies.get(key)!.validationDependencies : []
            }))
        }
    }
}

/**
 * generates files {basePath}.ts containing the corresponding express router with its endpoints
 * @param openAPIData OpenAPIData with RouteFunctions
 * @param outPath path to write files to
 */
function generateRoutes(openAPIData: OpenAPIData, outPath: string) {
    const dependencies = getDependencies(openAPIData, { types: { response: false } })
    if (openAPIData.routeFunctions) {
        for (const key in openAPIData.routeFunctions) {
            const validationDependencies = []
            for (const routeFunction of openAPIData.routeFunctions[key]) {
                validationDependencies.push(routeFunction.validateInput)
                validationDependencies.push(routeFunction.validateOutput)
            }
            fs.writeFileSync(`${outPath}/${key}.ts`, nunjucks.render("route.njk", {
                basePath: key,
                functions: openAPIData.routeFunctions[key],
                typeDependencies: dependencies.get(key) ? dependencies.get(key)!.typeDependencies : [],
                validationDependencies: validationDependencies
            }))
        }
    }
}

/**
 * generates files {basePath}.ts containing templates for all operations corresponding to basePath
 * @param openAPIData OpenAPIData with RouteFunctions
 * @param outPath path to write files to
 */
function generateOperationTemplates(openAPIData: OpenAPIData, outPath: string) {
    const dependencies = getDependencies(openAPIData)
    if (openAPIData.routeFunctions) {
        for (const key in openAPIData.routeFunctions) {
            const signatures = []
            for (const routeFunction of openAPIData.routeFunctions[key]) {
                signatures.push(routeFunction.signature)
            }
            fs.writeFileSync(`${outPath}/${key}.ts`, nunjucks.render("operations.njk", {
                functions: openAPIData.routeFunctions[key],
                basePath: key,
                signatures: signatures,
                typeDependencies: dependencies.get(key) ? dependencies.get(key)!.typeDependencies : []
            }))
        }
    }
}

/**
 * generates files {basePath}.ts containing the signatures for all operations corresponding to basePath
 * @param openAPIData OpenAPIData with RouteFunctions
 * @param outPath path to write files to
 */
function generateSignatures(openAPIData: OpenAPIData, outPath: string) {
    const dependencies = getDependencies(openAPIData)
    if (openAPIData.routeFunctions) {
        for (const key in openAPIData.routeFunctions) {
            const signatures = []
            for (const routeFunction of openAPIData.routeFunctions[key]) {
                signatures.push(routeFunction.signature)
            }
            fs.writeFileSync(`${outPath}/${key}.ts`, nunjucks.render("signatures.njk", {
                functions: openAPIData.routeFunctions[key],
                basePath: key,
                signatures: signatures,
                typeDependencies: dependencies.get(key) ? dependencies.get(key)!.typeDependencies : []
            }))
        }
    }
}

/**
 * generates file index.ts which exports the express app
 * @param openAPIData OpenAPIData with RouteFunctions
 * @param outPath path to write file to
 */
function generateIndex(openAPIData: OpenAPIData, outPath: string) {
    fs.writeFileSync(`${outPath}/index.ts`, nunjucks.render("index.njk", {
        routes: openAPIData.routeFunctions ? Object.keys(openAPIData.routeFunctions) : []
    }))
}

/**
 * generates all files (types, validation, routes, operations, signatures, index) for a given openapi specification
 * @param apiPath path to the openapi specification
 * @param options options for parsing
 * @param options.outPath base path for generation 
 */
async function generateProject(apiPath: string, options: { outPath: string }) {
    const outPath = path.join(options.outPath, "/src/generated")
    const routesPath = outPath + "/routes"
    const operationTemplatesPath = outPath + "/operations_templates"
    const signaturesPath = outPath + "/signatures"
    const validationPath = outPath + "/validation"
    if (fs.existsSync(outPath)) fs.rmdirSync(outPath, { recursive: true })
    fs.mkdirSync(outPath, { recursive: true })
    fs.mkdirSync(routesPath)
    fs.mkdirSync(operationTemplatesPath)
    fs.mkdirSync(signaturesPath)
    fs.mkdirSync(validationPath)

    nunjucks.configure(__dirname + "/templates")

    const parsedAPI = await parse(apiPath).catch((err) => {
        console.log(err)
        exit(1)
    })

    const openAPIData = await parseOpenAPIData(parsedAPI)

    await generateTypes(openAPIData, outPath)
    generateValidationFunctions(openAPIData, validationPath)
    generateRoutes(openAPIData, routesPath)
    generateOperationTemplates(openAPIData, operationTemplatesPath)
    generateSignatures(openAPIData, signaturesPath)
    generateIndex(openAPIData, outPath)
}

if (require.main === module) {
    generateProject(process.argv[2], { outPath: "." })
}