import * as moodle from './moodle.js';
import * as test from './test.js';

export async function getPlatformEndpoints({ iss }: { iss: string }) {
  let urls = await moodle.getPlatformEndpoints({ iss });
  urls = await test.getPlatformEndpoints({ iss });
  if (urls === undefined) {
    throw new Error('No valid endpoints found');
  }
  return urls;
}
