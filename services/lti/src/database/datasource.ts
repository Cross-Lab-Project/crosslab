import { DataSource } from "typeorm";
import { PlatformModel } from "./model";
import { Migration1691157818867 } from "./migrations/1691157818867-migration";
//import { RelationModel } from "./model";

export const ApplicationDataSource = new DataSource({
    type: "sqlite",
    database: "db/authorization.db",
    entities: [PlatformModel],
    migrationsRun: true,
    migrations: [Migration1691157818867]
})