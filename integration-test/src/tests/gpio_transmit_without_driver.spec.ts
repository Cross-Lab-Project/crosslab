/// <reference types="../context" />
import {ExperimentServiceTypes} from '@cross-lab-project/api-client';
import {expect} from 'chai';

import {clientTypes, deviceTypes} from '../fixtures/dummyDevice';
import {ExperimentTest} from '../helper/experimentTest';

const gpioExperimentConfiguration: ExperimentServiceTypes.Experiment = {
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
                direction: 'out',
              },
              {
                interfaceId: 2,
                interfaceType: 'gpio',
                signals: {
                  gpio: 'gpio2',
                },
                busId: 'gpio2',
                direction: 'out',
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
                direction: 'in',
              },
              {
                interfaceId: 2,
                interfaceType: 'gpio',
                signals: {
                  gpio: 'gpio2',
                },
                busId: 'gpio2',
                direction: 'in',
              },
            ],
          },
        },
      ],
    },
  ],
};

for (const device1Type of deviceTypes) {
  for (const device2Type of deviceTypes) {
    for (const client1Type of clientTypes) {
      for (const client2Type of clientTypes) {
        describe(`${client1Type} Client to ${client2Type} Client GPIO tests without driver (${device1Type} <-> ${device2Type})`, async function () {
          beforeEach(function () {
            this.timeout(120000);
            this.experiment = new ExperimentTest();
            this.experiment.addDevice(this, client1Type, device1Type);
            this.experiment.addDevice(this, client2Type, device2Type);
          });
          afterEach(async function () {
            this.timeout(10000);
            await this.experiment.stop(this.client);
          });

          it('should transmit initial gpio value', async function () {
            this.timeout(this.debug ? 0 : 60000);
            this.experiment.devices[0].send('gpio', {signal: 'gpio1', value: 'strongH'});
            this.experiment.devices[0].send('gpio', {signal: 'gpio2', value: 'strongL'});
            await this.experiment.run(this.client, gpioExperimentConfiguration);

            await this.experiment.eventCount(4);

            expect(this.experiment.events[0].gpio).deep.equal([
              {signal: 'gpio1', value: 'strongH'},
              {signal: 'gpio2', value: 'strongL'},
            ]);
            expect(this.experiment.events[1].gpio).deep.equal([
              {signal: 'gpio1', value: 'strongH'},
              {signal: 'gpio2', value: 'strongL'},
            ]);
          });

          it('should transmit gpio value', async function () {
            this.timeout(this.debug ? 0 : 60000);

            await this.experiment.run(this.client, gpioExperimentConfiguration);

            this.experiment.devices[0].send('gpio', {signal: 'gpio1', value: 'strongH'});
            this.experiment.devices[0].send('gpio', {signal: 'gpio2', value: 'strongL'});

            await this.experiment.eventCount(4);

            expect(this.experiment.events[0].gpio).deep.equal([
              {signal: 'gpio1', value: 'strongH'},
              {signal: 'gpio2', value: 'strongL'},
            ]);
            expect(this.experiment.events[1].gpio).deep.equal([
              {signal: 'gpio1', value: 'strongH'},
              {signal: 'gpio2', value: 'strongL'},
            ]);
          });
        });
      }
    }
  }
}
