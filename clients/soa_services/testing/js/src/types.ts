import { Ajv } from 'ajv';
import { JSONSchema } from 'json-schema-to-ts';
import { z } from 'zod';

export type FunctionDescription = {
  name: string;
  argumentSchemas: JSONSchema[];
  returnValueSchema?: JSONSchema;
};
export const functionDescriptionSchema = z.object({
  name: z.string(),
  argumentSchemas: z.custom<JSONSchema[]>(data => {
    const ajv = new Ajv();

    if (!Array.isArray(data)) {
      return false;
    }

    return data.every(schema => ajv.validateSchema(schema));
  }),
  returnValueSchema: z.optional(
    z.custom<JSONSchema>(data => {
      if (data === undefined) return true;

      const ajv = new Ajv();

      return ajv.validateSchema(data, true);
    }),
  ),
});

export type Test = {
  name: string;
  functions: {
    producerId: string;
    functionName: string;
    args: unknown[];
    expect?: unknown;
  }[];
  children?: Test[];
};

export type TestWithId = Omit<Test, 'children'> & {
  id: string;
  children?: TestWithId[];
};

const testBaseSchema = z.object({
  name: z.string(),
  functions: z.array(
    z.object({
      producerId: z.string(),
      functionName: z.string(),
      args: z.array(z.unknown()),
      expect: z.unknown(),
    }),
  ),
});
export const testSchema: z.Schema<Test> = testBaseSchema.extend({
  children: z.lazy(() => z.optional(z.array(testSchema))),
});

export function isTest(input: unknown): input is Test {
  return testSchema.safeParse(input).success;
}

export type Arguments<T extends readonly JSONSchema[]> = T extends [
  infer Head extends JSONSchema,
  ...infer Tail extends JSONSchema[],
]
  ? [SimpleFromSchema<Head>, ...Arguments<Tail>]
  : [];

export type SimpleFromSchema<T extends JSONSchema> = T extends {
  type: 'string';
}
  ? string
  : T extends { type: 'number' }
    ? number
    : T extends { type: 'integer' }
      ? number
      : T extends { type: 'object' }
        ? object
        : T extends { type: 'array' }
          ? unknown[]
          : T extends { type: 'null' }
            ? null
            : never;
