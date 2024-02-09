import { mainLoop } from './mainLoop';

export * from './mainLoop';
export * from './messageDefinition';

console.log('Starting reservation service');

if (require.main === module) mainLoop();
