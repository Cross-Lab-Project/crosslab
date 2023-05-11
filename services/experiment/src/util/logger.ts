import { Logger, format, transports, createLogger } from 'winston'

/**
 * The possible log level names
 */
export type LogLevelName = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'

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
}

export const logger: Logger = createLogger({
    format: format.json(),
    exitOnError: false,
    levels: logLevels,
    transports: [new transports.Console({ level: 'debug' })],
})
