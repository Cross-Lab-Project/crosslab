import { z } from 'zod';

// define message schema

const messageSchema = z.object({
  messageType: z.string(),
});
export type Message = z.infer<typeof messageSchema>;
export function isMessage(input: unknown): input is Message {
  return messageSchema.safeParse(input).success;
}

// define command message schema

const commandMessageSchema = messageSchema.extend({
  messageType: z.literal('command'),
  command: z.string(),
});
export type CommandMessage = z.infer<typeof commandMessageSchema>;
export function isCommandMessage(input: unknown): input is CommandMessage {
  return commandMessageSchema.safeParse(input).success;
}

// define service configuration schema

const serviceConfigurationSchema = z.object({
  serviceType: z.string(),
  serviceId: z.string(),
  remoteServiceId: z.string(),
});
export type ServiceConfiguration = z.infer<typeof serviceConfigurationSchema>;

// define create peerconnection message schemas

const createPeerConnectionMessageBaseSchema = commandMessageSchema.extend({
  command: z.literal('createPeerconnection'),
  connectionType: z.string(),
  connectionUrl: z.string(),
  services: z.array(serviceConfigurationSchema),
  tiebreaker: z.boolean(),
});

const createWebSocketPeerConnectionMessageSchema =
  createPeerConnectionMessageBaseSchema.extend({
    connectionType: z.literal('websocket'),
    connectionOptions: z.object({
      webSocketUrl: z.string(),
    }),
  });

const createWebRTCPeerConnectionMessageSchema =
  createPeerConnectionMessageBaseSchema.extend({
    connectionType: z.literal('webrtc'),
    connectionOptions: z.object({
      iceServers: z.optional(
        z.array(
          z.object({
            urls: z.union([z.string(), z.array(z.string())]),
            username: z.optional(z.string()),
            credential: z.optional(z.string()),
          }),
        ),
      ),
    }),
  });

const createLocalPeerConnectionMessageSchema =
  createPeerConnectionMessageBaseSchema.extend({
    connectionType: z.literal('local'),
  });

const createPeerConnectionMessageSchema = z.union([
  createWebSocketPeerConnectionMessageSchema,
  createWebRTCPeerConnectionMessageSchema,
  createLocalPeerConnectionMessageSchema,
]);
export type CreatePeerConnectionMessage = z.infer<
  typeof createPeerConnectionMessageSchema
>;
export function isCreatePeerConnectionMessage(
  input: unknown,
): input is CreatePeerConnectionMessage {
  return createPeerConnectionMessageSchema.safeParse(input).success;
}

// define signaling message schema

const signalingMessageSchema = messageSchema.extend({
  messageType: z.literal('signaling'),
  connectionUrl: z.string(),
  signalingType: z.union([
    z.literal('options'),
    z.literal('offer'),
    z.literal('answer'),
    z.literal('candidate'),
  ]),
  content: z.unknown(),
});
export type SignalingMessage = z.infer<typeof signalingMessageSchema>;
export function isSignalingMessage(input: unknown): input is SignalingMessage {
  return signalingMessageSchema.safeParse(input).success;
}

// define close peerconnection message schema

const closePeerConnectionMessageSchema = commandMessageSchema.extend({
  command: z.literal('closePeerconnection'),
  connectionUrl: z.string(),
});
export type ClosePeerConnectionMessage = z.infer<typeof closePeerConnectionMessageSchema>;
export function isClosePeerConnectionMessage(
  input: unknown,
): input is ClosePeerConnectionMessage {
  return closePeerConnectionMessageSchema.safeParse(input).success;
}

// define connection state changed message schema

const connectionStateChangedMessageSchema = messageSchema.extend({
  messageType: z.literal('connection-state-changed'),
  connectionUrl: z.string(),
  status: z.union([
    z.literal('new'),
    z.literal('connecting'),
    z.literal('connected'),
    z.literal('disconnected'),
    z.literal('failed'),
    z.literal('closed'),
  ]),
});
export type ConnectionStateChangedMessage = z.infer<
  typeof connectionStateChangedMessageSchema
>;

// define configuration message schema

const configurationMessageSchema = messageSchema.extend({
  messageType: z.literal('configuration'),
  configuration: z.record(z.string(), z.unknown()),
});
export type ConfigurationMessage = z.infer<typeof configurationMessageSchema>;
export function isConfigurationMessage(input: unknown): input is ConfigurationMessage {
  return configurationMessageSchema.safeParse(input).success;
}

// define experiment status changed message schema

const experimentStatusChangedMessageSchema = messageSchema.extend({
  messageType: z.literal('experiment-status-changed'),
  status: z.union([
    z.literal('created'),
    z.literal('booked'),
    z.literal('setup'),
    z.literal('running'),
    z.literal('finished'),
  ]),
  message: z.optional(z.string()),
});
export type ExperimentStatusChangedMessage = z.infer<
  typeof experimentStatusChangedMessageSchema
>;
export function isExperimentStatusChangedMessage(
  input: unknown,
): input is ExperimentStatusChangedMessage {
  return experimentStatusChangedMessageSchema.safeParse(input).success;
}

// define service description schema

const serviceDescriptionSchema = z.object({
  serviceType: z.string(),
  serviceId: z.string(),
  serviceDirection: z.string(),
  interfaces: z.array(z.unknown()),
});
export type ServiceDescription = z.infer<typeof serviceDescriptionSchema>;

// define device description schema

const deviceDescriptionSchema = z.object({
  services: z.array(serviceDescriptionSchema),
});
export type DeviceDescription = z.infer<typeof deviceDescriptionSchema>;

// define websocket message type schema

const webSocketMessageSchema = z.union([
  z.object({
    type: z.literal('string'),
    channel: z.string(),
    content: z.string(),
  }),
  z.object({
    type: z.union([z.literal('arrayBuffer'), z.literal('blob')]),
    channel: z.string(),
    content: z.array(z.number()),
  }),
  z.object({
    type: z.literal('arrayBufferView'),
    channel: z.string(),
    content: z.object({
      buffer: z.array(z.number()),
      byteLength: z.number(),
      byteOffset: z.number(),
    }),
  }),
]);
export type WebSocketMessage = z.infer<typeof webSocketMessageSchema>;
export function isWebSocketMessage(input: unknown): input is WebSocketMessage {
  return webSocketMessageSchema.safeParse(input).success;
}
