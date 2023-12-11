import fetchRetry from 'fetch-retry';

function retryDelayFunction(attempt: number): number {
  if (attempt === 1) return 0;
  return 2 ** (attempt - 1) * 200;
} // 0, 200, 400, 800

export const fetch = fetchRetry(global.fetch, {
  retries: 4,
  retryDelay: retryDelayFunction,
});
