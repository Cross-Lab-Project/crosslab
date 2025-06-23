import { MessagingProtocol } from '@cross-lab-project/abstract-messaging-channel';
import { z } from 'zod';

export const yjsCollaborationProtocol = {
  messageTypes: ['yjs:sync:step1', 'yjs:sync:step2', 'yjs:sync:done', 'yjs:sync:update'],
  messages: {
    'yjs:sync:step1': z.object({
      message: z.instanceof(Uint8Array),
    }),
    'yjs:sync:step2': z.object({
      message: z.instanceof(Uint8Array),
    }),
    'yjs:sync:done': z.undefined(),
    'yjs:sync:update': z.object({
      message: z.instanceof(Uint8Array),
    }),
  },
  roles: ['prosumer'],
  roleMessages: {
    prosumer: {
      incoming: ['yjs:sync:step1', 'yjs:sync:step2', 'yjs:sync:done', 'yjs:sync:update'],
      outgoing: ['yjs:sync:step1', 'yjs:sync:step2', 'yjs:sync:done', 'yjs:sync:update'],
    },
  },
} as const satisfies MessagingProtocol<
  'yjs:sync:step1' | 'yjs:sync:step2' | 'yjs:sync:done' | 'yjs:sync:update',
  'prosumer'
>;
