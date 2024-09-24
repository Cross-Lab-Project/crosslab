export async function getPlatformEndpoints({ iss }: { iss: string }) {
  const possible_urls = [
    {
      authentication_request_url: iss + '/auth_request',
      access_token_url: iss + '/access_token',
      jwks_url: iss + '/jwks',
    },
  ];

  try {
    for (const urls of possible_urls) {
      const auth_result = await fetch(urls.authentication_request_url);
      const token_result = await fetch(urls.access_token_url);
      const jwks_result = await fetch(urls.jwks_url);

      if (
        [200, 400].includes(auth_result.status) &&
        [200, 400].includes(token_result.status) &&
        [200].includes(jwks_result.status)
      ) {
        return urls;
      }
    }
  } catch (e) {
    console.log(e);
  }

  return undefined;
}
