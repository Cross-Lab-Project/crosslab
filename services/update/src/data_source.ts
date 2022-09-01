import { DataSource } from 'typeorm'
import { UpdateInformationModel } from './model'

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'db/device.db',
    synchronize: true,
    entities: [UpdateInformationModel],
})
