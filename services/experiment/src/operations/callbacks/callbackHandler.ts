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

class CallbackHandler {
  private deviceListeners: Map<string, string[]> = new Map();
  private peerconnectionListeners: Map<string, string[]> = new Map();
  private deviceMutex: Mutex = new Mutex();
  private peerconnectionMutex: Mutex = new Mutex();

  public async handleCallback(callback: EventCallback): Promise<200 | 410> {
    const release =
      callback.eventType === 'device-changed'
        ? await this.deviceMutex.acquire()
        : await this.peerconnectionMutex.acquire();

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
    type: 'device' | 'peerconnection',
    url: string,
    experimentUuid: string,
  ) {
    switch (type) {
      case 'device': {
        const listeners = this.deviceListeners.get(url) ?? [];
        if (!listeners.includes(experimentUuid)) listeners.push(experimentUuid);
        this.deviceListeners.set(url, listeners);
        break;
      }
      case 'peerconnection': {
        const listeners = this.peerconnectionListeners.get(url) ?? [];
        if (!listeners.includes(experimentUuid)) listeners.push(experimentUuid);
        this.peerconnectionListeners.set(url, listeners);
        break;
      }
    }
  }

  public removeListener(
    type: 'device' | 'peerconnection',
    url: string,
    experimentUuid: string,
  ) {
    switch (type) {
      case 'device': {
        const listeners = this.deviceListeners.get(url) ?? [];
        const newListeners = listeners.filter(listener => listener !== experimentUuid);
        this.deviceListeners.set(url, newListeners);
        break;
      }
      case 'peerconnection': {
        const listeners = this.peerconnectionListeners.get(url) ?? [];
        const newListeners = listeners.filter(listener => listener !== experimentUuid);
        this.deviceListeners.set(url, newListeners);
        break;
      }
    }
  }

  private async handleDeviceChangedCallback(
    callback: DeviceChangedEventCallback,
  ): Promise<200 | 410> {
    const listeners = this.deviceListeners.get(callback.device.url) ?? [];

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

    const newListeners = this.deviceListeners.get(callback.device.url) ?? [];
    if (newListeners.length > 0) {
      return 200;
    } else {
      this.deviceListeners.delete(callback.device.url);
      return 410;
    }
  }

  private async handlePeerconnectionClosedCallback(
    callback: PeerconnectionClosedEventCallback,
  ): Promise<200 | 410> {
    const listeners = this.peerconnectionListeners.get(callback.peerconnection.url) ?? [];

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
      this.peerconnectionListeners.get(callback.peerconnection.url) ?? [];
    if (newListeners.length > 0) {
      return 200;
    } else {
      this.peerconnectionListeners.delete(callback.peerconnection.url);
      return 410;
    }
  }

  private async handlePeerconnectionStatusChangedCallback(
    callback: PeerconnectionStatusChangedEventCallback,
  ): Promise<200 | 410> {
    const listeners = this.peerconnectionListeners.get(callback.peerconnection.url) ?? [];

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
        )
          await finishExperiment(experimentModel, clients);

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
          }
        }
      } finally {
        release();
      }
    }

    const newListeners =
      this.peerconnectionListeners.get(callback.peerconnection.url) ?? [];
    if (newListeners.length > 0) {
      return 200;
    } else {
      this.peerconnectionListeners.delete(callback.peerconnection.url);
      return 410;
    }
  }
}

export const callbackHandler = new CallbackHandler();
