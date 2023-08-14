#!/usr/bin/env node
import app from "./app";
import {config} from "./config";
import {init_database} from "./database/datasource";
import {logger} from "@crosslab/service-common";

async function initialize() {
  await init_database();
  app.listen(config.PORT);
  logger.log("info", "Authentication Service started successfully");
}

initialize();
