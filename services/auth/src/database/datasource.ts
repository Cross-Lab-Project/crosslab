import { config } from '../config'
import { Migrations } from './migrations'
import { Entities, TokenModel, UserModel } from './model'
import { DataSource } from 'typeorm'

console.log(config.orm)

export const AppDataSource = new DataSource({
    ...config.orm,
    //migrations: [...Migrations],
    //migrationsRun: true,
    synchronize: true,
    entities: Entities,
})
export const repositories = {
    token: AppDataSource.getRepository(TokenModel),
    user: AppDataSource.getRepository(UserModel),
}
