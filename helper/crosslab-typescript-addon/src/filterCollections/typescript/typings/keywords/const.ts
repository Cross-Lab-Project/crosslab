import { Typing } from '../typing'
import { OpenAPIV3_1 } from 'openapi-types'

export function handleConst(schema: OpenAPIV3_1.SchemaObject, comment: string): Typing {
    if (typeof (schema as any).const === 'string')
        return {
            typeDeclaration: `"${(schema as any).const}"`,
            typeDependencies: [],
            comment: comment,
        }
    else
        return {
            typeDeclaration: `${(schema as any).const}`,
            typeDependencies: [],
            comment: comment,
        }
}
