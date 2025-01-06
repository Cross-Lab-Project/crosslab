import { Command } from 'commander';

import { CRUD } from './common.js';
import { getClient } from './login.js';
export function device(program: Command) {
  const device = program.command('device');

  const {promptUrl} = CRUD(device,{create:'createDevice', list:'listDevices', read:'getDevice', update:'updateDevice', del:'deleteDevice'}, 'device', (item: any) => ({ name: item.name, url: item.url }), {
    _c_name: 'Name of the device',
    _c_description: 'OPTIONAL Description of the device',
    _c_type: 'Type of the device: device | edge instanciable | cloud instanciable | group',
    isPublic: false,
    _c_devices: '{url: } Required for group type. List of devices in the group',
  });

  device
    .command('token')
    .argument('[device url]')
    .action(async (url?: string) => {
      const client = await getClient();
      client.createDevice
      url = url || (await promptUrl(client));
      const identity = await client.getIdentity();
      const token = await (client as any).createToken({
        user: identity.id,
        claims: { device_token: true },
      });
      process.stdout.write(token);
    });
}
