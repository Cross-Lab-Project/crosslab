import { openfga_deinit, openfga_init } from "../../src/openfga";
import { opa_deinit, opa_init } from "../../src/opa";
import { logger } from "@crosslab/service-common";
import { ApplicationDataSource } from "../../src/database/datasource";

export async function mochaGlobalSetup() {
    logger.transports.forEach((t) => (t.level = "error"))
    await ApplicationDataSource.initialize()
    await opa_init()
    await openfga_init()
}

export async function mochaGlobalTeardown() {
    opa_deinit()
    openfga_deinit()
}
  