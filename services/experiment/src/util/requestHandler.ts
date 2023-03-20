import { Logger, format, transports, createLogger, LogEntry } from 'winston'
import { ErrorWithStatus } from '../generated/types'

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
    transports: [
        new transports.Console({level: 'debug'}),
    ],
})

type Tail<T extends unknown[]> = T extends [infer _Head, ...infer _Tail] ? _Tail : never

export class RequestHandler {
    private id: number
    private currentFunctionName?: string
    private logEntries: LogEntry[]
    private static currentIndex = 0
    private static logger: Logger = logger

    constructor(functionName?: string) {
        this.id = RequestHandler.currentIndex++
        this.currentFunctionName = functionName
        this.logEntries = []
    }

    public log = (level: LogLevelName, message: any, meta?: {[k: string]: any}) => {
        const logEntry = {
            level: level,
            message: message,
            requestId: this.id,
            currentFunction: this.currentFunctionName,
            ...meta
        }
        this.logEntries.push(logEntry)
    }

    public executeSync<F extends (r: RequestHandler, ...args: any) => any>(
        f: F,
        ...args: Tail<Parameters<F>>
    ): ReturnType<F> {
        this.log('debug', `Entering sync function "${f.name}"`, { input: args })
        const previousFunctionName = this.currentFunctionName
        this.currentFunctionName = f.name
        const result = f(this, ...args)
        this.currentFunctionName = previousFunctionName
        this.log('debug', `Leaving sync function "${f.name}"`, { output: result })
        return result
    }

    public async executeAsync<
        F extends (r: RequestHandler, ...args: any) => Promise<any>
    >(f: F, ...args: Tail<Parameters<F>>): Promise<ReturnType<F>> {
        this.log('debug', `Entering async function "${f.name}"`, { input: args })
        const previousFunctionName = this.currentFunctionName
        this.currentFunctionName = f.name
        const result = await f(this, ...args)
        this.currentFunctionName = previousFunctionName
        this.log('debug', `Leaving async function "${f.name}"`, { output: result })
        return result
    }

    public throw<
        I extends ErrorWithStatus,
        E extends {
            new (
                ...args: ConstructorParameters<E>
            ): I
        }
    >(error: E, ...args: ConstructorParameters<typeof error>): never {
        const err = new error(...args)
        const status = err.status
        delete err.status
        RequestHandler.logger.log('error', `${err.name} ${status}: "${err.message}"`, { error: err.stack, status, trace: this.logEntries })
        throw {...err, status }
    }
}
