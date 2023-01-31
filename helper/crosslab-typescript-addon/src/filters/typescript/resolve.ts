import { OpenAPIV3_1 } from 'openapi-types'
import { formatName, formatOperation } from './format'
import { userTypeSchema } from './schemas/userType'

/**
 * This type extends a SchemaObject with the properties 'x-name', 'x-standalone', 
 * 'x-location' and 'x-service-name'. 'x-name' contains the formatted name of the 
 * schema, 'x-standalone' determines whether a validation function should be 
 * generated for this schema and 'x-location' contains the location of the schema 
 * inside of its containing document. 'x-service-name' contains the name of the
 * service the schema belongs to.
 */
export type ExtendedSchema = OpenAPIV3_1.SchemaObject & {
    'x-standalone': boolean
    'x-name': string
    'x-location': string
    'x-service-name': string
    'x-schema-type': "request"|"response"|"all"
}

type SimplifiedParameter = {
    name: string
    required: boolean
    in: string
    description?: string
    schema?: OpenAPIV3_1.SchemaObject
}

type SimplifiedRequestBody = {
    required: boolean
    description?: string
    schema?: OpenAPIV3_1.SchemaObject
}

type SimplifiedHeader = {
    name: string
    required: boolean
    schema?: OpenAPIV3_1.SchemaObject
}

type SimplifiedResponse = {
    status: string
    description: string
    schema?: OpenAPIV3_1.SchemaObject
    headers?: SimplifiedHeader[]
}

export type SimplifiedOperation = {
    name: string
    path: string
    method: string
    external: boolean
    serviceName: string
    operationId: string
    summary: string
    destructureInput: boolean
    buildUrl: boolean
    optionalUrl: boolean
    isProxyRequest: boolean
    security?: OpenAPIV3_1.SecurityRequirementObject[]
    parameters?: SimplifiedParameter[]
    requestBody?: SimplifiedRequestBody
    responses?: SimplifiedResponse[]
}

/**
 * This function tries to resolve the Operations of a given OpenAPI document.
 * @param api The OpenAPI document for which to resolve the Operations.
 * @returns The resolved Operations.
 */
export function resolveOperations(api: OpenAPIV3_1.Document): SimplifiedOperation[] {
    const simplifiedPathItems: SimplifiedOperation[] = []

    // Search for PathItems in paths
    if (api.paths) {
        for (const path of Object.keys(api.paths)) {
            const pathItem = api.paths[path] as OpenAPIV3_1.PathItemObject
            for (const method of Object.keys(pathItem)) {
                const operation = pathItem[
                    method as OpenAPIV3_1.HttpMethods
                ] as OpenAPIV3_1.OperationObject

                // Create SimplifiedOperation with known properties
                let simplifiedOperation: SimplifiedOperation = {
                    name: formatOperation(path, method),
                    path: path,
                    method: method,
                    serviceName: (operation as any)["x-service-name"],
                    operationId: operation.operationId ?? "",
                    security: operation.security,
                    summary: operation.summary ?? "",
                    external: (operation as any)["x-internal"] ? false : true,
                    destructureInput: (operation as any)["x-destructure-input"] ?? false,
                    buildUrl: (operation as any)["x-build-url"] ?? false,
                    optionalUrl: (operation as any)["x-optional-url"] ?? false,
                    isProxyRequest: (operation as any)["x-proxy-request"] ?? false
                }

                // Search for parameters to add
                const parameters = operation.parameters as
                    | OpenAPIV3_1.ParameterObject[]
                    | undefined
                if (parameters) {
                    for (const parameter of parameters) {
                        if (!simplifiedOperation.parameters)
                            simplifiedOperation.parameters = []
                        const simplifiedParameter: SimplifiedParameter = {
                            name: parameter.name,
                            required: parameter.required ?? false,
                            in: parameter.in,
                            description: parameter.description,
                            schema: parameter.schema as
                                | OpenAPIV3_1.SchemaObject
                                | undefined,
                        }
                        simplifiedOperation.parameters.push(simplifiedParameter)
                    }
                }

                // Search for requestBody to add
                const requestBody = operation.requestBody as
                    | OpenAPIV3_1.RequestBodyObject
                    | undefined
                if (requestBody) {
                    simplifiedOperation.requestBody = {
                        description: requestBody.description,
                        required: requestBody.required ?? false,
                    }
                    const content = requestBody.content
                    const schema = content['application/json'].schema
                    if (schema) {
                        simplifiedOperation.requestBody.schema = schema
                    }
                }

                // Search for responses to add
                const responses = operation.responses as
                    | OpenAPIV3_1.ResponsesObject
                    | undefined
                for (const status in responses) {
                    if (!simplifiedOperation.responses) simplifiedOperation.responses = []
                    const response = responses[status] as OpenAPIV3_1.ResponseObject
                    const simplifiedResponse: SimplifiedResponse = {
                        status: status,
                        description: response.description
                    }
                    // Add schema of response if present
                    if ('content' in response) {
                        const content = response.content
                        if (content) {
                            const schema = content['application/json'].schema
                            if (schema) {
                                simplifiedResponse.schema = schema
                            }
                        }
                    }
                    // Add headers of response if present
                    if (response.headers) {
                        simplifiedResponse.headers = []
                        for (const headerName in response.headers) {
                            const header = response.headers[
                                headerName
                            ] as OpenAPIV3_1.HeaderObject
                            simplifiedResponse.headers.push({
                                name: formatName(headerName),
                                required: header.required ?? false,
                                schema: header.schema as
                                    | OpenAPIV3_1.SchemaObject
                                    | undefined,
                            })
                        }
                    }
                    simplifiedOperation.responses.push(simplifiedResponse)
                }

                simplifiedPathItems.push(simplifiedOperation)
            }
        }
    }

    return simplifiedPathItems
}

