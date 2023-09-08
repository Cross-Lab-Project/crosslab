import {
  APIClient,
  AuthenticationServiceTypes,
  DeviceServiceTypes,
} from '@cross-lab-project/api-client';
import { DeviceOwnershipError } from '@crosslab/service-common';
import assert from 'assert';

import { config } from '../config';

const apiClient = new APIClient(config.API_URL);

describe('Device Visibility', function () {
  const devices: DeviceServiceTypes.Device[] = [];
  const credentialsUser1 = { username: 'user1', password: 'user1' };
  const credentialsUser2 = { username: 'user2', password: 'user2' };
  const credentialsDeveloper = { username: 'developer', password: 'developer' };
  let user1: AuthenticationServiceTypes.User<'response'>;
  let user2: AuthenticationServiceTypes.User<'response'>;
  let developer: AuthenticationServiceTypes.User<'response'>;

  this.beforeAll(async function () {
    this.timeout(20000);

    await apiClient.login(config.USERNAME, config.PASSWORD);

    for (const device of await apiClient.listDevices()) {
      await apiClient.deleteDevice(device.url);
    }

    user1 = await apiClient.register(credentialsUser1);
    user2 = await apiClient.register(credentialsUser2);
    developer = await apiClient.register(credentialsDeveloper);

    const roles = await apiClient.listRoles();
    const developerRole = roles.find(role => role.name === 'developer');
    if (!developerRole) throw new Error("Could not find role 'developer'");
    await apiClient.addRolesToUser([developerRole.id], developer.id);

    await apiClient.logout();

    for (const credentials of [credentialsUser1, credentialsUser2]) {
      await apiClient.login(credentials.username, credentials.password);

      const privateDevice = await apiClient.createDevice({
        type: 'device',
        name: 'Private Device',
        isPublic: false,
      });

      const publicDevice = await apiClient.createDevice({
        type: 'device',
        name: 'Public Device',
        isPublic: true,
      });

      devices.push(privateDevice, publicDevice);

      await apiClient.logout();
    }
  });

  it(`should correctly resolve the devices for the users`, async function () {
    this.timeout(5000);

    for (const user of [
      { ...user1, credentials: credentialsUser1 },
      { ...user2, credentials: credentialsUser2 },
    ]) {
      await apiClient.login(user.credentials.username, user.credentials.password);

      const resolvedDevices = await apiClient.listDevices();

      assert.strictEqual(
        resolvedDevices.length,
        devices.filter(device => device.owner === user.url || device.isPublic).length,
      );

      for (const device of devices) {
        if (device.owner !== user.url && !device.isPublic) {
          assert.rejects(
            async () => {
              await apiClient.getDevice(device.url);
            },
            error => {
              if (!(error instanceof DeviceOwnershipError)) return false;
              if (error.status !== 403) return false;

              return true;
            },
          );
        } else {
          await apiClient.getDevice(device.url);
        }
      }

      await apiClient.logout();
    }
  });

  it(`should correctly resolve the devices for the superadmin`, async function () {
    this.timeout(5000);

    await apiClient.login(config.USERNAME, config.PASSWORD);

    const resolvedDevices = await apiClient.listDevices();

    assert.strictEqual(resolvedDevices.length, devices.length);

    for (const device of devices) {
      await apiClient.getDevice(device.url);
    }

    await apiClient.logout();
  });

  it(`should correctly resolve the devices for the developer`, async function () {
    this.timeout(5000);

    await apiClient.login(credentialsDeveloper.username, credentialsDeveloper.password);

    const resolvedDevices = await apiClient.listDevices();

    assert.strictEqual(resolvedDevices.length, devices.length);

    for (const device of devices) {
      await apiClient.getDevice(device.url);
    }

    await apiClient.logout();
  });
});
