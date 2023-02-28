import {ExperimentServiceSignatures} from '@cross-lab-project/api-client';

export function generateTestData(
  urlDevice1: string,
  urlDevice2: string,
  urlDevice3: string,
): ExperimentServiceSignatures.CreateExperimentBody {
  return {
    status: 'running',
    roles: [
      {
        name: '3-Axis-Portal V1',
        template_device: 'https://api.goldi-labs.de/devices/40f25599-b62c-4580-82dc-3889c641bf77',
        'x-esc-position': {
          x: 800,
          y: 300,
        },
      },
      {
        name: 'IO-Board',
        template_device: 'https://api.goldi-labs.de/devices/c1359733-ccbd-46e2-9e99-6d9b1e12fe7b',
        'x-esc-position': {
          x: 800,
          y: 600,
        },
      },
      {
        name: 'ECP',
      },
    ],
    devices: [
      {
        device: urlDevice1,
        role: '3-Axis-Portal V1',
      },
      {
        device: urlDevice2,
        role: 'IO-Board',
      },
      {
        device: urlDevice3,
        role: 'ECP',
      },
    ],
    serviceConfigurations: [
      {
        serviceType: 'http://api.goldi-labs.de/serviceTypes/electrical',
        configuration: {},
        participants: [
          {
            serviceId: 'sensors',
            role: '3-Axis-Portal V1',
            config: {
              interfaces: [],
            },
          },
          {
            serviceId: 'actuators',
            role: '3-Axis-Portal V1',
            config: {
              interfaces: [],
            },
          },
          {
            serviceId: 'pins',
            role: 'IO-Board',
            config: {
              interfaces: [],
            },
          },
          {
            serviceId: 'display',
            role: 'ECP',
            config: {
              interfaces: [],
            },
          },
        ],
        id: 'd1b922d7-40d8-4718-a90c-dca2ad9fc3b6',
      },
    ],
  };
}
