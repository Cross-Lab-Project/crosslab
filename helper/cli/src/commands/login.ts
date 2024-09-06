import { APIClient } from '@cross-lab-project/api-client';
import { Command } from 'commander';

import chalk from 'chalk';
import { config, saveConfig } from '../config.js';
import { prompt } from './prompt.js';

export async function getClient() {
  try{
    const profile = config.profiles![config.activeProfile!];
    if (!profile) {throw new Error('No active profile found');}
    const client = new APIClient(profile.url);
    if (profile.token) {
      client.accessToken = profile.token;
    }
    try{
      const identity=await client.getIdentity()
      process.stderr.write('Logged in as ' + identity.username + '\n');
    }catch{
      // if the tty is interactive, then we can prompt the user for the password
      if (process.stdin.isTTY) {
        try{
          await client.login(profile.username, await prompt('Password: ', true));
        }catch{
          process.stderr.write('Password incorrect\n');
          process.exit(1);
        }
      } else {
        throw new Error('No active profile found');
      }
    }
    return client;
  }catch{
    process.stderr.write('No active profile found or token invalid. Please login first\n');
    process.exit(1);
  }
}


export function login(program: Command) {
  program
    .command('login')
    .description('Authenticate to CrossLab using your credentials')
    .action(async () => {
      let profile: string | null = null;
      if (config.profiles) {
        while (!profile) {
          process.stdout.write('Choose the profile you want to login to.\n');
          let profiles = Object.keys(config.profiles);
          for (let i = 0; i < profiles.length; i++) {
            process.stdout.write(('[' + i + ']').padStart(4) + ' ' + profiles[i]+ ' ' + chalk.dim(config.profiles[profiles[i]].url) + '\n');
          }
          process.stdout.write('Press n to create a new profile\n');
          let profileIndex = await prompt('Profile: ');
          if (profileIndex === 'n') {
            profile = await createNewProfile();
          } else {
            try {
              profile = profiles[parseInt(profileIndex)];
              if (!profile) throw new Error('Invalid profile');
            } catch (e) {
              process.stdout.write('\n\nInvalid profile\n\n');
            }
          }
        }
      } else {
        profile = await createNewProfile();
      }
      config.activeProfile = profile;
      await saveConfig();

      const client = await getClient();
      config.profiles![profile].token = client.accessToken;
      await saveConfig();
    });
}

async function createNewProfile() {
  const profile = await prompt('profile name: ');
  config.profiles = config.profiles || {};
  config.profiles[profile] = {
    url: await prompt('URL: '),
    username: await prompt('Username: '),
    token: '',
  };
  return profile;
}
