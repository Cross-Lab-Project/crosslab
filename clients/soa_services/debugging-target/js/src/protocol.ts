import { MessagingProtocol } from '@cross-lab-project/abstract-messaging-channel';
import z from 'zod';

export const debuggingTargetProtocol = {
  messageTypes: [
    'debugging:start:request',
    'debugging:start:response',
    'debugging:end:request',
    'debugging:end:response',
    'debugging:message',
  ],
  messages: {
    'debugging:start:request': z.object({
      requestId: z.string(),
      program: z.instanceof(Uint8Array),
    }),
    'debugging:start:response': z.object({
      requestId: z.string(),
      success: z.boolean(),
      message: z.optional(z.string()),
    }),
    'debugging:end:request': z.object({
      requestId: z.string(),
    }),
    'debugging:end:response': z.object({
      requestId: z.string(),
      success: z.boolean(),
      message: z.optional(z.string()),
    }),
    'debugging:message': z.unknown(),
  },
  roles: ['client', 'target'],
  roleMessages: {
    client: {
      incoming: [
        'debugging:start:response',
        'debugging:end:response',
        'debugging:message',
      ],
      outgoing: ['debugging:start:request', 'debugging:end:request', 'debugging:message'],
    },
    target: {
      incoming: ['debugging:start:request', 'debugging:end:request', 'debugging:message'],
      outgoing: [
        'debugging:start:response',
        'debugging:end:response',
        'debugging:message',
      ],
    },
  },
} as const satisfies MessagingProtocol;

export type DebuggingTargetProtocol = typeof debuggingTargetProtocol;
