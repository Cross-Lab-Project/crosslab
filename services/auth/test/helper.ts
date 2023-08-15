import {logger, logging} from "@crosslab/service-common";
import {init_database} from "../src/database/datasource";
import chai from "chai";
import chaiHttp from "chai-http";
import {init_app} from "../src/app";

chai.use(chaiHttp);
chai.should();

before(async () => {
  await logging.init();
  await init_app();
});

export async function resetDatabase() {
  await init_database({
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
  });
}

export function disable_logs(disable = true) {
  logger.silent = disable;
}
