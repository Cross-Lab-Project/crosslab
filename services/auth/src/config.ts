import { config as CommonConfig } from '@crosslab/service-common'

export const config = {
    PORT: parseInt(process.env.PORT ?? '3000'),
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    BASE_URL: process.env.BASE_URL ?? 'http://localhost:3000',
    JWT_SECRET: 'secret',
    orm: {
        ...CommonConfig.readOrmConfig(),
    },
    authorization_config:{
        ...CommonConfig.readAuthorizationConfig(),
        AUTHORIZATION_SERVER: 'http://localhost:3010',
    }
}
