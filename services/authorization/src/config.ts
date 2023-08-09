import { logger } from '@crosslab/service-common'

export function die(reason: string): string {
    logger.log('error', reason)
    process.exit(1)
}

export const config = {
    PORT: parseInt(process.env.PORT ?? '3010'),
    PSK: process.env['AUTHORIZATION_PSK'] ?? die('AUTHORIZATION_PSK is not set'),
    JWT_SECRET: process.env['JWT_SECRET'] ?? die('JWT_SECRET is not set'),
}