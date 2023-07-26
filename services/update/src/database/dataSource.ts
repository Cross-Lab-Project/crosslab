import { DataSource } from 'typeorm'
import { dataSourceConfig } from '../config'

export const AppDataSource = new DataSource(dataSourceConfig)
