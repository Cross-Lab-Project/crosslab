import {
    DeviceOverviewModel,
    ConcreteDeviceModel,
    InstantiableDeviceOverviewModel,
    InstantiableCloudDeviceModel,
    InstantiableBrowserDeviceModel,
    DeviceGroupModel,
    PeerconnectionModel,
} from './database/model'
import { exit } from 'process'
import { DataSourceOptions } from 'typeorm'

function die(reason: string): string {
    console.error(reason)
    exit(1)
}

const PORT = parseInt(process.env.PORT ?? '3001')
const DEFAULT_BASE_URL = 'http://localhost:' + PORT

export const config = {
    PORT: PORT,
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    BASE_URL: process.env.BASE_URL ?? DEFAULT_BASE_URL,
    SECURITY_ISSUER:
        process.env.SECURITY_ISSUER ??
        die('the environment variable SECURITY_ISSUER is not defined!'),
    SECURITY_AUDIENCE:
        process.env.SECURITY_AUDIENCE ??
        die('the environment variable SECURITY_AUDIENCE is not defined!'),
}

export const dataSourceConfig: DataSourceOptions = {
    type: 'sqlite',
    database: 'db/device.db',
    synchronize: true,
    entities: [
        DeviceOverviewModel,
        ConcreteDeviceModel,
        InstantiableDeviceOverviewModel,
        InstantiableCloudDeviceModel,
        InstantiableBrowserDeviceModel,
        DeviceGroupModel,
        PeerconnectionModel,
    ],
}
