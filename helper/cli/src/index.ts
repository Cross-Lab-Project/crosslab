#!/usr/bin/env node
import { APIClient } from '@cross-lab-project/api-client';
import { Option, program } from 'commander';

import { device } from './commands/device.js';
import { experiment } from './commands/experiment.js';
import { login } from './commands/login.js';
import { user } from './commands/user.js';
import { template } from './commands/template.js';

program
  .description('CLI to interact with CrossLab')
  .addOption(
    new Option('--url <url>', 'URL of the CrossLab instance').env('CROSSLAB_CLI_URL'),
  )
  .addOption(
    new Option('--token <token>', 'Token to use for authentication').env(
      'CROSSLAB_CLI_TOKEN',
    ),
  )
  .option('-u, --username <username>', 'Username to use for authentication')
  .option('-p, --password <password>', 'Password to use for authentication');

login(program, getClient);
device(program, getClient);
experiment(program, getClient);
user(program, getClient);
template(program, getClient);

program.parse();

function getClient() {
  const globalOptions = program.opts();
  const client = new APIClient(globalOptions.url);
  if (globalOptions.token) {
    client.accessToken = globalOptions.token;
  }
  return client;
}
