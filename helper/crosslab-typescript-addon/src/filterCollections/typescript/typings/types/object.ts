import { generateTyping, TypingOptions, Typing } from '../typing'
import { OpenAPIV3_1 } from 'openapi-types'

export function handleObject(
    schema: OpenAPIV3_1.SchemaObject,
    comment: string,
    options: TypingOptions
): Typing {
    const required = schema.required ?? []
    const properties = []
    let dependencies: Array<string> = []
    if (schema.properties) {
        for (const property of Object.keys(schema.properties)) {
            const td = generateTyping(schema.properties[property], options)
            properties.push(
                `${td.comment}${property}${required.includes(property) ? '' : '?'}: ${
                    td.typeDeclaration
                }`
            )
            dependencies = dependencies.concat(td.typeDependencies)
        }
    }
    if (schema.additionalProperties !== false) {
        properties.push('[k: string]: unknown')
    }
    if (options.inline)
        return {
            typeDeclaration: `{${properties.join(', ')}}`,
            typeDependencies: dependencies,
            comment: comment,
        }
    else
        return {
            typeDeclaration: `{\n\t${properties.join('\n').replace(/\n/gi, '\n\t')}\n}`,
            typeDependencies: dependencies,
            comment: comment,
        }
}
