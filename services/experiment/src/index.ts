import app from './app'
import { config } from './config'
import { init_database } from './database/dataSource'
import { logger } from '@crosslab/service-common'

async function startExperimentService() {
    await init_database()

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
