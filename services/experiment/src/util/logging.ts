import winston, { LoggerOptions } from 'winston'

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

/**
 * The mapping of the possible log levels to their corresponding color
 */
const logColors: Record<LogLevelName, string> = {
    fatal: 'red',
    error: 'magenta',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
    trace: 'white',
}

/**
 * A wrapper around a winston logger offering custom logging functions
 */
class CustomLogger {
    private logger: winston.Logger

    constructor(options?: LoggerOptions & { levels: Record<LogLevelName, number> }) {
        this.logger = winston.createLogger(options)
    }

    public log(level: LogLevelName, message: string) {
        this.logger.log(level, message)
    }
}

/**
 * The global logger instance
 */
export const logger = new CustomLogger({
    format: undefined,
    exitOnError: false,
    levels: logLevels,
    transports: [new winston.transports.Console()],
})

winston.addColors(logColors)
