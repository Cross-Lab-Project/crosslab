#!/usr/bin/env node

import { ApplicationDataSource } from "./database/datasource";
import app from "./app";
import { openfga_init } from "./openfga";
import { opa_init } from "./opa";
import { config } from "./config";
import { logger } from "@crosslab/service-common";


async function initialize(){
    await ApplicationDataSource.initialize()
    await opa_init()
    await openfga_init()

    app.listen(config.PORT)
    logger.log('info', 'Authorization Service started successfully')
}
initialize()