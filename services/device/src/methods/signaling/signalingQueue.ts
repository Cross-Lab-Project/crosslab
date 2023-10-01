import { logger } from '@crosslab/service-common';
import Queue from 'queue';

import {
  ClosePeerconnectionMessage,
  CreatePeerconnectionMessage,
  SignalingMessage,
} from '../../generated/types.js';
import { sendSignalingMessage } from '../signaling.js';

export class SignalingQueue {
  public readonly deviceUrl: string;
  public readonly peerconnectionUrl: string;
  private queue: Queue;
  private _state: 'new' | 'started' | 'stopped' | 'closed' = 'new';
  private readonly closedPromise: Promise<void>;
  private readonly onClose: () => void;

  constructor(peerconnectionUrl: string, deviceUrl: string) {
    this.deviceUrl = deviceUrl;
    this.peerconnectionUrl = peerconnectionUrl;
    this.queue = new Queue({
      concurrency: 1,
    });
    let closedPromiseResolve: (value: void | PromiseLike<void>) => void;
    this.closedPromise = new Promise<void>(resolve => {
      closedPromiseResolve = resolve;
    });
    this.onClose = () => {
      this.queue.end();
      closedPromiseResolve();
    };
  }

  public get state() {
    return this._state;
  }

  public add(
    signalingMessage:
      | CreatePeerconnectionMessage
      | ClosePeerconnectionMessage
      | SignalingMessage,
  ) {
    this.queue.push(async () => {
      await this.sendSignalingMessage(signalingMessage);

      if (signalingMessage.messageType === 'command') {
        switch (signalingMessage.command) {
          case 'closePeerconnection':
            this._state = 'closed';
            this.onClose();
            break;
        }
      }
    });

    if (this.state === 'started') this.start();
  }

  private async sendSignalingMessage(
    signalingMessage:
      | CreatePeerconnectionMessage
      | ClosePeerconnectionMessage
      | SignalingMessage,
  ) {
    try {
      await sendSignalingMessage(
        this.deviceUrl,
        signalingMessage,
        this.peerconnectionUrl,
      );
    } catch (error) {
      logger.log('error', 'An error occurred while trying to send a signaling message', {
        data: {
          error,
          errorMessage: error instanceof Error ? error.message : undefined,
          message: signalingMessage,
          targetDevice: this.deviceUrl,
          peerconnection: this.peerconnectionUrl,
        },
      });
    }
  }

  public start() {
    this.queue.start(error => {
      if (error)
        logger.log('error', 'An error occurred while processing a signaling message', {
          data: {
            error,
            targetDevice: this.deviceUrl,
            peerconnection: this.peerconnectionUrl,
          },
        });
    });
    if (this._state != 'closed') this._state = 'started';
  }

  public stop() {
    this.queue.stop();
    if (this._state != 'closed') this._state = 'stopped';
  }

  public async close() {
    if (this.state !== 'new' && this.state !== 'closed')
      this.add({
        messageType: 'command',
        command: 'closePeerconnection',
        connectionUrl: this.peerconnectionUrl,
      });
    else if (this.state === 'new') this.onClose();

    return this.closedPromise;
  }
}
