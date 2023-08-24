import {AsyncLocalStorage} from "async_hooks";
//import {TransformableInfo} from 'logform';
import winston, {Logger, createLogger, format, transports} from "winston";

export const asyncLocalStorage = new AsyncLocalStorage<{requestID: string}>();

/**
 * The possible log level names
 */
type LogLevelName = "fatal" | "error" | "warn" | "info" | "debug" | "trace";

/**
 * The mapping of the possible log level names to their corresponding level
 */
const logLevels: Record<LogLevelName, number> = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const addRequestID = winston.format(info => {
  const requestID = asyncLocalStorage.getStore()?.requestID;
  if (requestID) info.requestID = requestID;
  return info;
});

/*const sortProperties = winston.format(info => {
  const levelSymbol = Symbol.for('level');
  const messageSymbol = Symbol.for('message');
  const sortedInfo: TransformableInfo = {
    level: info.level,
    requestID: info.requestID,
    message: info.message,
    data: info.data,
    meta: info.meta,
  };

  const furtherInfo: {[k: string | symbol]: unknown} = {...info};
  delete furtherInfo.level;
  delete furtherInfo.requestID;
  delete furtherInfo.message;
  delete furtherInfo.data;
  delete furtherInfo.meta;
  delete furtherInfo[levelSymbol];
  delete furtherInfo[messageSymbol];

  sortedInfo[messageSymbol] = JSON.stringify({...sortedInfo, ...furtherInfo});
  sortedInfo[levelSymbol] = info.level;

  return {
    ...sortedInfo,
    ...furtherInfo,
  };
});*/

export const logger: Logger = createLogger({
  format: winston.format.combine(addRequestID(), format.json()),
  exitOnError: false,
  levels: logLevels,
  transports: [new transports.Console({level: "debug"})],
});
