/// <reference types="../context" /> 
import assert from 'assert';

import {DummyDevice} from '../fixtures/dummyDevice';

const clientTypes: ('js' | 'python')[] = ['js', 'python'];

function createDummyDevice(type: 'js' | 'python', index: number, debug: Mocha.Context['debug']) {
  switch (type) {
    case 'js':
      return new DummyDevice(type, debug?.jsDevice?.[index]?.debug_port, debug?.jsDeviceHost?.[index]?.debug_port);
    case 'python':
      return new DummyDevice(type, debug?.pythonDevice?.[index]?.debug_port);
  }
}

for (const client1Type of clientTypes) {
  for (const client2Type of clientTypes) {
    describe(`${client1Type} Client to ${client2Type} Client Communication`, async function () {
      let dummyDevice1: DummyDevice;
      let dummyDevice2: DummyDevice;

      before(function () {
        dummyDevice1 = createDummyDevice(client1Type, 1, this.debug);
        dummyDevice2 = createDummyDevice(client2Type, 2, this.debug);
      });
      after(() => {
        dummyDevice1.stop();
        dummyDevice2.stop();
      });

      step('should connect without errors', async function () {
        this.timeout(this.debug ? 0 : 5000);
        // Create devices in API:
        const device1 = await this.client.createDevice({
          type: 'device',
          name: 'JS Device 1',
          description: 'A JS test device',
          announcedAvailability: [
            {
              available: true,
            },
          ],
        });
        const device2 = await this.client.createDevice({
          type: 'device',
          name: 'JS Device 2',
          description: 'A JS test device',
          announcedAvailability: [
            {
              available: true,
            },
          ],
        });

        assert(device1.url, 'Device 1 URL is not defined');
        assert(device2.url, 'Device 2 URL is not defined');

        const connectedPromise1 = new Promise<void>(resolve => dummyDevice1.on('websocketConnected', resolve));
        const connectedPromise2 = new Promise<void>(resolve => dummyDevice2.on('websocketConnected', resolve));

        dummyDevice1.start(this.client, device1.url);
        dummyDevice2.start(this.client, device2.url);

        await connectedPromise1;
        await connectedPromise2;

        assert((await this.client.getDevice(device1.url)).connected, 'Device 1 is not connected');
        assert((await this.client.getDevice(device2.url)).connected, 'Device 2 is not connected');
      });

      step('should start an experiment', async function () {
        this.timeout(this.debug ? 0 : 1500);
        const connectedPromise1 = new Promise<void>(resolve =>
          dummyDevice1.on('connectionsChanged', connections => {
            connections.some(c => c.state === 'connected') && resolve();
          }),
        );
        const connectedPromise2 = new Promise<void>(resolve =>
          dummyDevice2.on('connectionsChanged', connections => {
            connections.some(c => c.state === 'connected') && resolve();
          }),
        );

        await this.client.createExperiment({
          status: 'running',
          roles: [
            {name: 'device1', description: 'Device1'},
            {name: 'device2', description: 'Device2'},
          ],
          devices: [
            {role: 'device1', device: dummyDevice1.url},
            {role: 'device2', device: dummyDevice2.url},
          ],
          serviceConfigurations: [
            {
              serviceType: 'http://api.goldi-labs.de/serviceTypes/electrical',
              configuration: {},
              participants: [
                {
                  role: 'device1',
                  serviceId: 'electrical',
                  config: {
                    interfaces: [
                      {
                        interfaceId: 1,
                        interfaceType: 'gpio',
                        signals: {
                          gpio: 'gpio1',
                        },
                        busId: 'gpio1',
                      },
                      {
                        interfaceId: 2,
                        interfaceType: 'gpio',
                        signals: {
                          gpio: 'gpio2',
                        },
                        busId: 'gpio2',
                      },
                    ],
                  },
                },
                {
                  role: 'device2',
                  serviceId: 'electrical',
                  config: {
                    interfaces: [
                      {
                        interfaceId: 1,
                        interfaceType: 'gpio',
                        signals: {
                          gpio: 'gpio1',
                        },
                        busId: 'gpio1',
                      },
                      {
                        interfaceId: 2,
                        interfaceType: 'gpio',
                        signals: {
                          gpio: 'gpio2',
                        },
                        busId: 'gpio2',
                      },
                    ],
                  },
                },
              ],
            },
          ],
        });

        await connectedPromise1;
        await connectedPromise2;
      });

      step('should be able to transmit gpio state changes', async function () {
        this.timeout(this.debug ? 0 : 1000);
        dummyDevice1.send('gpio', {signal: 'gpio1', value: 'strongH'});
        dummyDevice1.send('gpio', {signal: 'gpio2', value: 'strongL'});

        const gpio1Promise = new Promise<void>(resolve =>
          dummyDevice2.on('gpio', event => {
            if (event.signal === 'gpio1') {
              //assert.equal(event.value, "strongH");
              resolve();
            }
          }),
        );
        const gpio2Promise = new Promise<void>(resolve =>
          dummyDevice2.on('gpio', event => {
            if (event.signal === 'gpio2') {
              //assert.equal(event.value, "strongL");
              resolve();
            }
          }),
        );

        await gpio1Promise;
        await gpio2Promise;
      });
    });
  }
}
