import { logger } from "@crosslab/service-common/logging";
import {init_database} from "./database/dataSource";
import { logging} from "@crosslab/service-common";
import { init_app } from "./app";

async function startDeviceService() {
  logging.init();
  try {
    await init_database();
    await init_app();
    logger.info("Device Service started successfully");
  } catch (e) {
    logger.error(e);
  }
}

/* istanbul ignore if */
if (require.main === module) {
  startDeviceService();
}
