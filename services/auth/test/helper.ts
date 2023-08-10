import {logger} from "@crosslab/service-common";
import {init_database} from "../src/database/datasource";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
chai.should();

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
