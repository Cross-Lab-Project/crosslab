#!/usr/bin/env node
import { program } from 'commander';

import { device } from './commands/device.js';
import { experiment } from './commands/experiment.js';
import { login } from './commands/login.js';
import { lti } from './commands/lti.js';
import { template } from './commands/template.js';
import { user } from './commands/user.js';
import { config, configLocation } from './config.js';
import { editFile } from './utils.js';

const setProfile = (profile: string) => {
  config.activeProfile = profile;
};
program.description('CLI to interact with CrossLab').option('-p, --profile <name>', 'Set the the profile to use for authentication', setProfile);

login(program);
device(program);
experiment(program);
user(program);
template(program);
lti(program);

program.command('config').action(async () => editFile(configLocation));


program.parse();