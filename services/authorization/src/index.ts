#!/usr/bin/env node

import { ApplicationDataSource } from "./database/datasource";
import app from "./app";
import { openfga_init } from "./openfga";
import { opa_init, opa_set_jwt_secret } from "./opa";
import { config } from "./config";
import { logger } from "@crosslab/service-common";


async function initialize(){
    await ApplicationDataSource.initialize()
    await opa_init()
    await openfga_init()
    await opa_set_jwt_secret(config.JWT_SECRET);

    app.listen(config.PORT)
    logger.log('info', 'Authorization Service started successfully')
}
initialize()