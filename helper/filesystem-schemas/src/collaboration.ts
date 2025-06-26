// declare schemas and types for files without a name
import { z } from 'zod';

import { Directory, DirectoryWithoutName, File, FileWithoutName } from './normal.js';

export const CollaborationFileWithoutNameSchema = z.object({
  type: z.literal('file'),
  content: z.string(),
});
export type CollaborationFileWithoutName = z.infer<
  typeof CollaborationFileWithoutNameSchema
>;
export function isCollaborationFileWithoutName(
  input: unknown,
): input is CollaborationFileWithoutName {
  return CollaborationFileWithoutNameSchema.safeParse(input).success;
}

// declare schemas and types for files with a name

export const CollaborationFileSchema = CollaborationFileWithoutNameSchema.extend({
  name: z.string(),
});
export type CollaborationFile = z.infer<typeof CollaborationFileSchema>;
export function isCollaborationFile(input: unknown): input is CollaborationFile {
  return CollaborationFileSchema.safeParse(input).success;
}

// declare schemas and types for directories without a name

const CollaborationDirectoryWithoutNameBaseSchema = z.object({
  type: z.literal('directory'),
});
export type CollaborationDirectoryWithoutName = z.infer<
  typeof CollaborationDirectoryWithoutNameBaseSchema
> & {
  content: Record<
    string,
    CollaborationFileWithoutName | CollaborationDirectoryWithoutName
  >;
};
export const CollaborationDirectoryWithoutNameSchema: z.Schema<CollaborationDirectoryWithoutName> =
  CollaborationDirectoryWithoutNameBaseSchema.extend({
    content: z.lazy(() =>
      z.record(
        z.union([
          CollaborationDirectoryWithoutNameSchema,
          CollaborationFileWithoutNameSchema,
        ]),
      ),
    ),
  });
export function isCollaborationDirectoryWithoutName(
  input: unknown,
): input is CollaborationDirectoryWithoutName {
  return CollaborationDirectoryWithoutNameSchema.safeParse(input).success;
}

// declare schemas and types for directories with a name

export const CollaborationDirectorySchema = z.object({
  type: z.literal('directory'),
  name: z.string(),
  content: z.record(
    z.union([
      CollaborationDirectoryWithoutNameSchema,
      CollaborationFileWithoutNameSchema,
    ]),
  ),
});
export type CollaborationDirectory = z.infer<typeof CollaborationDirectorySchema>;
export function isCollaborationDirectory(
  input: unknown,
): input is CollaborationDirectory {
  return CollaborationDirectorySchema.safeParse(input).success;
}

// define functions for converting normal files and directories to collaborative ones

export function convertToCollaborationFileWithoutName(
  file: FileWithoutName,
): CollaborationFileWithoutName {
  return {
    ...file,
    content: new TextDecoder().decode(file.content),
  };
}

export function convertToCollaborationFile(file: File): CollaborationFile {
  return {
    ...file,
    content: new TextDecoder().decode(file.content),
  };
}

export function convertToCollaborationDirectoryWithoutName(
  directory: DirectoryWithoutName,
): CollaborationDirectoryWithoutName {
  const collaborationDirectory: CollaborationDirectoryWithoutName = {
    ...directory,
    content: {},
  };

  for (const [key, value] of Object.entries(directory.content)) {
    collaborationDirectory.content[key] =
      value.type === 'file'
        ? convertToCollaborationFileWithoutName(value)
        : convertToCollaborationDirectoryWithoutName(value);
  }

  return collaborationDirectory;
}

export function convertToCollaborationDirectory(
  directory: Directory,
): CollaborationDirectory {
  const collaborationDirectory: CollaborationDirectory = {
    ...directory,
    content: {},
  };

  for (const [key, value] of Object.entries(directory.content)) {
    collaborationDirectory.content[key] =
      value.type === 'file'
        ? convertToCollaborationFileWithoutName(value)
        : convertToCollaborationDirectoryWithoutName(value);
  }

  return collaborationDirectory;
}

// define functions for converting collaborative files and directories to normal ones

export function convertToFileWithoutName(
  file: CollaborationFileWithoutName,
): FileWithoutName {
  return {
    ...file,
    content: new TextEncoder().encode(file.content) as Uint8Array<ArrayBuffer>,
  };
}

export function convertToFile(file: CollaborationFile): File {
  return {
    ...file,
    content: new TextEncoder().encode(file.content) as Uint8Array<ArrayBuffer>,
  };
}

export function convertToDirectoryWithoutName(
  directory: CollaborationDirectoryWithoutName,
): DirectoryWithoutName {
  const collaborationDirectory: DirectoryWithoutName = {
    ...directory,
    content: {},
  };

  for (const [key, value] of Object.entries(directory.content)) {
    collaborationDirectory.content[key] =
      value.type === 'file'
        ? convertToFileWithoutName(value)
        : convertToDirectoryWithoutName(value);
  }

  return collaborationDirectory;
}

export function convertToDirectory(directory: CollaborationDirectory): Directory {
  const collaborationDirectory: Directory = {
    ...directory,
    content: {},
  };

  for (const [key, value] of Object.entries(directory.content)) {
    collaborationDirectory.content[key] =
      value.type === 'file'
        ? convertToFileWithoutName(value)
        : convertToDirectoryWithoutName(value);
  }

  return collaborationDirectory;
}
