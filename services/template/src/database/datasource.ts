import { DataSource } from 'typeorm';

import { RelationModel } from './model';

export const ApplicationDataSource = new DataSource({
  type: 'sqlite',
  database: 'db/authorization.db',
  entities: [RelationModel],
  migrationsRun: true,
  migrations: [],
});
