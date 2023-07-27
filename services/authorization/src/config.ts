import { logger } from '@crosslab/service-common'

export function die(reason: string): string {
    logger.log('error', reason)
    process.exit(1)
}