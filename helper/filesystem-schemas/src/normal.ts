import { z } from 'zod';

// declare schemas and types for files without a name

export const FileWithoutNameSchema = z.object({
  type: z.literal('file'),
  content: z.instanceof(Uint8Array),
});
export type FileWithoutName = z.infer<typeof FileWithoutNameSchema>;
export function isFileWithoutName(input: unknown): input is FileWithoutName {
  return FileWithoutNameSchema.safeParse(input).success;
}

// declare schemas and types for files with a name

export const FileSchema = FileWithoutNameSchema.extend({
  name: z.string(),
});
export type File = z.infer<typeof FileSchema>;
export function isFile(input: unknown): input is File {
  return FileSchema.safeParse(input).success;
}

// declare schemas and types for directories without a name

export const DirectoryWithoutNameBaseSchema = z.object({
  type: z.literal('directory'),
});
export type DirectoryWithoutName = z.infer<typeof DirectoryWithoutNameBaseSchema> & {
  content: Record<string, FileWithoutName | DirectoryWithoutName>;
};
export const DirectoryWithoutNameSchema: z.Schema<DirectoryWithoutName> =
  DirectoryWithoutNameBaseSchema.extend({
    content: z.lazy(() =>
      z.record(z.union([DirectoryWithoutNameSchema, FileWithoutNameSchema])),
    ),
  });
export function isDirectoryWithoutName(input: unknown): input is DirectoryWithoutName {
  return DirectoryWithoutNameSchema.safeParse(input).success;
}

// declare schemas and types for directories with a name

export const DirectorySchema = z.object({
  type: z.literal('directory'),
  name: z.string(),
  content: z.record(z.union([DirectoryWithoutNameSchema, FileWithoutNameSchema])),
});
export type Directory = z.infer<typeof DirectorySchema>;
export function isDirectory(input: unknown): input is Directory {
  return DirectorySchema.safeParse(input).success;
}
