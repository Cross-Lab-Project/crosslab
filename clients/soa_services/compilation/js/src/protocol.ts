import {
  Directory,
  DirectorySchema,
  DirectoryWithoutNameBaseSchema,
  File,
  FileSchema,
  FileWithoutNameSchema,
} from '@cross-lab-project/filesystem-schemas';
import { z } from 'zod';

// declare schemas and types for file result formats without a name

const FileResultFormatWithoutNameSchema = FileWithoutNameSchema.omit({
  content: true,
}).extend({
  description: z.optional(z.string()),
});
type FileResultFormatWithoutName = z.infer<typeof FileResultFormatWithoutNameSchema>;

// declare schemas and types for file result formats without a name

const FileResultFormatSchema = FileSchema.omit({ content: true }).extend({
  description: z.optional(z.string()),
});
type FileResultFormat = z.infer<typeof FileResultFormatSchema>;

// declare schemas and types for directory result formats without a name

const DirectoryResultFormatWithoutNameBaseSchema = DirectoryWithoutNameBaseSchema.extend({
  description: z.optional(z.string()),
});
type DirectoryResultFormatWithoutName = z.infer<
  typeof DirectoryResultFormatWithoutNameBaseSchema
> & {
  content: Record<string, FileResultFormatWithoutName | DirectoryResultFormatWithoutName>;
};
const DirectoryResultFormatWithoutNameSchema: z.Schema<DirectoryResultFormatWithoutName> =
  DirectoryResultFormatWithoutNameBaseSchema.extend({
    content: z.lazy(() =>
      z.record(
        z.union([
          DirectoryResultFormatWithoutNameSchema,
          FileResultFormatWithoutNameSchema,
        ]),
      ),
    ),
  });

// declare schemas and types for directory result formats with a name

const DirectoryResultFormatSchema = DirectorySchema.omit({
  content: true,
}).extend({
  description: z.optional(z.string()),
  content: z.record(
    z.union([DirectoryResultFormatWithoutNameSchema, FileResultFormatWithoutNameSchema]),
  ),
});
type DirectoryResultFormat = z.infer<typeof DirectoryResultFormatSchema>;

// declare types for result formats

export type UniqueResultFormatArray<R extends readonly ResultFormat[]> =
  R extends readonly [
    infer Head extends ResultFormat,
    ...infer Tail extends ResultFormat[],
  ]
    ? Head['id'] extends IdArray<Tail>[number]
      ? never
      : [Head, ...UniqueResultFormatArray<Tail>]
    : R;

export type IdArray<A extends readonly { id: string }[]> = A extends [
  infer Head extends { id: string },
  ...infer Tail extends readonly { id: string }[],
]
  ? [Head['id'], ...IdArray<Tail>]
  : [];

export type ResultFormat = {
  id: string;
  description?: string;
  result: FileResultFormat | DirectoryResultFormat;
};

type FormattedResult<R extends ResultFormat> = {
  type: R['result']['type'];
  name: R['result']['name'];
  content: R['result'] extends DirectoryResultFormat
    ? FormattedDirectoryResultContent<R['result']>
    : Uint8Array;
};

type FormattedDirectoryResultContent<D extends Omit<DirectoryResultFormat, 'name'>> = {
  [k in keyof D['content']]: D['content'][k] extends Omit<DirectoryResultFormat, 'name'>
    ? {
        type: 'directory';
        content: FormattedDirectoryResultContent<D['content'][k]>;
      }
    : {
        type: 'file';
        content: Uint8Array;
      };
};

type FormattedResponse<
  R extends ResultFormat[],
  sawEntry extends boolean = false,
> = R extends [infer Head extends ResultFormat, ...infer Tail extends ResultFormat[]]
  ?
      | {
          requestId: string;
          success: true;
          message?: string;
          format: Head['id'];
          result: FormattedResult<Head>;
        }
      | FormattedResponse<Tail, true>
  : sawEntry extends false
    ? {
        requestId: string;
        success: true;
        message?: string;
        format?: string;
        result: Directory | File;
      }
    : never;

function buildDirectoryContentSchema(
  directory: DirectoryResultFormatWithoutName,
): z.Schema {
  return z.object(
    Object.fromEntries(
      Object.entries(directory.content).map(([key, value]) => {
        return [
          key,
          value.type === 'file'
            ? z.object({
                type: z.literal('file'),
                content: z.instanceof(Uint8Array),
              })
            : z.object({
                type: z.literal('directory'),
                content: buildDirectoryContentSchema(value),
              }),
        ];
      }),
    ),
  );
}

