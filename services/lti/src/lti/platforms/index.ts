import * as moodle from './moodle.js';

export async function getPlatformEndpoints({ iss }: { iss: string }) {
  const urls = await moodle.getPlatformEndpoints({ iss });
  if (urls === undefined) {
    throw new Error('No valid endpoints found');
  }
  return urls;
}
