/// <reference types="../context.js" />
import { ExperimentServiceTypes } from '@cross-lab-project/api-client';
import { expect } from 'chai';

import { clientTypes } from '../fixtures/dummyDevice.js';
import { ExperimentTest } from '../helper/experimentTest.js';

const gpioExperimentConfiguration: Omit<
  ExperimentServiceTypes.Experiment<'request'>,
  'status'
> = {
  serviceConfigurations: [
    {
      serviceType: 'http://api.goldi-labs.de/serviceTypes/file',
      configuration: {},
      participants: [
        {
          role: 'device1',
          serviceId: 'file_producer',
          config: {},
        },
        {
          role: 'device2',
          serviceId: 'file_consumer',
          config: {},
        },
      ],
    },
  ],
};

for (const client1Type of clientTypes) {
  for (const client2Type of clientTypes) {
    describe(`${client1Type} Client to ${client2Type} Client File tests `, async function () {
      beforeEach(function () {
        this.timeout(120000);
        this.experiment = new ExperimentTest();
        this.experiment.addDevice(this, client1Type);
        this.experiment.addDevice(this, client2Type);
      });
      afterEach(async function () {
        this.timeout(10000);
        await this.experiment.stop(this.client);
      });

      it('should transmit file', async function () {
        this.timeout(this.debug ? 0 : 60000);

        await this.experiment.run(this.client, gpioExperimentConfiguration);

        this.experiment.devices[0].send('file');
        await this.experiment.eventCount(1);

        expect(this.experiment.events[0].file).deep.equal([]);
        expect(this.experiment.events[1].file).deep.equal([{}]);
      });
    });
  }
}
