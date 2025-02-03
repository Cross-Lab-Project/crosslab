import { Command } from 'commander';

import { CRUD } from './common.js';

export function template(program: Command) {
  const template = program.command('template');

  CRUD(template, {
    create: 'createTemplate',
    list: 'listTemplate',
    read: 'getTemplate',
    update: 'updateTemplate',
    del: 'deleteTemplate',
  }, 'experiment template', (item) => ({ name: item.name, url: item.url }), {
    _c_name: 'Name of the template',
    _c_description: 'OPTIONAL Description of the template',
  });
}
