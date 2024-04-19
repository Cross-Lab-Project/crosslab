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
  deviceMetas: DeviceServiceTypes.Device<'request'>[] = [];
  apiDevices: (DeviceServiceTypes.Device<'response'> & { url: string })[] = [];
  events: {
    gpio: Parameters<DummyDeviceEvents['gpio']>[0][];
    file: Parameters<DummyDeviceEvents['file']>[0][];
  }[] = [];
  experimentUrl?: string;

  _state: State = State.None;

  async eventCount(eventCount: number) {
    await new Promise<void>(resolve => {
      const callback = () => {
        if (
          this.events.reduce((p, e) => p + e.gpio.length + e.file.length, 0) >= eventCount
        ) {
          resolve();
          this.off('eventsChanged', callback);
        }
      };
      if (
        this.events.reduce((p, e) => p + e.gpio.length + e.file.length, 0) >= eventCount
      ) {
        resolve();
      } else {
        this.on('eventsChanged', callback);
      }
    });
  }

  async createAPIDevices(client: APIClient) {
    for (const deviceMeta of this.deviceMetas) {
      if (deviceMeta.type === 'group') {
        const device = await client.createDevice({
          type: 'device',
          name: 'Internal Test Device',
          isPublic: true,
        });
        deviceMeta.devices.push(device);
      }
      const apiDevice = await client.createDevice({
        ...deviceMeta,
      });

      assert(apiDevice.url, 'Device URL is not defined');

      this.apiDevices.push({ ...apiDevice });
    }

    this._state = State.Created;
  }

  async connect(client: APIClient) {
    if (this._state < State.Created) await this.createAPIDevices(client);

    const promiseList = [];
    for (const [idx, device] of this.devices.entries()) {
      if (this.apiDevices[idx].type === 'device' || this.apiDevices[idx].type === 'group')
        promiseList.push(
          new Promise<void>(resolve => device.once('websocketConnected', resolve)),
        );
      this.events.push({ gpio: [], file: [] });
      device.on('gpio', event => {
        this.events[idx].gpio.push(event) && this.emit('eventsChanged');
      });
      device.on('file', event => {
        this.events[idx].file.push(event) && this.emit('eventsChanged');
      });
      const apiDevice = this.apiDevices[idx];
      if (apiDevice.type === 'device') device.start(client, apiDevice.url);
      if (apiDevice.type === 'group') device.start(client, apiDevice.devices[0].url);
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

    const promiseListConfiguration = this.devices.map(
      device =>
        new Promise<{ [k: string]: unknown }>(resolve =>
          device.on('configuration', configuration => resolve(configuration)),
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
      if (apiDevice.type === 'device' || apiDevice.type === 'group') continue;

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
      this.events.push({ gpio: [], file: [] });
      this.devices[idx].start(new APIClient(client.url, deviceToken), instanceUrl);
    }

    await Promise.all(promiseList);

    for (const device of this.devices) {
      assert((await client.getDevice(device.url)).connected, 'Device is not connected');
    }

    await Promise.all(promiseListConnections);
    const configurations = await Promise.all(promiseListConfiguration);

    for (const configuration of configurations) {
      assert.strictEqual(configuration.experimentUrl, this.experimentUrl);
    }

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
      instantiateUrl: 'http://localhost/edge_instantiable_device',
      codeUrl: 'http://localhost/cloud_instantiable_device',
      announcedAvailability: [{ available: true }],
      devices: [],
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

    let running = false;

    for (let i = 0; i < 20; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      if (this.experimentUrl) {
        const experiment = await client.getExperiment(this.experimentUrl);
        running = experiment.status === 'running';
        if (running) {
          await client.deleteExperiment(this.experimentUrl);
          break;
        }
      }
    }

    assert(running, 'experiment was not set to running!');

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
