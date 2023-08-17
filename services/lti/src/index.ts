import {logging} from "@crosslab/service-common";
import {init_app} from "./app";
import {ApplicationDataSource} from "./database/datasource";

async function startDeviceService() {
  logging.init();
  try {
    await ApplicationDataSource.initialize();
    await init_app();
    logging.logger.info("Device Service started successfully");
  } catch (e) {
    logging.logger.error(e);
  }
}

/* istanbul ignore if */
if (require.main === module) {
  startDeviceService();
}
