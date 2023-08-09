import { config } from './config'
import { AppDataSource } from './database/datasource'
import {
    logger,
} from '@crosslab/service-common'
import app from './app'

async function startAuthenticationService(){
    await AppDataSource.initialize()
    app.listen(config.PORT)
    logger.log('info', 'Authentication Service started successfully')
}

/* istanbul ignore if */
if (require.main === module) {
    startAuthenticationService()
}
