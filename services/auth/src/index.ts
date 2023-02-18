#!/usr/bin/env node

import { config, dataSourceConfig } from './config'
import { AppDataSource, initializeDataSource } from './database/dataSource'
import { app } from './generated'
import { generateNewKey, jwk } from './methods/key'
import { JWTVerify } from '@crosslab/service-common'
import { activeKeyRepository } from './database/repositories/activeKeyRepository'
import { parseAllowlist, resolveAllowlist } from './methods/allowlist'
import { AppConfiguration } from './types/types'
import { DataSourceOptions } from 'typeorm'

async function startAuthenticationService(
    config: AppConfiguration,
    dataSourceConfig: DataSourceOptions
) {
    await AppDataSource.initialize(dataSourceConfig)
    await initializeDataSource()

    const allowlist = parseAllowlist(config.ALLOWLIST)

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

    app.get('/.well-known/jwks.json', (_req, res, _next) => {
        res.send(jwks)
    })
    app.get('/.well-known/openid-configuration', (_req, res, _next) => {
        res.send({ jwks_uri: '/.well-known/jwks.json' })
    })
    app.initService({
        security: {
            JWT: JWTVerify(config) as any,
        },
    })

    app.listen(config.PORT)
    console.log('Authentication Service started successfully')
}

/* istanbul ignore if */
if (require.main === module) {
    startAuthenticationService(config, dataSourceConfig)
}
