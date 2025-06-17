import { MessagingProtocol } from '@cross-lab-project/abstract-messaging-channel';
import { DirectorySchema, FileSchema } from '@cross-lab-project/filesystem-schemas';
import { z } from 'zod';

type ProgrammingProtocolMessageType = 'program:request' | 'program:response';
type ProgrammingProtocolRole = 'programmer' | 'target';
export type ProgrammingProtocol = typeof programmingProtocol;

export const programmingProtocol = {
  messageTypes: ['program:request', 'program:response'],
  messages: {
    'program:request': z.object({
      requestId: z.string(),
      program: z.union([FileSchema, DirectorySchema]),
    }),
    'program:response': z.object({
      requestId: z.string(),
      success: z.boolean(),
      message: z.optional(z.string()),
    }),
  },
  roles: ['programmer', 'target'],
  roleMessages: {
    programmer: {
      incoming: ['program:response'],
      outgoing: ['program:request'],
    },
    target: {
      incoming: ['program:request'],
      outgoing: ['program:response'],
    },
  },
} as const satisfies MessagingProtocol<
  ProgrammingProtocolMessageType,
  ProgrammingProtocolRole
>;
