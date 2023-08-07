import { logger } from '@crosslab/service-common'

function die(reason: string): string {
     logger.log('error', reason)
     process.exit(1)
}

function remove_trailing_slash(url: string): string {
    if (url.endsWith('/')) {
        return url.slice(0, -1)
    } else {
        return url
    }
}

export const config = {
    PORT: parseInt(process.env.PORT ?? '3000'),
    BASE_URL: remove_trailing_slash(process.env.BASE_URL ?? 'http://localhost:3000'),
    COOKIE_SECRET: process.env.COOKIE_SECRET ?? die('COOKIE_SECRET not set'),
}