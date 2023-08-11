import {
    requestIdHandling,
    logHandling,
    errorHandler,
} from '@crosslab/service-common'

import express from 'express'
import { router } from './routes'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
requestIdHandling(app)
logHandling(app)

app.use(router)

app.get('/device/status', (_req, res) => {
    res.send({ status: 'ok' })
})

app.use(errorHandler)

export default app