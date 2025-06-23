import { MessagingProtocol } from '@cross-lab-project/abstract-messaging-channel';
import {
  DirectorySchema,
  DirectoryWithoutNameSchema,
  FileSchema,
  FileWithoutNameSchema,
} from '@cross-lab-project/filesystem-schemas';
import { z } from 'zod';

type FileSystemProtocolMessageType =
  | 'exists:request'
  | 'exists:response'
  | 'stat:request'
  | 'stat:response'
  | 'createDirectory:request'
  | 'createDirectory:response'
  | 'delete:request'
  | 'delete:response'
  | 'move:request'
  | 'move:response'
  | 'copy:request'
  | 'copy:response'
  | 'readDirectory:request'
  | 'readDirectory:response'
  | 'readFile:request'
  | 'readFile:response'
  | 'unwatch:request'
  | 'unwatch:response'
  | 'watch:request'
  | 'watch:response'
  | 'watch-event'
  | 'writeFile:request'
  | 'writeFile:response';
type FileSystemProtocolRole = 'producer' | 'consumer';

export const fileSystemProtocol = {
  messageTypes: [
    'exists:request',
    'exists:response',
    'stat:request',
    'stat:response',
    'createDirectory:request',
    'createDirectory:response',
    'delete:request',
    'delete:response',
    'move:request',
    'move:response',
    'copy:request',
    'copy:response',
    'readDirectory:request',
    'readDirectory:response',
    'readFile:request',
    'readFile:response',
    'unwatch:request',
    'unwatch:response',
    'watch:request',
    'watch:response',
    'watch-event',
    'writeFile:request',
    'writeFile:response',
  ],
  messages: {
    'exists:request': z.object({
      requestId: z.string(),
      path: z.string(),
    }),
    'exists:response': z.union([
      z.object({
        requestId: z.string(),
        success: z.literal(true),
        exists: z.boolean(),
      }),
      z.object({
        requestId: z.string(),
        success: z.literal(false),
        message: z.optional(z.string()),
      }),
    ]),
    'stat:request': z.object({
      requestId: z.string(),
      path: z.string(),
    }),
    'stat:response': z.union([
      z.object({
        requestId: z.string(),
        success: z.literal(true),
        stat: z.object({
          type: z.union([z.literal('file'), z.literal('directory')]),
          ctime: z.number(),
          mtime: z.number(),
          size: z.number(),
        }),
      }),
      z.object({
        requestId: z.string(),
        success: z.literal(false),
        message: z.optional(z.string()),
      }),
    ]),
    'createDirectory:request': z.object({
      requestId: z.string(),
      path: z.string(),
      content: z.optional(z.array(z.union([DirectorySchema, FileSchema]))),
    }),
    'createDirectory:response': z.union([
      z.object({
        requestId: z.string(),
        success: z.literal(true),
      }),
      z.object({
        requestId: z.string(),
        success: z.literal(false),
        message: z.optional(z.string()),
      }),
    ]),
    'delete:request': z.object({
      requestId: z.string(),
      path: z.string(),
    }),
    'delete:response': z.union([
      z.object({
        requestId: z.string(),
        success: z.literal(true),
      }),
      z.object({
        requestId: z.string(),
        success: z.literal(false),
        message: z.optional(z.string()),
      }),
    ]),
    'move:request': z.object({
      requestId: z.string(),
      path: z.string(),
      newPath: z.string(),
    }),
    'move:response': z.union([
      z.object({
        requestId: z.string(),
        success: z.literal(true),
      }),
      z.object({
        requestId: z.string(),
        success: z.literal(false),
        message: z.optional(z.string()),
      }),
    ]),
    'copy:request': z.object({
      requestId: z.string(),
      path: z.string(),
      newPath: z.string(),
    }),
    'copy:response': z.union([
      z.object({
        requestId: z.string(),
        success: z.literal(true),
      }),
      z.object({
        requestId: z.string(),
        success: z.literal(false),
        message: z.optional(z.string()),
      }),
    ]),
    'readDirectory:request': z.object({
      requestId: z.string(),
      path: z.string(),
    }),
    'readDirectory:response': z.union([
      z.object({
        requestId: z.string(),
        success: z.literal(true),
        directory: DirectorySchema,
      }),
      z.object({
        requestId: z.string(),
        success: z.literal(false),
        message: z.optional(z.string()),
      }),
    ]),
    'readFile:request': z.object({
      requestId: z.string(),
      path: z.string(),
    }),
    'readFile:response': z.union([
      z.object({
        requestId: z.string(),
        success: z.literal(true),
        file: FileSchema,
      }),
      z.object({
        requestId: z.string(),
        success: z.literal(false),
        message: z.optional(z.string()),
      }),
    ]),
    'unwatch:request': z.object({
      requestId: z.string(),
      watcherId: z.string(),
    }),
    'unwatch:response': z.union([
      z.object({
        requestId: z.string(),
        success: z.literal(true),
      }),
      z.object({
        requestId: z.string(),
        success: z.literal(false),
        message: z.optional(z.string()),
      }),
    ]),
    'watch:request': z.object({
      requestId: z.string(),
      path: z.optional(z.string()),
    }),
    'watch:response': z.union([
      z.object({
        requestId: z.string(),
        success: z.literal(true),
        watcherId: z.string(),
      }),
      z.object({
        requestId: z.string(),
        success: z.literal(false),
        message: z.optional(z.string()),
      }),
    ]),
    'watch-event': z.union([
      z.object({
        watcherId: z.string(),
        type: z.literal('changed'),
        path: z.string(),
        newContent: z.union([
          z.instanceof(Uint8Array),
          z.record(z.union([DirectoryWithoutNameSchema, FileWithoutNameSchema])),
        ]),
      }),
      z.object({
        watcherId: z.string(),
        type: z.literal('moved'),
        oldPath: z.string(),
        newPath: z.string(),
      }),
      z.object({
        watcherId: z.string(),
        type: z.literal('created'),
        path: z.string(),
        entry: z.union([DirectorySchema, FileSchema]),
      }),
      z.object({
        watcherId: z.string(),
        type: z.literal('deleted'),
        path: z.string(),
      }),
    ]),
    'writeFile:request': z.object({
      requestId: z.string(),
      path: z.string(),
      content: z.instanceof(Uint8Array),
    }),
    'writeFile:response': z.union([
      z.object({
        requestId: z.string(),
        success: z.literal(true),
      }),
      z.object({
        requestId: z.string(),
        success: z.literal(false),
        message: z.optional(z.string()),
      }),
    ]),
  },
  roles: ['consumer', 'producer'],
  roleMessages: {
    consumer: {
      incoming: [
        'exists:response',
        'stat:response',
        'createDirectory:response',
        'delete:response',
        'move:response',
        'copy:response',
        'readDirectory:response',
        'readFile:response',
        'unwatch:response',
        'watch:response',
        'watch-event',
        'writeFile:response',
      ],
      outgoing: [
        'exists:request',
        'stat:request',
        'createDirectory:request',
        'delete:request',
        'move:request',
        'copy:request',
        'readDirectory:request',
        'readFile:request',
        'unwatch:request',
        'watch:request',
        'writeFile:request',
      ],
    },
    producer: {
      incoming: [
        'exists:request',
        'stat:request',
        'createDirectory:request',
        'delete:request',
        'move:request',
        'copy:request',
        'readDirectory:request',
        'readFile:request',
        'unwatch:request',
        'watch:request',
        'writeFile:request',
      ],
      outgoing: [
        'exists:response',
        'stat:response',
        'createDirectory:response',
        'delete:response',
        'move:response',
        'copy:response',
        'readDirectory:response',
        'readFile:response',
        'unwatch:response',
        'watch:response',
        'watch-event',
        'writeFile:response',
      ],
    },
  },
} as const satisfies MessagingProtocol<
  FileSystemProtocolMessageType,
  FileSystemProtocolRole
>;

export type FileSystemProtocol = typeof fileSystemProtocol;
