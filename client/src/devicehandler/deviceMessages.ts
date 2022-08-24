export interface Message {
  messageType: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMessage(message: any): message is Message {
  return "messageType" in message;
}

export interface CommandMessage {
  messageType: "command";
  command: string;
}
export function isCommandMessage(message: Message): message is CommandMessage {
  return message.messageType === "command";
}

export interface ServiceConfiguration {
  serviceType: string;
  serviceId: string;
  remoteServiceId: string;
}

export interface CreatePeerConnectionMessage extends CommandMessage {
  command: "createPeerConnection";
  connectiontype: string;
  url: string;
  services: ServiceConfiguration[];
  tiebreaker: boolean;
}
export function isCreatePeerConnectionMessage(
  message: CommandMessage
): message is CreatePeerConnectionMessage {
  return message.command === "createPeerConnection";
}

export interface SignalingMessage extends Message {
  messageType: "signaling";
  connectionUrl: string;
}
export function isSignalingMessage(message: Message): message is SignalingMessage {
  return message.messageType === "signaling";
}

export interface ServiceDescription {
  serviceType: string;
  serviceId: string;
  serviceDirection: string;
  interfaces: any[];
}

export interface DeviceDescription {
  services: ServiceDescription[];
}
