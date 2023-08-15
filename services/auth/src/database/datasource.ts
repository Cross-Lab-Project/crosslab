import {config} from "../config";
import {Migrations} from "./migrations";
import {Entities} from "./model";
import {DataSource, DataSourceOptions} from "typeorm";

export let ApplicationDataSource: DataSource = new DataSource({
  ...config.orm,
  migrations: [...Migrations],
  migrationsRun: true,
  entities: Entities,
});

export async function init_database(dataSourceConfig?: DataSourceOptions) {
  ApplicationDataSource = new DataSource(
    dataSourceConfig
      ? {...dataSourceConfig, entities: Entities}
      : {
          ...config.orm,
          migrations: [...Migrations],
          migrationsRun: true,
          entities: Entities,
        },
  );
  await ApplicationDataSource.initialize();
}
