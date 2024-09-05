import { Command } from 'commander';

import { getClient } from './login.js';
import { prompt } from './prompt.js';

export function user(program: Command) {
  const user = program.command('user');

  user
    .command('list')
    .alias('ls')
    .option('--json', 'Output the JSON response')
    .action(async options => {
      const client = await getClient();

      const users = await client.listUsers();

      if (options.json) {
        console.log(JSON.stringify(users, null, 2));
      } else {
        console.log(users);
      }
    });

  user
    .command('inspect')
    .argument('[user url]')
    .action(async (url?: string) => {
      const client = await getClient();

      if (url == undefined) {
        console.log('Please provide a user url');
        return;
      }

      console.log(await client.getUser(url));
    });

  user
    .command('create')
    .option('-u, --username <username>', 'Username to use for authentication')
    .option('-p, --password <password>', 'Password to use for authentication')
    .action(async options => {
      const client = await getClient();
      let username: string = options.username;
      let password: string = options.password;

      if (username == undefined) username = await prompt('Username: ');
      if (password == undefined) password = await prompt('Password: ', true);

      client.createUser({ username, password });
    });

  user
    .command('delete')
    .argument('[user url]')
    .action(async (url?: string) => {
      const client = await getClient();

      if (url == undefined) {
        console.log('Please provide a user url');
        return;
      }

      await client.deleteUser(url);
    });
}
