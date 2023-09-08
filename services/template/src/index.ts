import app from './app';
import { config } from './config';
import { ApplicationDataSource } from './database/datasource';

async function initialize() {
  await ApplicationDataSource.initialize();

  app.listen(config.PORT);
}
initialize();
