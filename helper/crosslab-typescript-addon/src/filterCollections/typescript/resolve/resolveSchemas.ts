import { formatName, formatOperation } from '../format'
import { userTypeSchema } from '../schemas/userType'
import { ExtendedSchema } from '../types'
import { removeReadOnly, removeWriteOnly } from './removeReadWriteOnly'
import { OpenAPIV3_1 } from 'openapi-types'

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
export function resolveSchemas(
    inputApi: OpenAPIV3_1.Document,
    isService: boolean = true
): ExtendedSchema[] {
    const extendedSchemas: ExtendedSchema[] = []
    const api = JSON.parse(JSON.stringify(inputApi)) as OpenAPIV3_1.Document

    // Add UserType schema
    if (isService)
        extendedSchemas.push({
            ...userTypeSchema,
            'x-standalone': true,
            'x-name': 'UserType',
            'x-location': `#/components/schemas/user_type`,
            'x-service-name': 'Utility',
            'x-schema-type': 'all',
        })

    // Search in components
    if (api.components) extendedSchemas.push(...parseComponents(api.components))

    // Search in paths
    if (api.paths) extendedSchemas.push(...parsePaths(api.paths, isService))

    const _extendedSchemas = JSON.parse(
        JSON.stringify(extendedSchemas)
    ) as ExtendedSchema[]

    for (const extendedSchema of _extendedSchemas) {
        const requestSchema = removeReadOnly(extendedSchema)
        const responseSchema = removeWriteOnly(extendedSchema)

        requestSchema['x-schema-type'] = 'request'
        responseSchema['x-schema-type'] = 'response'

        requestSchema['x-name'] += 'Request'
        responseSchema['x-name'] += 'Response'

        requestSchema['x-location'] += '_request'
        responseSchema['x-location'] += '_response'

        extendedSchemas.push(...[requestSchema, responseSchema])
    }

    return extendedSchemas
}

function parseComponents(components: OpenAPIV3_1.ComponentsObject): ExtendedSchema[] {
    const extendedSchemas: ExtendedSchema[] = []

    // Search for schemas in components
    if (components.schemas)
        extendedSchemas.push(...parseComponentsSchemas(components.schemas))
    // Search for parameters in components
    if (components.parameters)
        extendedSchemas.push(...parseComponentsParameters(components.parameters))

    return extendedSchemas
}

function parseComponentsSchemas(
    schemas: OpenAPIV3_1.ComponentsObject['schemas']
): ExtendedSchema[] {
    const extendedSchemas: ExtendedSchema[] = []

    for (const schemaName in schemas) {
        const name = formatName(schemas[schemaName].title ?? 'MISSING')
        extendedSchemas.push({
            ...schemas[schemaName],
            'x-standalone': true,
            'x-name': name,
            'x-location': `#/components/schemas/${schemaName}`,
            'x-service-name': (schemas[schemaName] as any)['x-service-name'],
            'x-schema-type': 'all',
        })
    }

    return extendedSchemas
}

function parseComponentsParameters(
    parameters: OpenAPIV3_1.ComponentsObject['parameters']
): ExtendedSchema[] {
    const extendedSchemas: ExtendedSchema[] = []

    for (const parameterName in parameters) {
        const parameter = parameters[parameterName] as OpenAPIV3_1.ParameterObject
        const schema = parameter.schema as OpenAPIV3_1.SchemaObject
        extendedSchemas.push({
            ...schema,
            'x-standalone': false,
            'x-name': formatName(parameter.name),
            'x-location': `#/components/parameters/${parameterName}/schema`,
            'x-service-name': (schema as any)['x-service-name'],
            'x-schema-type': 'all',
        })
    }

    return extendedSchemas
}

function parsePaths(paths: OpenAPIV3_1.PathsObject, isService: boolean) {
    const extendedSchemas: ExtendedSchema[] = []

    for (const path in paths) {
        const pathItem = paths[path] as OpenAPIV3_1.PathItemObject
        extendedSchemas.push(...parsePathItem(pathItem, path, isService))
    }

    return extendedSchemas
}

