import { APIClient, DeviceServiceTypes } from '@cross-lab-project/api-client';
import chalk from 'chalk';
import { Command } from 'commander';

import { prompt } from './prompt';

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

  device.command('list').action(async () => {
    const client = getClient();
    const devices = await client.listDevices();
    console.log(shortDeviceList(devices));
  });

  device
    .command('inspect')
    .argument('[device url]')
    .action(async (url?: string) => {
      const client = getClient();
      if (url == undefined) url = (await selecteDevice(await client.listDevices())).url;
      if (url == undefined) throw new Error('No device selected');
      const device = await client.getDevice(url);
      console.log(device);
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

  /*device.command('token').argument('[device url]').action(async (url?: string) => {
        const client = getClient();
        if (url == undefined) url = (await selecteDevice(await client.listDevices())).url;
        if (url == undefined) throw new Error("No device selected");
        const token = await client.createDeviceAuthenticationToken(url);
        console.log(token);
    })*/
}
