import { DataSource } from "typeorm";
import { RelationModel } from "./model";
import { Migration1690472270724 } from "./migrations/1690472270724-migration";

export const ApplicationDataSource = new DataSource({
    type: "sqlite",
    database: "db/authorization.db",
    entities: [RelationModel],
    migrationsRun: true,
    migrations: [Migration1690472270724],
})