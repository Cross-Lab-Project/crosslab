export interface Message {
  messageType: string;
  [key: string]: unknown;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMessage(message: any): message is Message {
  return 'messageType' in message;
}

export interface CommandMessage extends Message {
  messageType: 'command';
  command: string;
}
export function isCommandMessage(message: Message): message is CommandMessage {
  return message.messageType === 'command';
}

export interface ServiceConfiguration {
  serviceType: string;
  serviceId: string;
  remoteServiceId: string;
  [key: string]: any;
}

export interface CreatePeerConnectionMessage extends CommandMessage {
  command: 'createPeerConnection';
  connectiontype: string;
  connectionUrl: string;
  services: ServiceConfiguration[];
  tiebreaker: boolean;
}
export function isCreatePeerConnectionMessage(
  message: CommandMessage,
): message is CreatePeerConnectionMessage {
  return message.command.toLowerCase() === 'createpeerconnection';
}

export interface SignalingMessage extends Message {
  messageType: 'signaling';
  connectionUrl: string;
}
export function isSignalingMessage(message: Message): message is SignalingMessage {
  return message.messageType.toLowerCase() === 'signaling';
}

export interface ServiceDescription {
  serviceType: string;
  serviceId: string;
  serviceDirection: string;
  interfaces: unknown[];
}

export interface DeviceDescription {
  services: ServiceDescription[];
}

export interface ClosePeerConnectionMessage extends CommandMessage {
  command: 'closePeerconnection';
  connectionUrl: string;
}
export function isClosePeerConnectionMessage(
  message: CommandMessage,
): message is ClosePeerConnectionMessage {
  return message.command.toLowerCase() === 'closepeerconnection';
}

export interface ConnectionStateChangedMessage extends Message {
  messageType: 'connection-state-changed';
  connectionUrl: string;
  status: 'new' | 'connecting' | 'connected' | 'disconnected' | 'failed' | 'closed';
}

export interface ConfigurationMessage extends Message {
  messageType: 'configuration';
  configuration: { [k: string]: unknown };
}

export function isConfigurationMessage(
  message: Message,
): message is ConfigurationMessage {
  return (
    message.messageType.toLowerCase() === 'configuration' &&
    typeof message.configuration === 'object' &&
    message.configuration !== null
  );
}

export interface ExperimentStatusChangedMessage extends Message {
  messageType: 'experiment-status-changed';
  status: 'created' | 'booked' | 'setup' | 'running' | 'failed' | 'closed';
  message?: string;
}

export function isExperimentStatusChangedMessage(
  message: Message,
): message is ExperimentStatusChangedMessage {
  return (
    message.messageType.toLowerCase() === 'experiment-status-changed' &&
    typeof message.status === 'string' &&
    (message.message === undefined || typeof message.message === 'string')
  );
}
