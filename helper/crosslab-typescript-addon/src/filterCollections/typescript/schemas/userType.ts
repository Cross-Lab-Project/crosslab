import { OpenAPIV3_1 } from 'openapi-types'

/**
 * Schema for the type BasicUserType.
 */
export const basicUserTypeSchema: OpenAPIV3_1.SchemaObject & { 'x-typeguard': boolean } =
    {
        title: 'Basic User Type',
        type: 'object',
        properties: {
            url: {
                type: 'string',
                format: 'uri',
            },
            username: {
                type: 'string',
            },
            scopes: {
                type: 'array',
                items: {
                    type: 'string',
                },
            },
        },
        required: ['url', 'username', 'scopes'],
        'x-typeguard': true,
    }

/**
 * Schema for the type UserType<"JWT">.
 */
export const userTypeJwtSchema: OpenAPIV3_1.SchemaObject & { 'x-typeguard': boolean } = {
    title: 'User Type JWT',
    type: 'object',
    properties: {
        url: {
            type: 'string',
            format: 'uri',
        },
        username: {
            type: 'string',
        },
        scopes: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
        jwt: {
            type: 'string',
        },
    },
    required: ['url', 'username', 'scopes', 'jwt'],
    'x-typeguard': true,
}
