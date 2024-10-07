import { TypedEmitter } from 'tiny-typed-emitter';

import { SignalingMessage } from '../deviceMessages';
import { Channel } from './channel';
import { PeerConnection, PeerConnectionEvents, ServiceConfig } from './connection';

export class LocalPeerConnection
  extends TypedEmitter<PeerConnectionEvents>
  implements PeerConnection
{
  private _channels: Map<string, Channel> = new Map();
  state: 'new' | 'connecting' | 'connected' | 'disconnected' | 'failed' | 'closed';
  tiebreaker: boolean = true;
  deviceA: { tiebreaker: boolean; services: ServiceConfig[] };
  deviceB: { tiebreaker: boolean; services: ServiceConfig[] };

  constructor(configuration: {
    deviceA: { tiebreaker: boolean; services: ServiceConfig[] };
    deviceB: { tiebreaker: boolean; services: ServiceConfig[] };
  }) {
    super();
    this.state = 'new';
    this.deviceA = configuration.deviceA;
    this.deviceB = configuration.deviceB;
  }

  transmit(serviceConfig: ServiceConfig, id: string, channel: Channel): void {
    if (
      this.deviceA.services.find(
        service =>
          service.serviceType === serviceConfig.serviceType &&
          service.serviceId === serviceConfig.serviceId &&
          service.remoteServiceId === serviceConfig.remoteServiceId,
      )
    ) {
      this._addChannel(serviceConfig, id, channel, this.deviceA.tiebreaker);
    } else if (
      this.deviceB.services.find(
        service =>
          service.serviceType === serviceConfig.serviceType &&
          service.serviceId === serviceConfig.serviceId &&
          service.remoteServiceId === serviceConfig.remoteServiceId,
      )
    ) {
      this._addChannel(serviceConfig, id, channel, this.deviceB.tiebreaker);
    } else {
      throw new Error(
        `Could not find corresponding service for ["${serviceConfig.serviceType}","${serviceConfig.serviceId}","${serviceConfig.remoteServiceId}"]!`,
      );
    }
  }

  receive(serviceConfig: ServiceConfig, id: string, channel: Channel): void {
    if (
      this.deviceA.services.find(
        service =>
          service.serviceType === serviceConfig.serviceType &&
          service.serviceId === serviceConfig.serviceId &&
          service.remoteServiceId === serviceConfig.remoteServiceId,
      )
    ) {
      this._addChannel(serviceConfig, id, channel, this.deviceA.tiebreaker);
    } else if (
      this.deviceB.services.find(
        service =>
          service.serviceType === serviceConfig.serviceType &&
          service.serviceId === serviceConfig.serviceId &&
          service.remoteServiceId === serviceConfig.remoteServiceId,
      )
    ) {
      this._addChannel(serviceConfig, id, channel, this.deviceB.tiebreaker);
    } else {
      throw new Error(
        `Could not find corresponding service for ["${serviceConfig.serviceType}","${serviceConfig.serviceId}","${serviceConfig.remoteServiceId}"]!`,
      );
    }
  }

  async handleSignalingMessage(_msg: SignalingMessage): Promise<void> {}

  async connect(): Promise<void> {
    for (const entry of this._channels.entries()) {
      const [label, channel] = entry;
      if (channel.channel_type === 'DataChannel') {
        channel._setReady();
      } else if (channel.channel_type === 'MediaChannel' && channel.ontrack) {
        const peerLabelArray = JSON.parse(label);
        const temp = peerLabelArray[1];
        peerLabelArray[1] = peerLabelArray[2];
        peerLabelArray[2] = temp;
        const peerChannel = this._channels.get(JSON.stringify(peerLabelArray));
        if (peerChannel?.channel_type === 'MediaChannel' && peerChannel.track) {
          channel.ontrack({ track: peerChannel.track });
        }
      }
    }
    this.state = 'connected';
    this.emit('connectionChanged');
  }

  teardown(): void {
    if (this.state !== 'closed') {
      for (const key of this._channels.keys()) {
        this._channels.delete(key);
      }
      this.state = 'closed';
      this.emit('connectionChanged');
    }
  }

  private _addChannel(
    serviceConfig: ServiceConfig,
    id: string,
    channel: Channel,
    tiebreaker: boolean,
  ) {
    const label1 = this._createLabel(serviceConfig, id, tiebreaker);
    const label2 = this._createLabel(serviceConfig, id, !tiebreaker);
    this._channels.set(label1, channel);
    if (channel.channel_type === 'DataChannel') {
      channel.send = data => {
        const peerChannel = this._channels.get(label2);
        if (peerChannel?.channel_type === 'DataChannel' && peerChannel.ondata) {
          peerChannel.ondata(data);
        }
      };
    }
  }

  private _createLabel(
    serviceConfig: ServiceConfig,
    id: string,
    tiebreaker: boolean,
  ): string {
    const id1 = tiebreaker ? serviceConfig.serviceId : serviceConfig.remoteServiceId;
    const id2 = tiebreaker ? serviceConfig.remoteServiceId : serviceConfig.serviceId;
    const label = JSON.stringify([serviceConfig.serviceType, id1, id2, id]);
    return label;
  }
}
