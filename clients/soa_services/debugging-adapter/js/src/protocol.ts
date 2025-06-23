import { MessagingProtocol } from '@cross-lab-project/abstract-messaging-channel';
import { DirectorySchema } from '@cross-lab-project/filesystem-schemas';
import { z } from 'zod';

import { DebugAdapterProtocolSchemas } from './dap-zod-schemas';

type DebuggingAdapterProtocolMessageType =
  | 'message:dap'
  | 'session:start:request'
  | 'session:start:response'
  | 'session:join:request'
  | 'session:join:response';
type DebuggingAdapterProtocolRole = 'client' | 'server';

export const debuggingAdapterProtocol = {
  messageTypes: [
    'message:dap',
    'session:start:request',
    'session:start:response',
    'session:join:request',
    'session:join:response',
  ],
  roles: ['client', 'server'],
  messages: {
    'message:dap': z.object({
      sessionId: z.string(),
      message: DebugAdapterProtocolSchemas.ProtocolMessage,
    }),
    'session:start:request': z.object({
      requestId: z.string(),
      directory: DirectorySchema,
      configuration: z.optional(z.record(z.unknown())), // TODO: add option to instantiate protocol with configuration schema
    }),
    'session:start:response': z.union([
      z.object({
        requestId: z.string(),
        success: z.literal(true),
        message: z.optional(z.string()),
        sessionId: z.string(),
        configuration: z.optional(z.record(z.unknown())),
      }),
      z.object({
        requestId: z.string(),
        success: z.literal(false),
        message: z.optional(z.string()),
      }),
    ]),
    'session:join:request': z.object({
      requestId: z.string(),
      sessionId: z.string(),
    }),
    'session:join:response': z.union([
      z.object({
        requestId: z.string(),
        success: z.literal(true),
        message: z.optional(z.string()),
        sessionId: z.string(),
        configuration: z.optional(z.record(z.unknown())),
      }),
      z.object({
        requestId: z.string(),
        success: z.literal(false),
        message: z.optional(z.string()),
      }),
    ]),
  },
  roleMessages: {
    client: {
      incoming: ['message:dap', 'session:start:response', 'session:join:response'],
      outgoing: ['message:dap', 'session:start:request', 'session:join:request'],
    },
    server: {
      incoming: ['message:dap', 'session:start:request', 'session:join:request'],
      outgoing: ['message:dap', 'session:start:response', 'session:join:response'],
    },
  },
} as const satisfies MessagingProtocol<
  DebuggingAdapterProtocolMessageType,
  DebuggingAdapterProtocolRole
>;

export type DebuggingAdapterProtocol = typeof debuggingAdapterProtocol;
