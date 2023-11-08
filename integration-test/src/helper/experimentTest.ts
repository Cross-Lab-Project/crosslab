import {
  APIClient,
  DeviceServiceTypes,
  ExperimentServiceTypes,
} from '@cross-lab-project/api-client';
import assert from 'assert';
import { TypedEmitter } from 'tiny-typed-emitter';

import {
  ClientType,
  DeviceType,
  DummyDevice,
  DummyDeviceEvents,
} from '../fixtures/dummyDevice';

function createDummyDevice(type: ClientType, index: number, context: Mocha.Context) {
  switch (type) {
    case 'js':
      // eslint-disable-next-line max-len
      return new DummyDevice(
        type,
        context.debug?.jsDevice?.[index]?.debug_port,
        context.debug?.jsDeviceHost?.[index]?.debug_port,
        `test-js-device${index}.log`,
        context,
      );
    case 'python':
      return new DummyDevice(
        type,
        context.debug?.pythonDevice?.[index]?.debug_port,
        undefined,
        `test-python-device${index}.log`,
        context,
      );
  }
}

type DeviceMeta = {
  type: DeviceType;
  name: string;
  description: string;
  isPublic: boolean;
  instantiateUrl?: string;
  codeUrl?: string;
  announcedAvailability?: DeviceServiceTypes.AvailabilityRule[];
};

enum State {
  None = 0,
  Created = 1,
  Connected = 2,
  Running = 3,
  Stopped = 4,
}

type MessageEvents = {
  eventsChanged: () => void;
};

export class ExperimentTest extends TypedEmitter<MessageEvents> {
  devices: DummyDevice[] = [];
  deviceMetas: DeviceMeta[] = [];
  apiDevices: (DeviceServiceTypes.ConcreteDevice<'response'> & { url: string })[] = [];
  events: { gpio: Parameters<DummyDeviceEvents['gpio']>[0][] }[] = [];
  experimentUrl?: string;

  _state: State = State.None;

  async eventCount(eventCount: number) {
    await new Promise<void>(resolve => {
      const callback = () => {
        if (this.events.reduce((p, e) => p + e.gpio.length, 0) >= eventCount) {
          resolve();
          this.off('eventsChanged', callback);
        }
      };
      if (this.events.reduce((p, e) => p + e.gpio.length, 0) >= eventCount) {
        resolve();
      } else {
        this.on('eventsChanged', callback);
      }
    });
  }

  async createAPIDevices(client: APIClient) {
    for (const deviceMeta of this.deviceMetas) {
      const apiDevice = (await client.createDevice({
        ...deviceMeta,
      })) as DeviceServiceTypes.ConcreteDevice<'response'>;

      assert(apiDevice.url, 'Device URL is not defined');

      this.apiDevices.push({ ...apiDevice });
    }

    this._state = State.Created;
  }

  async connect(client: APIClient) {
    if (this._state < State.Created) await this.createAPIDevices(client);

    const promiseList = [];
    for (const [idx, device] of this.devices.entries()) {
      if (this.apiDevices[idx].type === 'device')
        promiseList.push(
          new Promise<void>(resolve => device.once('websocketConnected', resolve)),
        );
      this.events.push({ gpio: [] });
      device.on('gpio', event => {
        this.events[idx].gpio.push(event) && this.emit('eventsChanged');
      });
      if (this.apiDevices[idx].type === 'device')
        device.start(client, this.apiDevices[idx].url);
    }
    await Promise.all(promiseList);

    for (const device of this.apiDevices) {
      if (device.type === 'device')
        assert((await client.getDevice(device.url)).connected, 'Device is not connected');
    }

    this._state = State.Connected;
  }

  async run(client: APIClient, experiment: ExperimentServiceTypes.Experiment<'request'>) {
    if (this._state < State.Connected) await this.connect(client);

    const promiseListConnections = this.devices.map(
      device =>
        new Promise<void>(resolve =>
          device.on(
            'connectionsChanged',
            connections => connections.every(c => c.state === 'connected') && resolve(),
          ),
        ),
    );

    experiment = {
      status: 'running',
      roles: this.deviceMetas.map((m, idx) => ({
        name: 'device' + (idx + 1),
        description: m.description,
      })),
      devices: this.apiDevices.map((d, idx) => ({
        role: 'device' + (idx + 1),
        device: d.url,
      })),
      serviceConfigurations: [],
      ...(experiment as object),
    };

    const apiExperiment = await client.createExperiment(experiment);
    this.experimentUrl = apiExperiment.url;
    assert(apiExperiment.status === 'setup', 'Experiment is not in setup');

    const promiseList = [];
    for (const [idx, apiDevice] of this.apiDevices.entries()) {
      if (apiDevice.type === 'device') continue;

      const instanceData = apiExperiment.instantiatedDevices?.find(
        device => device.instanceOf === apiDevice.url,
      );

      assert(instanceData);

      const instanceUrl = instanceData.url;
      const deviceToken = instanceData.token;
      apiDevice.instanceUrl = instanceData.url;

      promiseList.push(
        new Promise<void>(resolve =>
          this.devices[idx].once('websocketConnected', resolve),
        ),
      );
      this.events.push({ gpio: [] });
      this.devices[idx].start(new APIClient(client.url, deviceToken), instanceUrl);
    }

    await Promise.all(promiseList);

    for (const device of this.devices) {
      assert((await client.getDevice(device.url)).connected, 'Device is not connected');
    }

    await Promise.all(promiseListConnections);

    this._state = State.Running;
  }

  addDevice(
    context: Mocha.Context,
    clientType: ClientType,
    deviceType: DeviceType = 'device',
    name?: string,
    description?: string,
  ) {
    this.devices.push(createDummyDevice(clientType, this.devices.length + 1, context));
    const deviceTypeName = { js: 'JS', python: 'Python' }[clientType];
    this.deviceMetas.push({
      type: deviceType,
      name: name ?? `${deviceTypeName} Device ${this.devices.length}`,
      description: description ?? `A ${deviceTypeName} test device`,
      isPublic: true,
      instantiateUrl:
        deviceType === 'cloud instantiable'
          ? 'http://localhost/edge_instantiable_device'
          : undefined,
      codeUrl:
        deviceType === 'edge instantiable'
          ? 'http://localhost/cloud_instantiable_device'
          : undefined,
      announcedAvailability: deviceType === 'device' ? [{ available: true }] : undefined,
    });
  }

  async stop(client: APIClient, timeout = 5000) {
    const closedPromises = this.devices.map(
      device =>
        new Promise<void>(resolve =>
          device.on(
            'connectionsChanged',
            connections => connections.every(c => c.state === 'closed') && resolve(),
          ),
        ),
    );
    if (this.experimentUrl) await client.deleteExperiment(this.experimentUrl);

    try {
      await new Promise((resolve, reject) => {
        if (timeout) {
          setTimeout(() => reject('Timeout'), timeout);
        }
        Promise.all(closedPromises).then(resolve).catch(reject);
      });
    } finally {
      for (const device of this.devices) {
        device.stop();
      }

      this._state = State.Stopped;
    }
  }
}
