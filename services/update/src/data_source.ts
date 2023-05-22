import { Migrations } from './database/migrations'
import { UpdateInformationModel } from './model'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'db/update.db',
    entities: [UpdateInformationModel],
    migrations: Migrations,
    migrationsRun: true,
})
