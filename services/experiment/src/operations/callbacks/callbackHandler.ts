import { InvalidValueError, MalformedBodyError } from '@crosslab/service-common';
import { Mutex } from 'async-mutex';

import {
  DeviceChangedEventCallback,
  PeerconnectionClosedEventCallback,
  PeerconnectionStatusChangedEventCallback,
  isDeviceChangedEventCallback,
  isPeerconnectionClosedEventCallback,
  isPeerconnectionStatusChangedEventCallback,
} from '../../clients/device/types.js';
import { clients } from '../../clients/index.js';
import { repositories } from '../../database/dataSource.js';
import { EventCallback } from '../../generated/types.js';
import { finishExperiment } from '../../methods/experimentStatus/finish.js';
import { mutexManager } from '../../methods/mutexManager.js';
import { sendStatusUpdateMessages } from '../../methods/statusUpdateMessage.js';
import { isBookingChangedCallback } from '../../types/typeguards.js';
import { BookingChangedCallback } from '../../types/types.js';

class CallbackHandler {
  private callbackListeners: {
    device: Map<string, string[]>;
    peerconnection: Map<string, string[]>;
    booking: Map<string, string[]>;
  } = {
    device: new Map(),
    peerconnection: new Map(),
    booking: new Map(),
  };
  private mutexes: {
    device: Mutex;
    peerconnection: Mutex;
    booking: Mutex;
  } = {
    device: new Mutex(),
    peerconnection: new Mutex(),
    booking: new Mutex(),
  };

  public async handleEventCallback(callback: EventCallback): Promise<200 | 410> {
    const release =
      callback.eventType === 'device-changed'
        ? await this.mutexes.device.acquire()
        : callback.eventType === 'booking-changed'
        ? await this.mutexes.booking.acquire()
        : await this.mutexes.peerconnection.acquire();

    try {
      switch (callback.eventType) {
        case 'device-changed':
          if (!isDeviceChangedEventCallback(callback))
            throw new MalformedBodyError(
              'Body of request is not a valid device-changed event callback',
              400,
            );
          return await this.handleDeviceChangedCallback(callback);
        case 'peerconnection-closed':
          if (!isPeerconnectionClosedEventCallback(callback))
            throw new MalformedBodyError(
              'Body of request is not a valid peerconnection-closed event callback',
              400,
            );
          return await this.handlePeerconnectionClosedCallback(callback);
        case 'peerconnection-status-changed':
          if (!isPeerconnectionStatusChangedEventCallback(callback))
            throw new MalformedBodyError(
              'Body of request is not a valid peerconnection-status-changed event callback',
              400,
            );
          return await this.handlePeerconnectionStatusChangedCallback(callback);
        case 'booking-changed':
          if (!isBookingChangedCallback(callback)) {
            throw new MalformedBodyError(
              'Body of request is not a valid booking-changed event callback',
              400,
            );
          }
          return await this.handleBookingChangedCallback(callback);
        default:
          throw new InvalidValueError(
            `Event-callbacks of type "${callback.eventType}" are not supported`,
            400,
          );
      }
    } finally {
      release();
    }
  }

  public addListener(
    type: 'device' | 'peerconnection' | 'booking',
    url: string,
    experimentUuid: string,
  ) {
    const listeners = this.callbackListeners[type].get(url) ?? [];
    if (!listeners.includes(experimentUuid)) listeners.push(experimentUuid);
    this.callbackListeners[type].set(url, listeners);
  }

  public removeListener(
    type: 'device' | 'peerconnection' | 'booking',
    url: string,
    experimentUuid: string,
  ) {
    const listeners = this.callbackListeners[type].get(url) ?? [];
    const newListeners = listeners.filter(listener => listener !== experimentUuid);
    if (newListeners.length > 0) this.callbackListeners[type].set(url, newListeners);
    else this.callbackListeners[type].delete(url);
  }

  private async handleDeviceChangedCallback(
    callback: DeviceChangedEventCallback,
  ): Promise<200 | 410> {
    const listeners = this.callbackListeners.device.get(callback.device.url) ?? [];

    for (const listener of listeners) {
      const release = await mutexManager.acquire(listener);
      try {
        const experimentModel = await repositories.experiment.findOne({
          where: { uuid: listener },
        });

        if (
          !experimentModel ||
          !experimentModel.devices.find(
            device =>
              device.url === callback.device.url ||
              device.instance?.url === callback.device.url ||
              device.resolvedDevice === callback.device.url,
          )
        ) {
          this.removeListener('device', callback.device.url, listener);
          continue;
        }

        if (
          (experimentModel.status === 'peerconnections-created' ||
            experimentModel.status === 'running') &&
          callback.device.type === 'device' &&
          !callback.device.connected
        ) {
          await finishExperiment(experimentModel, clients);
        }
      } finally {
        release();
      }
    }

    const newListeners = this.callbackListeners.device.get(callback.device.url) ?? [];
    if (newListeners.length > 0) {
      return 200;
    } else {
      this.callbackListeners.device.delete(callback.device.url);
      return 410;
    }
  }

