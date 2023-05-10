import { config, dataSourceConfig } from './config'
import { AppDataSource, initializeDataSource } from './database/dataSource'
import { activeKeyRepository } from './database/repositories/activeKeyRepository'
import { app } from './generated'
import { parseAllowlist, resolveAllowlist } from './methods/allowlist'
import { apiClient } from './methods/api'
import { generateNewKey, jwk } from './methods/key'
import { AppConfiguration } from './types/types'
import { JWTVerify } from '@crosslab/service-common'
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
    const activeSigKey = await activeKeyRepository.findOne({
        where: {
            use: 'sig',
        },
    })
    const key = activeSigKey?.key ?? (await generateNewKey())
    const jwks = JSON.stringify({ keys: [jwk(key)] })

    if (!activeSigKey) {
        const activeKeyModel = await activeKeyRepository.create({
            use: key.use,
            key: key.uuid,
        })
        await activeKeyRepository.save(activeKeyModel)
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
    })

    app.listen(appConfig.PORT)
    console.log('Authentication Service started successfully')
}

/* istanbul ignore if */
if (require.main === module) {
    startAuthenticationService(config, dataSourceConfig)
}
