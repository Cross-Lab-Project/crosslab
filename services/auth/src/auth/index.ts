const bearerTokenRegex = /^Bearer (\S*)$/;
export function parseBearerToken(
  authorizationHeader: string | undefined,
): string | undefined {
  if (!authorizationHeader) {
    return undefined;
  }
  const match = authorizationHeader.match(bearerTokenRegex);

  if (!match || match.length !== 2) {
    return undefined;
  }

  return match[1];
}

export function parseQueryToken(query: string | undefined): string | undefined {
  if (!query) {
    return undefined;
  }
  const params = new URLSearchParams(query);
  return params.get('authToken') ?? undefined;
}
