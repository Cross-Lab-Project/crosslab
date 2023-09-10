export const logLevelMapping = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};
export type LogLevel = keyof typeof logLevelMapping;

export type LoggingLokiTransportConfig = { transport: 'loki'; host: string };
export type LoggingFileTransportConfig = { transport: 'file'; filename: string };
export type LoggingStdoutTransportConfig = { transport: 'stdout' | 'stderr' };
export type LoggingTransortConfig =
  | LoggingLokiTransportConfig
  | LoggingFileTransportConfig
  | LoggingStdoutTransportConfig;

export type LoggingConfig = {
  LOGGING?: string | LogLevel;
  LOGGING_TRANSPORT?: string | LoggingTransortConfig | LoggingTransortConfig[];
};
