import { dataSourceConfig } from '../config'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource(dataSourceConfig)
