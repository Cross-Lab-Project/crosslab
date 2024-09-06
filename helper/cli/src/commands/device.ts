import { Command } from 'commander';

import { CRUD } from './common.js';
import { getClient } from './login.js';
export function device(program: Command) {
  const device = program.command('device');

  const {promptUrl} = CRUD(device,{create:'createDevice', list:'listDevices', read:'getDevice', update:'updateDevice', del:'deleteDevice'}, 'device', (item: any) => ({ name: item.name, url: item.url }));

  device
    .command('token')
    .argument('[device url]')
    .action(async (url?: string) => {
      const client = await getClient();
      url = url || (await promptUrl(client));
      const identity = await client.getIdentity();
      const token = await (client as any).createToken({
        user: identity.id,
        claims: { device_token: true },
      });
      process.stdout.write(token);
    });
}
