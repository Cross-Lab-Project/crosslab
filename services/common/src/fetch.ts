import fetchRetry from 'fetch-retry';

import { requestIdContext } from './logging/requestId.js';

const requestIDAwareFetch: typeof global.fetch = async (input, init) => {
  const id = requestIdContext.getStore();
  if (id) {
    init = {
      ...init,
      headers: {
        ...init?.headers,
        'X-Request-ID': id,
      },
    };
  }
  return global.fetch(input, init);
};

function retryDelayFunction(attempt: number): number {
  if (attempt === 1) return 0;
  return 2 ** (attempt - 1) * 200;
} // 0, 200, 400, 800

export const fetch = fetchRetry(requestIDAwareFetch, {
  retries: 4,
  retryDelay: retryDelayFunction,
});
