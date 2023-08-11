import app from './app'
import { config, dataSourceConfig } from './config'
import { AppDataSource } from './database/dataSource'
import { apiClient } from './methods/api'
import { logger } from '@crosslab/service-common'

async function startExperimentService() {
    await AppDataSource.initialize(dataSourceConfig)

    apiClient.accessToken = config.API_TOKEN

    app.get('/experiment/status', (_req, res) => {
        res.send({ status: 'ok' })
    })

    app.listen(config.PORT)

    logger.log('info', 'Experiment Service started successfully')
}

/** istanbul ignore if */
if (require.main === module) {
    startExperimentService()
}
