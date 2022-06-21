import { config } from './config'
import { AppDataSource } from './data_source'
import { app } from './generated/index'

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        app.initService({JWTVerify: (_jwt, _scopes) => {return {username: "testuser"}}})
        app.listen(config.PORT)
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })