import { DataSourceOptions } from 'typeorm'
import { ScopeModel, RoleModel, UserModel, KeyModel, ActiveKeyModel, TokenModel } from './database/model'
import { parseAllowlist } from './methods/allowlist'
import { die } from './methods/utils'
import { AppConfiguration } from './types/types'

export const config: AppConfiguration = {
    PORT: parseInt(process.env.PORT ?? '3000'),
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    BASE_URL: process.env.BASE_URL ?? 'http://localhost:3000',
    SECURITY_ISSUER:
        process.env.SECURITY_ISSUER ??
        die('the environment variable SECURITY_ISSUER is not define!'),
    SECURITY_AUDIENCE:
        process.env.SECURITY_AUDIENCE ??
        die('the environment variable SECURITY_AUDIENCE is not define!'),
    ALLOWLIST: process.env.ALLOWLIST ? parseAllowlist(process.env.ALLOWLIST) : [],
}

export const dataSourceConfig: DataSourceOptions = {
    type: 'sqlite',
    database: 'db/device.db',
    synchronize: true,
    entities: [ScopeModel, RoleModel, UserModel, KeyModel, ActiveKeyModel, TokenModel],
}