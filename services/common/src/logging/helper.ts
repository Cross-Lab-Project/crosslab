import {die} from '../utils.js';
import {LogLevel, LoggingConfig, LoggingTransortConfig, logLevelMapping} from './config.js';

export function parseConfig(config: LoggingConfig): {LOGGING: LogLevel; LOGGING_TRANSPORT: LoggingTransortConfig[]} {
  let LOGGING = config.LOGGING ?? "info";
  let LOGGING_TRANSPORT = config.LOGGING_TRANSPORT ?? "stdout";
  LOGGING = LOGGING in logLevelMapping ? LOGGING : die("DEBUG must be on of " + Object.keys(logLevelMapping).join(","));

  // Parse Debug Transport as '{transport}#{parameter},{transport}#{parameter},...'
  if (typeof LOGGING_TRANSPORT === "string") {
    LOGGING_TRANSPORT = LOGGING_TRANSPORT.split(",").map(transport => {
      const [transportName, ...parameters] = transport.split("#");
      const transportConfig: Partial<LoggingTransortConfig> = {transport: transportName as "stdout" | "stderr" | "loki" | "file"};
      if (transportConfig.transport === "loki") {
        transportConfig.host = parameters[0] ?? die("Loki transport requires a host");
      } else if (transportConfig.transport === "file") {
        transportConfig.filename = parameters[0] ?? die("File transport requires a filename");
      }
      return transportConfig as LoggingTransortConfig;
    });
  }

  if (!Array.isArray(LOGGING_TRANSPORT)) LOGGING_TRANSPORT = [LOGGING_TRANSPORT];
  return {LOGGING: LOGGING as LogLevel, LOGGING_TRANSPORT};
}
