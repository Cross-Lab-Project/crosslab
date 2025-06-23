import Queue from 'queue';

import { repositories } from '../database/dataSource.js';
import { BookingModel, CallbackUrlModel } from '../database/model.js';
import {
  BookingChangedEventCallback,
  BookingDeletedEventCallback,
} from '../generated/types.js';
import { bookingUrlFromId } from './urlFromId.js';

class CallbackManager {
  private callbackMetaMap: Map<
    string,
    {
      url: string;
      changedCallbacks: boolean;
      deletedCallbacks: boolean;
      queue: Queue;
      currentTimeout: number;
    }
  > = new Map();
  private isInitialized: boolean = false;

  async initialize() {
    const callbackUrlModels = await repositories.callbackUrl.find();
    for (const callbackUrlModel of callbackUrlModels) {
      this._addCallback(callbackUrlModel);
    }
    this.isInitialized = true;
  }

  async addCallback(callbackUrlModel: CallbackUrlModel) {
    this.assertInitialized();
    this._addCallback(callbackUrlModel);
  }

  async removeCallback(callbackUrlModel: CallbackUrlModel) {
    this.assertInitialized();
    const callbackMeta = this.callbackMetaMap.get(callbackUrlModel.url);

    if (!callbackMeta) {
      return;
    }

    callbackMeta.changedCallbacks &&= !(callbackUrlModel.type === 'changed');
    callbackMeta.deletedCallbacks &&= !(callbackUrlModel.type === 'deleted');
  }

  async sendCallback(type: 'changed' | 'deleted', bookingModel: BookingModel) {
    this.assertInitialized();
    switch (type) {
      case 'changed':
        return await this.sendChangedCallback(bookingModel);
      case 'deleted':
        return await this.sendDeletedCallback(bookingModel);
    }
  }

  // TODO: error handling
  private async sendChangedCallback(bookingModel: BookingModel) {
    const callbackMetas = Array.from(this.callbackMetaMap.values()).filter(
      callbackMeta => callbackMeta.changedCallbacks,
    );

    for (const callbackMeta of callbackMetas) {
      callbackMeta.queue.push();
      callbackMeta.queue.push(async () => {
        if (!callbackMeta.changedCallbacks) {
          return;
        }
        const response = await fetch(callbackMeta.url, {
          method: 'POST',
          body: JSON.stringify({
            callbackType: 'event',
            eventType: 'booking-changed',
            booking: await repositories.booking.format(bookingModel),
          } satisfies BookingChangedEventCallback),
        });

        if (response.status === 410) {
          callbackMeta.changedCallbacks = false;
        }
      });
    }
  }

  // TODO: error handling
  private async sendDeletedCallback(bookingModel: BookingModel) {
    const callbackMetas = Array.from(this.callbackMetaMap.values()).filter(
      callbackMeta => callbackMeta.deletedCallbacks,
    );

    for (const callbackMeta of callbackMetas) {
      callbackMeta.queue.push(async () => {
        if (!callbackMeta.deletedCallbacks) {
          callbackMeta.queue.end();
          this.callbackMetaMap.delete(callbackMeta.url);
          return;
        }

        try {
          const response = await fetch(callbackMeta.url, {
            method: 'POST',
            body: JSON.stringify({
              callbackType: 'event',
              eventType: 'booking-deleted',
              bookingUrl: bookingUrlFromId(bookingModel.uuid),
            } satisfies BookingDeletedEventCallback),
          });

          if (response.status === 200) {
            callbackMeta.currentTimeout = 5000;
            callbackMeta.queue.end();
            this.callbackMetaMap.delete(callbackMeta.url);
          }
        } catch {
          callbackMeta.queue.unshift(async () => {
            await new Promise<void>(resolve =>
              setTimeout(resolve, callbackMeta.currentTimeout),
            );
          });
        }
      });
    }
  }

  private _addCallback(callbackUrlModel: CallbackUrlModel) {
    const callbackMeta = this.callbackMetaMap.get(callbackUrlModel.url);

    if (!callbackMeta) {
      this.callbackMetaMap.set(callbackUrlModel.url, {
        url: callbackUrlModel.url,
        changedCallbacks: callbackUrlModel.type === 'changed',
        deletedCallbacks: callbackUrlModel.type === 'deleted',
        queue: new Queue({ concurrency: 1 }),
        currentTimeout: 5000,
      });
      return;
    }

    callbackMeta.changedCallbacks ||= callbackUrlModel.type === 'changed';
    callbackMeta.deletedCallbacks ||= callbackUrlModel.type === 'deleted';
  }

  private assertInitialized() {
    if (!this.isInitialized) {
      throw new Error('Callback manager is not initialized!');
    }
  }
}

export const callbackMananger = new CallbackManager();
