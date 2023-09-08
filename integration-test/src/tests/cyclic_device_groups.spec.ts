import { DeviceServiceTypes } from '@cross-lab-project/api-client';
import { assert } from 'chai';

function validateDevices(
  deviceGroup: DeviceServiceTypes.DeviceGroup,
  expectedUrls: string[],
): boolean {
  if (deviceGroup.devices.length !== expectedUrls.length) return false;

  for (const expectedUrl of expectedUrls) {
    const foundDevice = deviceGroup.devices.find(device => device.url === expectedUrl);
    if (!foundDevice) return false;
  }

  return true;
}

// Warum nicht im Device Service Test?
describe('Cyclic Device Groups', function () {
  let deviceGroup1: DeviceServiceTypes.Device;
  let deviceGroup2: DeviceServiceTypes.Device;
  let deviceGroup3: DeviceServiceTypes.Device;
  const devices: DeviceServiceTypes.Device[] = [];

  this.beforeAll(async function () {
    this.timeout(20000);

    for (let i = 0; i < 10; i++) {
      const device = await this.client.createDevice({
        type: 'device',
        name: `Test Device ${i + 1}`,
        isPublic: true,
      });
      devices.push(device);
    }

    deviceGroup1 = await this.client.createDevice({
      type: 'group',
      name: 'Test Device Group 1',
      devices: [devices[0], devices[1], devices[2]],
      isPublic: true,
    });

    deviceGroup2 = await this.client.createDevice({
      type: 'group',
      name: 'Test Device Group 2',
      devices: [devices[3], devices[4], devices[5], devices[6]],
      isPublic: true,
    });

    deviceGroup3 = await this.client.createDevice({
      type: 'group',
      name: 'Test Device Group 3',
      devices: [devices[7], devices[8], devices[9]],
      isPublic: true,
    });

    assert(deviceGroup1.type === 'group');
    assert(deviceGroup2.type === 'group');
    assert(deviceGroup3.type === 'group');

    deviceGroup1.devices.push({ url: deviceGroup2.url });
    deviceGroup2.devices.push({ url: deviceGroup1.url });
    deviceGroup2.devices.push({ url: deviceGroup3.url });
    deviceGroup3.devices.push({ url: deviceGroup1.url });

    deviceGroup1 = await this.client.updateDevice(deviceGroup1.url, deviceGroup1);
    deviceGroup2 = await this.client.updateDevice(deviceGroup2.url, deviceGroup2);
    deviceGroup3 = await this.client.updateDevice(deviceGroup3.url, deviceGroup3);
  });

  it('should resolve cyclic device groups correctly (flat_group: false)', async function () {
    this.timeout(5000);

    const device1 = await this.client.getDevice(deviceGroup1.url);
    assert(device1.type === 'group');
    assert(
      validateDevices(device1, [
        devices[0].url,
        devices[1].url,
        devices[2].url,
        deviceGroup2.url,
      ]),
    );

    const device2 = await this.client.getDevice(deviceGroup2.url);
    assert(device2.type === 'group');
    assert(
      validateDevices(device2, [
        devices[3].url,
        devices[4].url,
        devices[5].url,
        devices[6].url,
        deviceGroup1.url,
        deviceGroup3.url,
      ]),
    );

    const device3 = await this.client.getDevice(deviceGroup3.url);
    assert(device3.type === 'group');
    assert(
      validateDevices(device3, [
        devices[7].url,
        devices[8].url,
        devices[9].url,
        deviceGroup1.url,
      ]),
    );
  });

  it('should resolve cyclic device groups correctly (flat_group: true)', async function () {
    this.timeout(15000);

    const device1 = await this.client.getDevice(deviceGroup1.url, {
      flat_group: true,
    });
    assert(device1.type === 'group');
    assert(
      validateDevices(
        device1,
        devices.map(device => device.url),
      ),
    );

    const device2 = await this.client.getDevice(deviceGroup2.url, {
      flat_group: true,
    });
    assert(device2.type === 'group');
    assert(
      validateDevices(
        device2,
        devices.map(device => device.url),
      ),
    );

    const device3 = await this.client.getDevice(deviceGroup3.url, {
      flat_group: true,
    });
    assert(device3.type === 'group');
    assert(
      validateDevices(
        device3,
        devices.map(device => device.url),
      ),
    );
  });
});
