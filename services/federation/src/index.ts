#!/usr/bin/env node

import { config } from './config'
import { AppDataSource } from './data_source'
import { app } from './generated/index'
import { JWTVerify } from '@crosslab/service-common'

AppDataSource.initialize()
    .then(() => {
        app.initService({
            security: {
                JWT: JWTVerify(config) as any
            }
        })
        app.listen(config.PORT)
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err)
    })
