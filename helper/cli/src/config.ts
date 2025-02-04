import fs from 'fs';
import os from 'os';
import path from 'path';

export const configLocation = os.homedir() + '/.config/crosslab/config.json';

// load json
export let config:{
    activeProfile?: string;
    profiles?: {
        [key: string]: {
            url: string;
            username: string;
            token?: string;
        };
    };
    editor?: string;
} = {};
if (fs.existsSync(configLocation)) {
  config = JSON.parse(fs.readFileSync(configLocation, 'utf8'));
}

export function saveConfig() {
  const configDir = path.dirname(configLocation);
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  fs.writeFileSync(configLocation, JSON.stringify(config, null, 2));
}
