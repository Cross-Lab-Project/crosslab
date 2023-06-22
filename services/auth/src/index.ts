import { config, dataSourceConfig } from './config'
import { AppDataSource, initializeDataSource, repositories } from './database/dataSource'
import { app } from './generated'
import { parseAllowlist, resolveAllowlist } from './methods/allowlist'
import { apiClient } from './methods/api'
import { generateNewKey, jwk } from './methods/key'
import { AppConfiguration } from './types/types'
import {
    JWTVerify,
    errorHandler,
    logHandling,
    logger,
    missingRouteHandling,
    requestIdHandling,
} from '@crosslab/service-common'
import { DataSourceOptions } from 'typeorm'

async function startAuthenticationService(
    appConfig: AppConfiguration,
    options: DataSourceOptions
) {
    await AppDataSource.initialize(options)
    await initializeDataSource()

    apiClient.accessToken = appConfig.API_TOKEN
    const allowlist = appConfig.ALLOWLIST ? parseAllowlist(appConfig.ALLOWLIST) : []

    // Resolve Allowlist
    await resolveAllowlist(allowlist)
    setInterval(resolveAllowlist, 600000, allowlist)

    // Create new active key
    const activeSigKey = await repositories.activeKey.findOne({
        where: {
            use: 'sig',
        },
    })
    const key = activeSigKey?.key ?? (await generateNewKey())
    const jwks = JSON.stringify({ keys: [jwk(key)] })

    if (!activeSigKey) {
        const activeKeyModel = await repositories.activeKey.create({
            use: key.use,
            key: key.uuid,
        })
        await repositories.activeKey.save(activeKeyModel)
    }

    app.get('/.well-known/jwks.json', (_req, res) => {
        res.send(jwks)
    })
    app.get('/.well-known/openid-configuration', (_req, res) => {
        res.send({ jwks_uri: '/.well-known/jwks.json' })
    })

    app.get('/auth/status', (_req, res) => {
        res.send({ status: 'ok' })
    })

    app.initService({
        security: {
            JWT: JWTVerify(appConfig) as any,
        },
        preHandlers: [requestIdHandling, logHandling],
        postHandlers: [missingRouteHandling],
        errorHandler: errorHandler,
    })

    app.listen(appConfig.PORT)
    logger.log('info', 'Authentication Service started successfully')
}

/* istanbul ignore if */
if (require.main === module) {
    startAuthenticationService(config, dataSourceConfig)
}
