#!/usr/bin/env node

import { config, dataSourceConfig } from './config'
import { AppDataSource, initializeDataSource } from './database/data_source'
import { app } from './generated'
import { ActiveKeyModel } from './database/model'
import { generateNewKey, jwk, resolveAllowlist } from './methods/utils'

import { JWTVerify } from '@crosslab/service-common'

AppDataSource.initialize(dataSourceConfig)
    .then(async () => {
        await initializeDataSource()

        // Resolve Allowlist
        resolveAllowlist(config)
        setInterval(resolveAllowlist, 600000, config)

        // Create new active key
        const activeKeyRepository = AppDataSource.getRepository(ActiveKeyModel)
        const key = await generateNewKey()
        const jwks = JSON.stringify({ keys: [jwk(key)] })
        for (const activeKey of await activeKeyRepository.find()) {
            await activeKeyRepository.delete(activeKey)
        }
        const activeKey = activeKeyRepository.create()
        activeKey.key = key
        activeKey.use = key.use
        await activeKeyRepository.save(activeKey)

        app.get('/.well-known/jwks.json', (_req, res, _next) => {
            res.send(jwks)
        })
        app.get('/.well-known/openid-configuration', (_req, res, _next) => {
            res.send({ jwks_uri: '/.well-known/jwks.json' })
        })
        app.initService({
            security: {
                JWT: JWTVerify(config) as any,
                AccessToken: (_req, _scopes) => {
                    throw new Error('Not Implemented')
                },
                TuiAuth: (_req, _scopes) => {
                    throw new Error('Not implemented')
                }
            }
        })
        app.listen(config.PORT)
        console.log('Initialization finished')
    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error)
    })
