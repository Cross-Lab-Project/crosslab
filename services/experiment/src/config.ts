import { Migrations } from './database/migrations'
import {
    ExperimentModel,
    DeviceModel,
    ServiceConfigurationModel,
    PeerconnectionModel,
    ParticipantModel,
    RoleModel,
    InstanceModel,
} from './database/model'
import { logger } from '@crosslab/service-common'
import { exit } from 'process'
import { DataSourceOptions } from 'typeorm'

export type AppConfiguration = {
    PORT: number
    NODE_ENV: string
    BASE_URL: string
    JWKS_URL: string
    SECURITY_ISSUER: string
    SECURITY_AUDIENCE: string
    API_TOKEN: string
}

function die(reason: string): string {
    logger.log('error', reason)
    exit(1)
}

function initializeAppConfiguration(): AppConfiguration {
    return {
        PORT: parseInt(process.env.PORT ?? '3000'),
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        BASE_URL: process.env.BASE_URL ?? 'http://localhost:3000',
        JWKS_URL: process.env.JWKS_URL ?? 'http://localhost/.well-known/jwks.json',
        SECURITY_ISSUER:
            process.env.SECURITY_ISSUER ??
            die('the environment variable SECURITY_ISSUER is not defined!'),
        SECURITY_AUDIENCE:
            process.env.SECURITY_AUDIENCE ??
            die('the environment variable SECURITY_AUDIENCE is not defined!'),
        API_TOKEN:
            process.env.API_TOKEN ??
            die('the environment variable API_TOKEN is not defined'),
    }
}

export const config = initializeAppConfiguration()

export const dataSourceConfig: DataSourceOptions = {
    type: 'sqlite',
    database: 'db/experiment.db',
    entities: [
        ExperimentModel,
        DeviceModel,
        InstanceModel,
        ServiceConfigurationModel,
        PeerconnectionModel,
        ParticipantModel,
        RoleModel,
    ],
    migrations: [...Migrations],
    migrationsRun: true,
}