/**
 * This function tries to resolve the Schemas of a given OpenAPI document.
 * @param api The OpenAPI document for which to resolve the Schemas.
 * @param isService 
 * If true the UserType schema is added and method path will be used for 
 * naming. Otherwise the operationId will be used for naming.
 * @returns
 * The resolved Schemas with additional properties 'x-name', 'x-standalone'
 * and 'x-location'
 */
export function resolveSchemas(api: OpenAPIV3_1.Document, isService: boolean = true): ExtendedSchema[] {
    const extendedSchemas: ExtendedSchema[] = []

    // Add UserType schema
    if (isService)
        extendedSchemas.push({
            ...userTypeSchema,
            'x-standalone': true,
            'x-name': 'UserType',
            'x-location': `#/components/schemas/user_type`,
            'x-service-name': 'Utility',
            'x-schema-type': "all"
        })

    // Search in components
    if (api.components) {
        // Search for schemas in components
        if (api.components.schemas) {
            for (const schemaName in api.components.schemas) {
                const name = formatName(api.components.schemas[schemaName].title ?? "MISSING")
                extendedSchemas.push({
                    ...api.components.schemas[schemaName],
                    'x-standalone': true,
                    'x-name': name,
                    'x-location': `#/components/schemas/${schemaName}`,
                    'x-service-name': (api.components.schemas[schemaName] as any)["x-service-name"],
                    'x-schema-type': "all"
                })
            }
        }
        // Search for parameters in components
        if (api.components.parameters) {
            for (const parameterName in api.components.parameters) {
                const parameter = api.components.parameters[
                    parameterName
                ] as OpenAPIV3_1.ParameterObject
                const schema = parameter.schema as OpenAPIV3_1.SchemaObject
                extendedSchemas.push({
                    ...schema,
                    'x-standalone': false,
                    'x-name': formatName(parameter.name),
                    'x-location': `#/components/parameters/${parameterName}/schema`,
                    'x-service-name': (schema as any)["x-service-name"],
                    'x-schema-type': "all"
                })
            }
        }
    }

    // Search in paths
    if (api.paths) {
        for (const path of Object.keys(api.paths)) {
            const pathItem = api.paths[path] as OpenAPIV3_1.PathItemObject
            for (const method of Object.keys(pathItem)) {
                const operation = pathItem[
                    method as OpenAPIV3_1.HttpMethods
                ] as OpenAPIV3_1.OperationObject
                const requestBody = operation.requestBody as
                    | OpenAPIV3_1.RequestBodyObject
                    | undefined

                // Add requestBody schema if present
                if (requestBody) {
                    const content = requestBody.content
                    const schema = content['application/json'].schema
                    if (schema) {
                        extendedSchemas.push({
                            ...schema,
                            'x-standalone': false,
                            'x-name': isService ? 
                                formatOperation(path, method) + 'RequestBody' :
                                formatName(operation.operationId ?? "", false) + 'Body',
                            'x-location': `#/paths/${path}/${method}/requestBody/content/application/json/schema`,
                            'x-service-name': (operation as any)['x-service-name'],
                            'x-schema-type': "all"
                        })
                    }
                }

                // Search for response schemas
                const responses = operation.responses
                for (const status in responses) {
                    const response = responses[status] as OpenAPIV3_1.ResponseObject
                    if ('content' in response) {
                        const content = response.content
                        if (content) {
                            const schema = content['application/json'].schema
                            if (schema) {
                                extendedSchemas.push({
                                    ...schema,
                                    'x-standalone': false,
                                    'x-name': isService ?
                                        formatOperation(path, method) +
                                        'Response' +
                                        status :
                                        formatName(operation.operationId ?? "", false) + 
                                        'Response' + 
                                        status,
                                    'x-location': `#/paths/${path}/${method}/responses/${status}/content/application/json/schema`,
                                    'x-service-name': (operation as any)['x-service-name'],
                                    'x-schema-type': "all"
                                })
                            }
                        }
                    }
                    if (response.headers) {
                        for (const headerName in response.headers) {
                            const schema = (response.headers[headerName] as OpenAPIV3_1.HeaderObject).schema
                            if (schema) {
                                extendedSchemas.push({
                                    ...schema,
                                    'x-standalone': false,
                                    'x-name': isService ?
                                        formatOperation(path, method) +
                                        'Header' +
                                        formatName(headerName):
                                        formatName(operation.operationId ?? "", false) +
                                        formatName(headerName),
                                    'x-location': `#/paths/${path}/${method}/responses/${status}/headers/${headerName}/schema`,
                                    'x-service-name': (operation as any)["x-service-name"],
                                    'x-schema-type': "all"
                                })
                            }
                        }
                    }
                }
            }
        }
    }

    const _extendedSchemas = JSON.parse(JSON.stringify(extendedSchemas)) as ExtendedSchema[]

    for (const extendedSchema of _extendedSchemas) {
        const readonlyRegex = /"[^\"]*?":{[^{}]*?"readOnly":true[^{}]*?},?/gms
        const writeonlyRegex = /"[^\"]*?":{[^{}]*?"writeOnly":true[^{}]*?},?/gms

        const stringifiedExtendedSchema = JSON.stringify(extendedSchema)
        const stringifiedRequestSchema = stringifiedExtendedSchema
            .replace(readonlyRegex,"")
            .replace(/,}/g,"}")
            .replace(/"\$ref":"(.*?)"/g, '"$ref":"$1_request"')
        const stringifiedResponseSchema = stringifiedExtendedSchema
            .replace(writeonlyRegex,"")
            .replace(/,}/g,"}")
            .replace(/"\$ref":"(.*?)"/g, '"$ref":"$1_response"')

        const requestSchema = JSON.parse(stringifiedRequestSchema) as ExtendedSchema
        const responseSchema = JSON.parse(stringifiedResponseSchema) as ExtendedSchema

        requestSchema['x-schema-type'] = "request"
        responseSchema['x-schema-type'] = "response"

        requestSchema['x-name'] += "Request"
        responseSchema['x-name'] += "Response"

        requestSchema['x-location'] += "_request"
        responseSchema['x-location'] += "_response"

        extendedSchemas.push(...[requestSchema, responseSchema])
    }

    return extendedSchemas
}

