import { AsyncLocalStorage } from 'async_hooks';
import winston from 'winston';

export const requestIdContext = new AsyncLocalStorage<string>();

export const addRequestID = winston.format(info => {
  const id = requestIdContext.getStore();
  if (id) info.requestID = id;
  return info;
});
