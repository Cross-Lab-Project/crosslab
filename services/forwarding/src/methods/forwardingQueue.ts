import { logger } from '@crosslab/service-common';
import Queue from 'queue';
import WebSocket from 'ws';

import { webSocketMap } from '../globals.js';
import { roomUrlFromId } from './urlFromId.js';

export class ForwardingQueue {
  private _queue: Queue = new Queue();
  private _status: 'created' | 'started' | 'stopped' | 'waiting' | 'ended' = 'created';
  private _roomId: string;
  private _participantId: string;

  constructor(roomId: string, participantId: string) {
    this._roomId = roomId;
    this._participantId = participantId;
  }

  public get status() {
    return this._status;
  }

  public push(message: WebSocket.RawData) {
    this._queue.push(async () => await this._handleMessage(message));
    if (this._status === 'waiting') this.start();
  }

  private _unshift(message: WebSocket.RawData) {
    this._queue.unshift(async () => await this._handleMessage(message));
  }

  private async _handleMessage(message: WebSocket.RawData) {
    const webSocket = webSocketMap.get(`${this._roomId}:${this._participantId}`);
    await new Promise<void>((resolve, reject) => {
      if (!webSocket) {
        this.stop();
        this._unshift(message);
        resolve();
        return;
      }
      webSocket.send(message, error => {
        if (error) reject(error);
        resolve();
      });
    });
  }

  public start() {
    logger.log(
      'info',
      `Starting forwarding-queue for participant "${this._participantId}" in room "${roomUrlFromId(this._roomId)}"`,
    );

    if (this._status === 'ended') return;

    if (this._queue.length === 0) {
      this._status = 'waiting';
      return;
    }

    this._queue.start(error => {
      if (error) {
        logger.log(
          'error',
          `An error occurred while forwarding a message in room "${roomUrlFromId(
            this._roomId,
          )}" to participant "${this._participantId}"`,
          { error },
        );
      }
      logger.log(
        'info',
        `Waiting for new messages in forwarding-queue for participant "${
          this._participantId
        }" in room "${roomUrlFromId(this._roomId)}"`,
      );
      this._status = 'waiting';
    });

    this._status = 'started';
  }

  public stop() {
    logger.log(
      'info',
      `Stopping forwarding-queue for participant "${this._participantId}" in room "${roomUrlFromId(this._roomId)}"`,
    );
    this._queue.stop();
    this._status = 'stopped';
  }

  public end() {
    logger.log(
      'info',
      `Ending forwarding-queue for participant "${this._participantId}" in room "${roomUrlFromId(this._roomId)}"`,
    );
    this._queue.end();
    this._status = 'ended';
  }
}
