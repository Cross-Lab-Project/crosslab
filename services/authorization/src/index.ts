#!/usr/bin/env node

import { ApplicationDataSource } from "./database/datasource";
import app from "./app";
import { openfga_init } from "./openfga";
import { opa_init } from "./opa";


async function initialize(){
    await ApplicationDataSource.initialize()
    await opa_init()
    await openfga_init()

    app.listen(3030, () => console.log('listening on port 3030'))
}
initialize()