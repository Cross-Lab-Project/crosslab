import { OpenAPIV3_1 } from 'openapi-types'

export const userTypeSchema = <OpenAPIV3_1.SchemaObject>{
    title: 'User Type',
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
