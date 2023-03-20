import { config } from './config'
import { APIClient } from '@cross-lab-project/api-client'

export const apiClient = new APIClient(config.BASE_URL)
export const timeoutMap: Map<string, NodeJS.Timeout> = new Map()
