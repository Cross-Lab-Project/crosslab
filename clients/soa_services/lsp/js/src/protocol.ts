import { MessagingProtocol } from '@cross-lab-project/abstract-messaging-channel';
import {
  DirectorySchema,
  DirectoryWithoutNameSchema,
  FileWithoutNameSchema,
} from '@cross-lab-project/filesystem-schemas';
import { z } from 'zod';

type LanguageServerRole = 'client' | 'server';
type LanguageServerMessageType =
  | 'lsp:initialization:request'
  | 'lsp:initialization:response'
  | 'lsp:filesystem:read:request'
  | 'lsp:filesystem:read:response'
  | 'lsp:filesystem:event:created'
  | 'lsp:filesystem:event:changed'
  | 'lsp:filesystem:event:deleted'
  | 'lsp:message';

export const languageServerMessagingProtocol = {
  messageTypes: [
    'lsp:initialization:request',
    'lsp:initialization:response',
    'lsp:filesystem:read:request',
    'lsp:filesystem:read:response',
    'lsp:filesystem:event:created',
    'lsp:filesystem:event:changed',
    'lsp:filesystem:event:deleted',
    'lsp:message',
  ],
  messages: {
    'lsp:initialization:request': z.object({
      sourceUri: z.string(),
      sourceDirectory: DirectorySchema,
      configuration: z.optional(z.record(z.unknown())),
    }),
    'lsp:initialization:response': z.object({
      configuration: z.record(z.unknown()),
    }),
    'lsp:filesystem:read:request': z.object({
      requestId: z.string(),
      path: z.string(),
    }),
    'lsp:filesystem:read:response': z.union([
      z.object({
        requestId: z.string(),
        success: z.literal(true),
        content: z.string(),
      }),
      z.object({
        requestId: z.string(),
        success: z.literal(false),
        message: z.optional(z.string()),
      }),
    ]),
    'lsp:message': z.string(),
    'lsp:filesystem:event:created': z.object({
      path: z.string(),
      entry: z.union([FileWithoutNameSchema, DirectoryWithoutNameSchema]),
    }),
    'lsp:filesystem:event:changed': z.object({
      path: z.string(),
      entry: z.union([FileWithoutNameSchema, DirectoryWithoutNameSchema]),
    }),
    'lsp:filesystem:event:deleted': z.object({
      path: z.string(),
    }),
  },
  roles: ['client', 'server'],
  roleMessages: {
    client: {
      incoming: [
        'lsp:initialization:response',
        'lsp:filesystem:read:response',
        'lsp:message',
      ],
      outgoing: [
        'lsp:initialization:request',
        'lsp:filesystem:read:request',
        'lsp:filesystem:event:created',
        'lsp:filesystem:event:changed',
        'lsp:filesystem:event:deleted',
        'lsp:message',
      ],
    },
    server: {
      incoming: [
        'lsp:initialization:request',
        'lsp:filesystem:read:request',
        'lsp:filesystem:event:created',
        'lsp:filesystem:event:changed',
        'lsp:filesystem:event:deleted',
        'lsp:message',
      ],
      outgoing: [
        'lsp:initialization:response',
        'lsp:filesystem:read:response',
        'lsp:message',
      ],
    },
  },
} as const satisfies MessagingProtocol<LanguageServerMessageType, LanguageServerRole>;

export type LanguageServerMessagingProtocol = typeof languageServerMessagingProtocol;
