import { TypedEmitter } from 'tiny-typed-emitter';

import { SignalingMessage } from '../deviceMessages.js';
import { Channel } from './channel.js';

export type ServiceConfig = {
  serviceType: string;
  serviceId: string;
  remoteServiceId: string;
};
export interface PeerConnectionEvents {
  signalingMessage(msg: Omit<SignalingMessage, 'connectionUrl'>): void;
  connectionChanged(): void;
}
export interface PeerConnection extends TypedEmitter<PeerConnectionEvents> {
  channelExtension: { upstream: ((data: any) => any); downstream: ((data: any) => any); }| undefined;
  state: 'new' | 'connecting' | 'connected' | 'disconnected' | 'failed' | 'closed';
  tiebreaker: boolean;

  transmit(serviceConfig: ServiceConfig, id: string, channel: Channel): void;
  receive(serviceConfig: ServiceConfig, id: string, channel: Channel): void;

  handleSignalingMessage(msg: SignalingMessage): Promise<void>;
  connect(): Promise<void>;
  teardown(): void;
}
