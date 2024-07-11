import { fileURLToPath } from 'url';

import { mainLoop } from './mainLoop.js';

export * from './mainLoop.js';
export * from './messageDefinition.js';
export * from './config.js';

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log('Starting reservation service');

  mainLoop();
}
