import { APIClient, DeviceServiceTypes } from '@cross-lab-project/api-client';
import chalk from 'chalk';
import { Command } from 'commander';

import { prompt } from './prompt.js';

function shortDeviceList(
  devices: DeviceServiceTypes.DeviceOverview[],
  printNumbers: boolean = false,
) {
  let ret: string = '';
  for (const [idx, device] of devices.entries()) {
    if (printNumbers) {
      ret += ('[' + idx + ']').padStart(4) + ' ';
    }
    switch (device.type) {
      case 'device':
        ret += chalk.bgCyan(' DEVICE ') + ' ';
        break;
      case 'cloud instantiable':
        ret += chalk.bgGreen('  CLOUD ') + ' ';
        break;
      case 'edge instantiable':
        ret += chalk.bgYellow('  EDGE  ') + ' ';
        break;
      case 'group':
        ret += chalk.bgMagenta('  GROUP ') + ' ';
        break;
      default:
        ret += chalk.bgRed('Type: ' + device.type);
    }
    ret +=
      chalk.green(device.name) +
      ' ' +
      chalk.dim(device.url) +
      ' ' +
      chalk.dim('owned by ' + device.owner) +
      '\n';
  }
  return ret;
}

async function selecteDevice(devices: DeviceServiceTypes.DeviceOverview[]) {
  process.stdout.write(shortDeviceList(devices, true));
  return devices[parseInt(await prompt('Select device: '))];
}

export function device(program: Command, getClient: () => APIClient) {
  const device = program.command('device');

  device
    .command('list')
    .option('--json', 'Output the JSON response')
    .action(async options => {
      const client = getClient();
      const devices = await client.listDevices();
      if (options.json) {
        console.log(JSON.stringify(devices, null, 2));
      } else {
        console.log(shortDeviceList(devices));
      }
    });

  device
    .command('inspect')
    .argument('[device url]')
    .option('--json', 'Output the JSON response')
    .action(async (url, options) => {
      const client = getClient();
      if (url == undefined) url = (await selecteDevice(await client.listDevices())).url;
      if (url == undefined) throw new Error('No device selected');
      const device = await client.getDevice(url);
      if (options.json) {
        console.log(JSON.stringify(device, null, 2));
      } else {
        console.log(device);
      }
    });

  device.command('create').action(async options => {
    const client = getClient();
    let name: string = options.username;

    if (name == undefined) name = await prompt('Name: ');

    client.createDevice({
      name,
      isPublic: true,
      description: 'Beschreibung',
      type: 'device',
    });
  });

  device
    .command('update')
    .argument('[device url]')
    .action(async (url?: string) => {
      const client = getClient();

      let device = '';
      for await (const chunk of process.stdin) device += chunk;

      if (url == undefined) throw new Error('No device selected');

      const dev = JSON.parse(device);

      client.updateDevice(url, dev);
    });

  device
    .command('delete')
    .argument('[device url]')
    .action(async (url?: string) => {
      const client = getClient();
      if (url == undefined) url = (await selecteDevice(await client.listDevices())).url;
      if (url == undefined) throw new Error('No device selected');
      await client.deleteDevice(url);
    });

  device
    .command('token')
    .argument('[device url]')
    .action(async (url?: string) => {
      const client = getClient();
      if (url == undefined) url = (await selecteDevice(await client.listDevices())).url;
      if (url == undefined) throw new Error('No device selected');
      const identity = await client.getIdentity();
      const token = await (client as any).createToken({
        user: identity.id,
        claims: { device_token: true },
      });
      console.log(token);
    });
}
