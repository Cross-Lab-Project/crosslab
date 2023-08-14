#!/usr/bin/env node
import {init_app} from "./app";
import {config} from "./config";
import {init_database} from "./database/datasource";
import {logging} from "@crosslab/service-common";

async function initialize() {
  await init_database();
  logging.init();
  const app = init_app();
  app.listen(config.PORT);
  logging.logger.log("info", "Authentication Service started successfully");
}

initialize();
