import { OpenAPIV3_1 } from 'openapi-types'
import { formatName, formatMethodPath } from './format'
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
}

type SimplifiedParameter = {
    name: string
    required: boolean
    in: string
    schema?: OpenAPIV3_1.SchemaObject
}

type SimplifiedRequestBody = {
    required: boolean
    schema?: OpenAPIV3_1.SchemaObject
}

type SimplifiedHeader = {
    name: string
    required: boolean
    schema?: OpenAPIV3_1.SchemaObject
}

type SimplifiedResponse = {
    status: number
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
                    name: formatMethodPath(path, method),
                    path: path,
                    method: method,
                    serviceName: (operation as any)["x-service-name"],
                    operationId: operation.operationId ?? "",
                    security: operation.security,
                    summary: operation.summary ?? "",
                    external: (operation as any)["x-internal"] ? false : true
                }

                // Search for parameters to add
                const parameters = operation.parameters as
                    | OpenAPIV3_1.ParameterObject[]
                    | undefined
                if (parameters) {
                    for (const parameter of parameters) {
                        if (!simplifiedOperation.parameters)
                            simplifiedOperation.parameters = []
                        const SimplifiedParameter: SimplifiedParameter = {
                            name: parameter.name,
                            required: parameter.required ?? false,
                            in: parameter.in,
                            schema: parameter.schema as
                                | OpenAPIV3_1.SchemaObject
                                | undefined,
                        }
                        simplifiedOperation.parameters.push(SimplifiedParameter)
                    }
                }

                // Search for requestBody to add
                const requestBody = operation.requestBody as
                    | OpenAPIV3_1.RequestBodyObject
                    | undefined
                if (requestBody) {
                    simplifiedOperation.requestBody = {
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
                        status: parseInt(status),
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
 * @returns
 * The resolved Schemas with additional properties 'x-name', 'x-standalone'
 * and 'x-location'
 */
export function resolveSchemas(api: OpenAPIV3_1.Document, addUserType: boolean = true): ExtendedSchema[] {
    const extendedSchemas: ExtendedSchema[] = []

    // Add UserType schema
    if (addUserType)
        extendedSchemas.push({
            ...userTypeSchema,
            'x-standalone': true,
            'x-name': 'UserType',
            'x-location': `#/components/schemas/user_type`,
            'x-service-name': 'Utility'
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
                    'x-service-name': (api.components.schemas[schemaName] as any)["x-service-name"]
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
                    'x-service-name': (schema as any)["x-service-name"]
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
                            'x-name': formatMethodPath(path, method) + 'RequestBody',
                            'x-location': `#/paths/${path}/${method}/requestBody/content/application/json/schema`,
                            'x-service-name': (operation as any)['x-service-name']
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
                                    'x-name':
                                        formatMethodPath(path, method) +
                                        'Response' +
                                        status,
                                    'x-location': `#/paths/${path}/${method}/responses/${status}/content/application/json/schema`,
                                    'x-service-name': (operation as any)['x-service-name']
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
                                    'x-name':
                                        formatMethodPath(path, method) +
                                        'Header' +
                                        formatName(headerName),
                                    'x-location': `#/paths/${path}/${method}/responses/${status}/headers/${headerName}/schema`,
                                    'x-service-name': (operation as any)["x-service-name"]
                                })
                            }
                        }
                    }
                }
            }
        }
    }

    return extendedSchemas
}