  private async handlePeerconnectionClosedCallback(
    callback: PeerconnectionClosedEventCallback,
  ): Promise<200 | 410> {
    const listeners =
      this.callbackListeners.peerconnection.get(callback.peerconnection.url) ?? [];

    for (const listener of listeners) {
      const release = await mutexManager.acquire(listener);
      try {
        const experimentModel = await repositories.experiment.findOne({
          where: { uuid: listener },
        });

        if (
          !experimentModel ||
          !experimentModel.connections.find(
            peerconnection => peerconnection.url === callback.peerconnection.url,
          )
        ) {
          this.removeListener('peerconnection', callback.peerconnection.url, listener);
          continue;
        }

        if (experimentModel.status !== 'finished')
          await finishExperiment(experimentModel, clients);
      } finally {
        release();
      }
    }

    const newListeners =
      this.callbackListeners.peerconnection.get(callback.peerconnection.url) ?? [];
    if (newListeners.length > 0) {
      return 200;
    } else {
      this.callbackListeners.peerconnection.delete(callback.peerconnection.url);
      return 410;
    }
  }

  private async handlePeerconnectionStatusChangedCallback(
    callback: PeerconnectionStatusChangedEventCallback,
  ): Promise<200 | 410> {
    const listeners =
      this.callbackListeners.peerconnection.get(callback.peerconnection.url) ?? [];

    for (const listener of listeners) {
      const release = await mutexManager.acquire(listener);
      try {
        const experimentModel = await repositories.experiment.findOne({
          where: { uuid: listener },
        });

        if (
          !experimentModel ||
          !experimentModel.connections.find(
            peerconnection => peerconnection.url === callback.peerconnection.url,
          )
        ) {
          this.removeListener('peerconnection', callback.peerconnection.url, listener);
          continue;
        }

        if (
          (callback.peerconnection.status === 'failed' ||
            callback.peerconnection.status === 'closed') &&
          experimentModel.status !== 'finished'
        ) {
          sendStatusUpdateMessages(
            experimentModel,
            // prettier-ignore
            `Finishing experiment because peerconnection "${
              callback.peerconnection.url
            }" between the devices "${
              callback.peerconnection.devices[0].url
            }" and "${
              callback.peerconnection.devices[1].url
            }" has status "${
              callback.peerconnection.status
            }"!`,
          );
          await finishExperiment(experimentModel, clients);
        }

        if (callback.peerconnection.status === 'connected') {
          let connected = true;
          for (const peerconnection of experimentModel.connections) {
            if (
              (await clients.device.getPeerconnection(peerconnection.url)).status !==
              'connected'
            ) {
              connected = false;
            }
          }

          if (experimentModel.status === 'peerconnections-created' && connected) {
            experimentModel.status = 'running';
            await repositories.experiment.save(experimentModel);
            sendStatusUpdateMessages(experimentModel);
          }
        }
      } finally {
        release();
      }
    }

    const newListeners =
      this.callbackListeners.peerconnection.get(callback.peerconnection.url) ?? [];
    if (newListeners.length > 0) {
      return 200;
    } else {
      this.callbackListeners.peerconnection.delete(callback.peerconnection.url);
      return 410;
    }
  }

  private async handleBookingChangedCallback(
    callback: BookingChangedCallback,
  ): Promise<200 | 410> {
    const listeners = this.callbackListeners.booking.get(callback.url) ?? [];

    for (const listener of listeners) {
      const release = await mutexManager.acquire(listener);

      try {
        const experimentModel = await repositories.experiment.findOneOrFail({
          where: { uuid: listener },
        });

        if (experimentModel.bookingID !== callback.url) {
          this.removeListener('booking', callback.url, listener);
          continue;
        }

        const booking = await clients.booking.frontend.getBooking(callback.url);

        if (booking.Booking.Status === 'cancelled')
          await finishExperiment(experimentModel, clients);
      } finally {
        release();
      }
    }

    const newListeners = this.callbackListeners.booking.get(callback.url) ?? [];
    if (newListeners.length > 0) {
      return 200;
    } else {
      this.callbackListeners.booking.delete(callback.url);
      return 410;
    }
  }
}

export const callbackHandler = new CallbackHandler();
