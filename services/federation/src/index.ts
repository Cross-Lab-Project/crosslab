var cors = require('cors')
import { config } from './config'
import { AppDataSource } from './data_source'
import { app } from './generated/index'

AppDataSource.initialize()
    .then(() => {
        app.use(cors())
        app.initService({JWTVerify: (_jwt, _scopes)=>{return {user: "testuser"}}})
        app.listen(config.PORT)
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })