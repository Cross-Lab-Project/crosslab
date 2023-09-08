import { DataSource } from 'typeorm';

import { Migration1690472270724 } from './migrations/1690472270724-migration';
import { RelationModel } from './model';

export const ApplicationDataSource = new DataSource({
  type: 'sqlite',
  database: 'db/authorization.db',
  entities: [RelationModel],
  migrationsRun: true,
  migrations: [Migration1690472270724],
});