/**
 * This function attempts to generate invalid versions of a given schema by recursively removing
 * required attributes or replacing them with invalid types / formats.
 * @param schema The schema to use as a template.
 * @param prefix A prefix to generate the path to the removed property.
 * @returns A list of invalid versions of the template schema with the path of the removed property.
 */
export function generateInvalidSchemas(schema: OpenAPIV3_1.SchemaObject, prefix: string = "schema"): {
    schema: OpenAPIV3_1.SchemaObject,
    path: string,
    operation: "remove" | "change-type" | "remove-format" | "remove-enum" | "negate-type"
}[] {
    const invalidSchemas: ReturnType<typeof generateInvalidSchemas> = []

    const anySchemas: OpenAPIV3_1.SchemaObject[] = [
        {
            type: "array",
            items: {}
        },
        {
            type: "boolean"
        },
        {
            type: "integer"
        },
        {
            type: "null"
        },
        {
            type: "number"
        },
        {
            type: "object"
        },
        {
            type: "string"
        }
    ]

    if (schema.allOf) {
        for (const [index, subSchema] of schema.allOf.entries()) {
            const invalidSubSchemas = generateInvalidSchemas(
                subSchema,
                `${prefix}.allOf[${index}]`
            )
            invalidSchemas.push(...invalidSubSchemas)
        }
    }

    if (schema.anyOf) {
        for (const [index, subSchema] of schema.anyOf.entries()) {
            const invalidSubSchemas = generateInvalidSchemas(
                subSchema,
                `${prefix}.allOf[${index}]`
            )
            invalidSchemas.push(...invalidSubSchemas)
        }
    }

    if (schema.oneOf) {
        for (const [index, subSchema] of schema.oneOf.entries()) {
            const invalidSubSchemas = generateInvalidSchemas(
                subSchema,
                `${prefix}.allOf[${index}]`
            )
            invalidSchemas.push(...invalidSubSchemas)
        }
    }

    // remove format
    if (schema.format) {
        const invalidSchema = {
            ...schema
        }
        delete invalidSchema.format

        invalidSchemas.push({
            schema: invalidSchema,
            path: `${prefix}`,
            operation: "remove-format"
        })
    }

    // remove enum
    if (schema.enum) {
        const invalidSchema = {
            ...schema
        }
        delete invalidSchema.enum

        invalidSchemas.push({
            schema: invalidSchema,
            path: `${prefix}`,
            operation: "remove-enum"
        })
    }
    
    // change type
    if (schema.type) {
        invalidSchemas.push({
            schema: {
                anyOf: [
                    ...anySchemas.filter((s) => s.type !== schema.type)
                ]
            },
            path: `${prefix}`,
            operation: "change-type"
        })
    }

    invalidSchemas.push({
        schema: {
            not: schema
        },
        path: `${prefix}`,
        operation: "negate-type"
    })

    switch (schema.type) {
        case "object": 
            if (schema.properties) {
                // remove required properties
                if (schema.required) {
                    for (const requiredProperty of schema.required) {
                        const removedSchema = {
                            ...schema,
                            properties: {
                                ...schema.properties
                            }
                        }
                        removedSchema.required = removedSchema.required?.filter((r) => r !== requiredProperty)
                        delete removedSchema.properties![requiredProperty]

                        invalidSchemas.push({
                            schema: removedSchema,
                            path: `${prefix}.${requiredProperty}`,
                            operation: "remove"
                        })
                    }
                }

                // recurse into properties
                for (const propertyName in schema.properties) {
                    const property = schema.properties[propertyName] as OpenAPIV3_1.SchemaObject

                    const invalidPropertySchemas = generateInvalidSchemas(
                        property,
                        `${prefix}.${propertyName}`
                    )

                    for (const invalidPropertySchema of invalidPropertySchemas) {
                        const invalidSchema = {
                            ...schema,
                            properties: {
                                ...schema.properties
                            }
                        }
                        invalidSchema.properties[propertyName] = invalidPropertySchema.schema

                        if (
                            (invalidPropertySchema.operation !== "remove") &&
                            !invalidSchema.required?.find((r) => r === propertyName)
                        ) {
                            if (!invalidSchema.required) 
                                invalidSchema.required = [propertyName]
                            else 
                                invalidSchema.required.push(propertyName)
                        }

                        invalidSchemas.push({
                            ...invalidPropertySchema,
                            schema: invalidSchema
                        })
                    }
                }
            }
            break
        case "array":
            const invalidItemsSchemas = generateInvalidSchemas(
                schema.items,
                `${prefix}.items`
            )
            for (const invalidItemsSchema of invalidItemsSchemas) {
                const currentSchema = schema
                invalidSchemas.push({
                    ...invalidItemsSchema,
                    schema: {
                        ...currentSchema,
                        items: invalidItemsSchema.schema
                    }
                })
            }
            break
        default:
            break
    }

    return invalidSchemas
}

