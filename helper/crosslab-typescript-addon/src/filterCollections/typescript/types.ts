import { OpenAPIV3_1 } from 'openapi-types'

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
    'x-schema-type': 'request' | 'response' | 'all'
}

export type SimplifiedParameter = {
    name: string
    required: boolean
    in: string
    description?: string
    schema?: OpenAPIV3_1.SchemaObject
}

export type SimplifiedRequestBody = {
    required: boolean
    description?: string
    schema?: OpenAPIV3_1.SchemaObject
}

export type SimplifiedHeader = {
    name: string
    required: boolean
    schema?: OpenAPIV3_1.SchemaObject
}

export type SimplifiedResponse = {
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
 * Interface for the property of a destructured schema.
 */
export interface DestructuredProperty {
    name: string
    declaration: string
    required: boolean
    description?: string
    top: boolean
}

/**
 * Typing for destructured schemas.
 */
export type DestructuredSchema = DestructuredProperty[]
