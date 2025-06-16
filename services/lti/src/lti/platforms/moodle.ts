import fetch from 'node-fetch';

export async function getPlatformEndpoints({ iss }: { iss: string }) {
  const possible_urls = [
    {
      authentication_request_url: iss + '/mod/lti/auth.php',
      access_token_url: iss + '/mod/lti/token.php',
      jwks_url: iss + '/mod/lti/certs.php',
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
  } catch (e) {}

  return undefined;
}
