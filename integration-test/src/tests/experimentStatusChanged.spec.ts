/// <reference types="../context.js" />
import { DummyDevice } from '../fixtures/dummyDevice.js';
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

describe(`Experiment Status Changed Messages`, async function () {
  before(function () {
    this.timeout(120000);
    this.experiment = new ExperimentTest();
    this.experiment.addDevice(this, 'python');
    this.experiment.addDevice(this, 'js');
  });

  step('should connect without errors', async function () {
    this.timeout(this.debug ? 0 : 60000);
    // Create devices in API:
    await this.experiment.connect(this.client);
  });

  step('should start an experiment', async function () {
    this.timeout(this.debug ? 0 : 60000);
    const promises = this.experiment.devices.map((device: DummyDevice) => {
      return new Promise<void>((resolve, reject) => {
        const experimentSteps = {
          bookingUpdated: false,
          peerconnectionsCreated: false,
          running: false,
        };
        device.on('experimentStatusChanged', status => {
          if (
            status.status === 'setup' &&
            status.message === 'The booking has been updated successfully.'
          ) {
            experimentSteps.bookingUpdated = true;
          }
          if (
            status.status === 'setup' &&
            status.message === 'The peerconnections for the experiment have been created.'
          ) {
            if (!experimentSteps.bookingUpdated) reject();
            experimentSteps.peerconnectionsCreated = true;
          }
          if (status.status === 'running') {
            if (!experimentSteps.peerconnectionsCreated) reject();
            experimentSteps.running = true;
            resolve();
          }
        });
      });
    });
    await this.experiment.run(this.client, experimentConfig);
    await Promise.all(promises);
  });

  step('should stop an experiment', async function () {
    this.timeout(this.debug ? 0 : 60000);
    const promises = this.experiment.devices.map((device: DummyDevice) => {
      return new Promise<void>((resolve, reject) => {
        device.on('experimentStatusChanged', status => {
          if (
            status.status === 'finished' &&
            status.message === 'The experiment has been finished successfully.'
          ) {
            resolve();
          } else {
            reject();
          }
        });
      });
    });
    await this.experiment.stop(this.client);
    await Promise.all(promises);
  });
});
