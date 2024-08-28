/// <reference types="../context.js" />
import { deviceTypes } from '../fixtures/dummyDevice.js';
import { ExperimentTest } from '../helper/experimentTest.js';

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

for (const device1Type of deviceTypes.slice(0,2)) {
  const device2Type = 'device';
  describe(`Client Communication (${device1Type} <-> ${device2Type})`, async function () {
    before(function () {
      this.timeout(120000);
      this.experiment = new ExperimentTest();
      this.experiment.addDevice(this, 'js', device1Type);
      this.experiment.addDevice(this, 'js', device2Type);
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
