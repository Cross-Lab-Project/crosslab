import { Command } from 'commander';

import { CRUD } from './common.js';

export function user(program: Command) {
  const user = program.command('user');

  CRUD(user, {
    create: 'createUser',
    list: 'listUsers',
    read: 'getUser',
    update: 'updateUser',
    del: 'deleteUser'
  }, 'user', (item) => ({ name: item.username, url: item.url }));
}
