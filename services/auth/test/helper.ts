import {logger} from "@crosslab/service-common";
import app from "../src/app";
import {init_database} from "../src/database/datasource";
import {postUsersRequestBodyType} from "../src/generated/operations";
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