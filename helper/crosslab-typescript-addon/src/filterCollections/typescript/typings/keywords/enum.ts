import { Typing } from '../typing'
import { OpenAPIV3_1 } from 'openapi-types'

export function handleEnum(schema: OpenAPIV3_1.SchemaObject, comment: string): Typing {
    return {
        typeDeclaration: '"' + schema.enum?.join('" | "') + '"',
        typeDependencies: [],
        comment: comment,
    }
}
