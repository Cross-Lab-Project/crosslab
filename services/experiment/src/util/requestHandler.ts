import { logger } from './logging'

type Tail<T extends unknown[]> = T extends [infer _Head, ...infer Tail]
    ? Tail
    : never

export interface LogContext {
    index: number
    currentFunctionName?: string
}

export class RequestHandler {
    private index: number
    private currentFunctionName?: string
    private static currentIndex: number = 0

    constructor(functionName?: string) {
        this.index = RequestHandler.currentIndex++
        this.currentFunctionName = functionName
    }

    public log(...args: Parameters<typeof logger.log>) {
        let prepend = ''
        prepend += `(${this.index}) `
        prepend += this.currentFunctionName ? `${this.currentFunctionName} ` : ''
        prepend += prepend.length > 0 ? ': ' : ''
        logger.log(args[0], prepend + args[1])
    }

    public executeSync<F extends (r: RequestHandler, ...args: any) => any>(
        f: F,
        ...args: Tail<Parameters<F>>
    ): ReturnType<F> {
        this.log("debug", `Entering sync function "${f.name}"`)
        const previousFunctionName = this.currentFunctionName
        this.currentFunctionName = f.name
        const result = f(this, args)
        this.currentFunctionName = previousFunctionName
        this.log("debug", `Leaving sync function "${f.name}"`)
        return result
    }

    public async executeAsync<F extends (r: RequestHandler, ...args: any) => Promise<any>>(
        f: F,
        ...args: Tail<Parameters<F>>
    ): Promise<ReturnType<F>> {
        this.log("debug", `Entering async function "${f.name}"`)
        const previousFunctionName = this.currentFunctionName
        this.currentFunctionName = f.name
        const result = await f(this, args)
        this.currentFunctionName = previousFunctionName
        this.log("debug", `Leaving async function "${f.name}"`)
        return result
    }

    public throw<E extends { new(requestHandler: RequestHandler, ...args: Tail<ConstructorParameters<E>>): InstanceType<E> }>(error: E, ...args: Tail<ConstructorParameters<typeof error>>): never {
        throw new error(this, ...args)
    }
}
