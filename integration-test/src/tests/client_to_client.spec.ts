/// <reference types="../context" />
import {clientTypes} from '../fixtures/dummyDevice';
import {ExperimentTest} from '../helper/experimentTest';

const experimentConfig = {
  serviceConfigurations: [
    {
      serviceType: 'http://api.goldi-labs.de/serviceTypes/electrical',
      configuration: {},
      participants: [
        {
          role: 'device1',
          serviceId: 'electrical',
          config: {
            interfaces: [],
          },
        },
        {
          role: 'device2',
          serviceId: 'electrical',
          config: {
            interfaces: [],
          },
        },
      ],
    },
  ],
};

for (const client1Type of clientTypes) {
  for (const client2Type of clientTypes) {
    describe(`${client1Type} Client to ${client2Type} Client Communication`, async function () {
      before(function () {
        this.timeout(120000);
        this.experiment = new ExperimentTest();
        this.experiment.addDevice(this, client1Type);
        this.experiment.addDevice(this, client2Type,);
      });
      after(async function () {
        this.timeout(10000);
        await this.experiment.stop(this.client);
      });

      step('should connect without errors', async function () {
        this.timeout(this.debug ? 0 : 60000);
        // Create devices in API:
        await this.experiment.connect(this.client);
      });

      step('should start an experiment', async function () {
        this.timeout(this.debug ? 0 : 60000);
        await this.experiment.run(this.client, experimentConfig);
      });
    });
  }
}