function parsePathItem(
    pathItem: OpenAPIV3_1.PathItemObject,
    path: string,
    isService: boolean
): ExtendedSchema[] {
    const extendedSchemas: ExtendedSchema[] = []

    for (const method of Object.keys(pathItem)) {
        const operation = pathItem[
            method as OpenAPIV3_1.HttpMethods
        ] as OpenAPIV3_1.OperationObject

        const requestBody = operation.requestBody as
            | OpenAPIV3_1.RequestBodyObject
            | undefined

        // Add requestBody schema if present
        if (requestBody) {
            const extendedSchema = parseRequestBody(
                requestBody,
                operation,
                path,
                method,
                isService
            )
            if (extendedSchema) extendedSchemas.push(extendedSchema)
        }

        // Search for response schemas
        if (operation.responses)
            extendedSchemas.push(
                ...parseResponses(operation.responses, operation, path, method, isService)
            )
    }
    return extendedSchemas
}

function parseRequestBody(
    requestBody: OpenAPIV3_1.RequestBodyObject,
    operation: OpenAPIV3_1.OperationObject,
    path: string,
    method: string,
    isService: boolean
): ExtendedSchema | undefined {
    const schema = requestBody.content['application/json'].schema
    return schema
        ? {
              ...schema,
              'x-standalone': false,
              'x-name': isService
                  ? formatOperation(path, method) + 'RequestBody'
                  : formatName(operation.operationId ?? '', false) + 'Body',
              'x-location': `#/paths/${path}/${method}/requestBody/content/application/json/schema`,
              'x-service-name': (operation as any)['x-service-name'],
              'x-schema-type': 'all',
          }
        : undefined
}

function parseResponses(
    responses: OpenAPIV3_1.ResponsesObject,
    operation: OpenAPIV3_1.OperationObject,
    path: string,
    method: string,
    isService: boolean
): ExtendedSchema[] {
    const extendedSchemas: ExtendedSchema[] = []

    for (const status in responses) {
        const response = responses[status] as OpenAPIV3_1.ResponseObject
        const content = response.content
        if (content && content['application/json'].schema) {
            extendedSchemas.push({
                ...content['application/json'].schema,
                'x-standalone': false,
                'x-name': isService
                    ? formatOperation(path, method) + 'Response' + status
                    : formatName(operation.operationId ?? '', false) +
                      'Response' +
                      status,
                'x-location': `#/paths/${path}/${method}/responses/${status}/content/application/json/schema`,
                'x-service-name': (operation as any)['x-service-name'],
                'x-schema-type': 'all',
            })
        }
        if (response.headers)
            extendedSchemas.push(
                ...parseHeaders(
                    response.headers,
                    operation,
                    path,
                    method,
                    status,
                    isService
                )
            )
    }

    return extendedSchemas
}

function parseHeaders(
    headers: OpenAPIV3_1.ResponseObject['headers'],
    operation: OpenAPIV3_1.OperationObject,
    path: string,
    method: string,
    status: string,
    isService: boolean
): ExtendedSchema[] {
    const extendedSchemas: ExtendedSchema[] = []

    for (const headerName in headers) {
        const header = headers[headerName] as OpenAPIV3_1.HeaderObject
        if (header.schema) {
            extendedSchemas.push({
                ...header.schema,
                'x-standalone': false,
                'x-name': isService
                    ? formatOperation(path, method) + 'Header' + formatName(headerName)
                    : formatName(operation.operationId ?? '', false) +
                      formatName(headerName),
                'x-location': `#/paths/${path}/${method}/responses/${status}/headers/${headerName}/schema`,
                'x-service-name': (operation as any)['x-service-name'],
                'x-schema-type': 'all',
            })
        }
    }

    return extendedSchemas
}
