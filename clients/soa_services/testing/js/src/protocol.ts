import { MessagingProtocol } from '@cross-lab-project/abstract-messaging-channel';
import { z } from 'zod';

type TestingProtocolMessageType =
  | 'testing:start:request'
  | 'testing:start:response'
  | 'testing:end:request'
  | 'testing:end:response'
  | 'testing:function:call'
  | 'testing:function:return';
type TestingProtocolRole = 'consumer' | 'producer';

export const testingProtocol = {
  messageTypes: [
    'testing:start:request',
    'testing:start:response',
    'testing:end:request',
    'testing:end:response',
    'testing:function:call',
    'testing:function:return',
  ],
  messages: {
    'testing:start:request': z.object({
      requestId: z.string(),
    }),
    'testing:start:response': z.object({
      requestId: z.string(),
      success: z.boolean(),
      message: z.optional(z.string()),
    }),
    'testing:end:request': z.object({
      requestId: z.string(),
    }),
    'testing:end:response': z.object({
      requestId: z.string(),
      success: z.boolean(),
      message: z.optional(z.string()),
    }),
    'testing:function:call': z.object({
      requestId: z.string(),
      functionName: z.string(),
      args: z.array(z.unknown()),
    }),
    'testing:function:return': z.union([
      z.object({
        requestId: z.string(),
        success: z.literal(true),
        message: z.optional(z.string()),
        returnValue: z.unknown(),
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
        'testing:start:response',
        'testing:end:response',
        'testing:function:return',
      ],
      outgoing: ['testing:start:request', 'testing:end:request', 'testing:function:call'],
    },
    producer: {
      incoming: ['testing:start:request', 'testing:end:request', 'testing:function:call'],
      outgoing: [
        'testing:start:response',
        'testing:end:response',
        'testing:function:return',
      ],
    },
  },
} as const satisfies MessagingProtocol<TestingProtocolMessageType, TestingProtocolRole>;
