import { MessagingProtocol } from '@cross-lab-project/abstract-messaging-channel';
import { z } from 'zod';

export const collaborationProtocol = {
  messageTypes: [
    'collaboration:initialization:request',
    'collaboration:initialization:response',
    // "collaboration:awareness:request",
    // "collaboration:awareness:response",
    'collaboration:awareness:update',
    'collaboration:message',
  ],
  messages: {
    'collaboration:initialization:request': z.object({
      id: z.string(),
    }),
    'collaboration:initialization:response': z.undefined(),
    // "collaboration:awareness:request": z.undefined(),
    // "collaboration:awareness:response": z.unknown(),
    'collaboration:awareness:update': z.object({
      room: z.string(),
      states: z.record(
        z.object({
          clock: z.number(),
          lastUpdated: z.number(),
          state: z.union([z.record(z.unknown()), z.null()]),
        }),
      ),
    }),
    'collaboration:message': z.object({
      room: z.string(),
      type: z.string(),
      content: z.unknown(),
    }),
  },
  roles: ['consumer', 'producer', 'prosumer'],
  roleMessages: {
    consumer: {
      incoming: [
        'collaboration:initialization:response',
        // "collaboration:awareness:response",
        'collaboration:awareness:update',
        'collaboration:message',
      ],
      outgoing: [
        // "collaboration:awareness:request",
        'collaboration:awareness:update',
        'collaboration:message',
      ],
    },
    producer: {
      incoming: [
        // "collaboration:awareness:request",
        'collaboration:awareness:update',
        'collaboration:message',
      ],
      outgoing: [
        'collaboration:initialization:response',
        // "collaboration:awareness:response",
        'collaboration:awareness:update',
        'collaboration:message',
      ],
    },
    prosumer: {
      incoming: [
        'collaboration:initialization:request',
        'collaboration:initialization:response',
        // "collaboration:awareness:request",
        // "collaboration:awareness:response",
        'collaboration:awareness:update',
        'collaboration:message',
      ],
      outgoing: [
        'collaboration:initialization:request',
        'collaboration:initialization:response',
        // "collaboration:awareness:request",
        // "collaboration:awareness:response",
        'collaboration:awareness:update',
        'collaboration:message',
      ],
    },
  },
} as const satisfies MessagingProtocol<
  | 'collaboration:initialization:request'
  | 'collaboration:initialization:response'
  // | "collaboration:awareness:request"
  // | "collaboration:awareness:response"
  | 'collaboration:awareness:update'
  | 'collaboration:message',
  'consumer' | 'producer' | 'prosumer'
>;
