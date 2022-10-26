import { APIClient } from '@cross-lab-project/api-client'
import { config } from './config'

export const apiClient = new APIClient(config.BASE_URL)