/**
 * Generates versions of a given schema without one of the unrequired properties.
 * @param schema The schema for which to generate the versions.
 * @param prefix A prefix to generate the path to the removed property. 
 * @returns A list of schemas with each one missing an unrequired property.
 */
export function generateSchemasWithoutUnrequired(schema: OpenAPIV3_1.SchemaObject, prefix: string = "schema"): {
    schema: OpenAPIV3_1.SchemaObject,
    path: string
}[] {
    const schemasWithoutUnrequired: ReturnType<typeof generateSchemasWithoutUnrequired> = []

    if (schema.properties) {
        for (const propertyName in schema.properties) {
            // top-level
            if (!schema.required?.find((r) => r === propertyName)) {
                const schemaWithoutUnrequired = {
                    ...schema,
                    properties: {
                        ...schema.properties
                    }
                }
                delete schemaWithoutUnrequired.properties![propertyName]

                schemasWithoutUnrequired.push({
                    schema: schemaWithoutUnrequired,
                    path: `${prefix}.${propertyName}`
                })
            }

            // recurse
            const propertySchemasWithoutUnrequired = generateSchemasWithoutUnrequired(
                schema.properties[propertyName],
                `${prefix}.${propertyName}`
            )

            for (const propertySchemaWithoutUnrequired of propertySchemasWithoutUnrequired) {
                const schemaWithoutUnrequired = {
                    ...schema,
                    properties: {
                        ...schema.properties
                    }
                }
                schemaWithoutUnrequired.properties[propertyName] = propertySchemaWithoutUnrequired.schema

                schemasWithoutUnrequired.push({
                    ...propertySchemaWithoutUnrequired,
                    schema: schemaWithoutUnrequired
                })
            }
        }
    }

    return schemasWithoutUnrequired
}