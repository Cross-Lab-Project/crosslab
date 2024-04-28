import winston from 'winston';
import LokiTransport from 'winston-loki';

import { die } from '../utils.js';
import {
  LogLevel,
  LoggingConfig,
  LoggingTransportConfig,
  logLevelMapping,
} from './config.js';
import { parseConfig } from './helper.js';
import { addRequestID } from './requestId.js';

export let logger: winston.Logger;

export function init(config?: LoggingConfig) {
  if (config === undefined) {
    config = {
      LOGGING: process.env.LOGGING,
      LOGGING_TRANSPORT: process.env.LOGGING_TRANSPORT,
      LOGGING_LABELS: process.env.LOGGING_LABELS
    };
  }

  const parsed_config = parseConfig(config ?? {});
  const transports = initTransports(parsed_config);

  logger = winston.createLogger({
    format: winston.format.combine(addRequestID(), winston.format.json()),
    exitOnError: false,
    levels: logLevelMapping,
    level: parsed_config.LOGGING,
    transports,
  });

  logger.info('Logging initialized', {
    log_level: parsed_config.LOGGING,
    transports: parsed_config.LOGGING_TRANSPORT.map(t => t.transport).join(','),
    labels: parsed_config.LOGGING_LABELS
  });
}

function initTransports(config: {
  LOGGING: LogLevel;
  LOGGING_TRANSPORT: LoggingTransportConfig[];
  LOGGING_LABELS?: Record<string, string>
}) {
  return config.LOGGING_TRANSPORT.map(transport => {
    if (transport.transport === 'loki') {
      return new LokiTransport({
        host: transport.host,
        labels: config.LOGGING_LABELS,
        format: winston.format.json(),
        batching: true,
        interval: 5,
      });
    } else if (transport.transport === 'file') {
      return new winston.transports.File({ filename: transport.filename });
    } else if (transport.transport === 'stdout') {
      return new winston.transports.Console();
    } else if (transport.transport === 'stderr') {
      return new winston.transports.Console({ stderrLevels: ['error', 'fatal'] });
    } else {
      die('Unknown transport: ' + transport.transport);
      return new winston.transports.Console();
    }
  });
}
