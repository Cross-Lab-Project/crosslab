import { logger } from "./logger"

export function die(reason: string): string {
    logger.log('error', reason)
    process.exit(1)
}