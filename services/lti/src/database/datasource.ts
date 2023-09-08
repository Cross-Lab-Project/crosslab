import { DataSource } from 'typeorm';

import { Migration1691157818867 } from './migrations/1691157818867-migration.js';
import { PlatformModel } from './model.js';

//import { RelationModel } from "./model.js";

export const ApplicationDataSource = new DataSource({
  type: 'sqlite',
  database: 'db/authorization.db',
  entities: [PlatformModel],
  migrationsRun: true,
  migrations: [Migration1691157818867],
});