function buildResultSchemaFromResultFormat<R extends ResultFormat>(
  resultFormat: R,
): z.Schema<FormattedResult<R>> {
  return z.object({
    type: z.literal(resultFormat.result.type),
    name: z.literal(resultFormat.result.name),
    content:
      resultFormat.result.type === 'file'
        ? z.instanceof(Uint8Array)
        : buildDirectoryContentSchema(resultFormat.result),
  }) as z.Schema<FormattedResult<R>>;
}

function buildResponseSchemaFromResultFormats<R extends ResultFormat[]>(
  resultFormatsInput?: R,
): z.Schema<FormattedResponse<R>> {
  const resultFormats = resultFormatsInput ?? [];
  if (resultFormats.length === 0) {
    return z.object({
      requestId: z.string(),
      success: z.literal(true),
      message: z.optional(z.string()),
      format: z.optional(z.string()),
      result: z.union([DirectorySchema, FileSchema]),
    }) as unknown as z.Schema<FormattedResponse<R>>;
  } else if (resultFormats.length === 1) {
    return z.object({
      requestId: z.string(),
      success: z.literal(true),
      message: z.optional(z.string()),
      format: z.literal(resultFormats[0].id),
      result: buildResultSchemaFromResultFormat(resultFormats[0]),
    }) as unknown as z.Schema<FormattedResponse<R>>;
  } else {
    return z.union([
      z.object({
        requestId: z.string(),
        success: z.literal(true),
        message: z.optional(z.string()),
        format: z.literal(resultFormats[0].id),
        result: buildResultSchemaFromResultFormat(resultFormats[0]),
      }),
      z.object({
        requestId: z.string(),
        success: z.literal(true),
        message: z.optional(z.string()),
        format: z.literal(resultFormats[1].id),
        result: buildResultSchemaFromResultFormat(resultFormats[1]),
      }),
      ...resultFormats.slice(2).map(resultFormat => {
        return z.object({
          requestId: z.string(),
          success: z.literal(true),
          message: z.optional(z.string()),
          format: z.literal(resultFormat.id),
          result: buildResultSchemaFromResultFormat(resultFormat),
        });
      }),
    ]) as unknown as z.Schema<FormattedResponse<R>>;
  }
}

// declare type for compilation protocol

export type CompilationProtocol<R extends ResultFormat[] = []> = {
  messageTypes: ['compilation:request', 'compilation:response'];
  messages: {
    'compilation:request': z.ZodType<{
      requestId: string;
      directory: Directory;
      format?: IdArray<R>[number];
    }>;
    'compilation:response': z.ZodType<
      | {
          requestId: string;
          success: true;
          message?: string;
          result: File | Directory;
        }
      | {
          requestId: string;
          success: false;
          message?: string;
        }
      | FormattedResponse<R>
    >;
  };
  roles: ['client', 'server'];
  roleMessages: {
    client: {
      incoming: ['compilation:response'];
      outgoing: ['compilation:request'];
    };
    server: {
      incoming: ['compilation:request'];
      outgoing: ['compilation:response'];
    };
  };
};

export function buildCompilationProtocol<R extends ResultFormat[] = []>(
  resultFormatsInput?: R,
): CompilationProtocol<R> {
  const resultFormats = resultFormatsInput ?? [];
  return {
    messageTypes: ['compilation:request', 'compilation:response'],
    messages: {
      'compilation:request': z.object({
        requestId: z.string(),
        directory: DirectorySchema,
        format:
          resultFormats.length === 0
            ? z.optional(z.string())
            : resultFormats.length === 1
              ? z.optional(z.literal(resultFormats[0].id))
              : z.optional(
                  z.union([
                    z.literal(resultFormats[0].id),
                    z.literal(resultFormats[1].id),
                    ...resultFormats
                      .slice(2)
                      .map(resultFormat => z.literal(resultFormat.id)),
                  ]),
                ),
      }),
      'compilation:response': z.union([
        z.strictObject({
          requestId: z.string(),
          success: z.literal(true),
          message: z.optional(z.string()),
          result: z.union([FileSchema, DirectorySchema]),
        }),
        z.object({
          requestId: z.string(),
          success: z.literal(false),
          message: z.optional(z.string()),
        }),
        buildResponseSchemaFromResultFormats(resultFormats),
      ]) as unknown as CompilationProtocol<R>['messages']['compilation:response'],
    },
    roles: ['client', 'server'],
    roleMessages: {
      client: {
        incoming: ['compilation:response'],
        outgoing: ['compilation:request'],
      },
      server: {
        incoming: ['compilation:request'],
        outgoing: ['compilation:response'],
      },
    },
  };
}
