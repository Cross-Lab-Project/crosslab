import {logging} from "@crosslab/service-common";
import {init_database} from "../src/database/datasource";
import chai from "chai";
import chaiHttp from "chai-http";
import {init_app} from "../src/app";
import {Server} from "http";

chai.use(chaiHttp);
chai.should();

let server: Server;
before(async () => {
  logging.init({LOGGING: "fatal"});
  const app = init_app();
  server = app.listen(3000);
});

after(() => {
  server.close();
});

export async function resetDatabase() {
  await init_database({
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
  });
}
