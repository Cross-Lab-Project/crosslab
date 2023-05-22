import { Migrations } from './database/migrations'
import { InstitutionModel } from './model'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'db/federation.db',
    entities: [InstitutionModel],
    migrations: Migrations,
    migrationsRun: true,
})
