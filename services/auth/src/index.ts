#!/usr/bin/env node

import { config, dataSourceConfig } from './config'
import { AppDataSource, initializeDataSource } from './database/dataSource'
import { app } from './generated'
import { generateNewKey, jwk } from './methods/key'
import { JWTVerify } from '@crosslab/service-common'
import { activeKeyRepository } from './database/repositories/activeKeyRepository'
import { parseAllowlist, resolveAllowlist } from './methods/allowlist'

AppDataSource.initialize(dataSourceConfig)
    .then(async () => {
        await initializeDataSource()

        const allowlist = process.env.ALLOWLIST ? parseAllowlist(process.env.ALLOWLIST) : []

        // Resolve Allowlist
        await resolveAllowlist(allowlist)
        setInterval(resolveAllowlist, 600000, allowlist)

        // Create new active key
        const key = await generateNewKey()
        const jwks = JSON.stringify({ keys: [jwk(key)] })
        for (const activeKey of await activeKeyRepository.find({})) {
            await activeKeyRepository.remove(activeKey)
        }

        const activeKeyModel = await activeKeyRepository.create({
            use: key.use,
            key: key.uuid
        })

        await activeKeyRepository.save(activeKeyModel)

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
