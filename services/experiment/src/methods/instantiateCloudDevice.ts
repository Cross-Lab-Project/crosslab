import fetch from 'node-fetch';

export async function instantiateCloudDevice(
  url: string,
  init: {
    instanceUrl: string;
    deviceToken: string;
  },
): Promise<void> {
  const instantiationUrl = new URL(url);
  instantiationUrl.searchParams.set('instanceUrl', init.instanceUrl);
  instantiationUrl.searchParams.set('deviceToken', init.deviceToken);
  const response = await fetch(instantiationUrl, { method: 'POST' });

  if (response.status !== 201) {
    throw new Error(`Could not instantiate cloud instantiable device "${url}"!`);
  }
}
