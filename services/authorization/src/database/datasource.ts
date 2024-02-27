import { DataSource, DataSourceOptions } from 'typeorm';

import { config } from '../config.js';
import { Migrations } from './migrations/index.js';
import { Entities } from './model.js';

export let ApplicationDataSource: DataSource = new DataSource({
  ...config.orm,
  migrations: [...Migrations],
  migrationsRun: true,
  entities: Entities,
});

export async function init_database(dataSourceConfig?: DataSourceOptions) {
  ApplicationDataSource = new DataSource(
    dataSourceConfig
      ? { ...dataSourceConfig, entities: Entities }
      : {
          ...config.orm,
          migrations: [...Migrations],
          migrationsRun: true,
          entities: Entities,
        },
  );
  await ApplicationDataSource.initialize();
}
