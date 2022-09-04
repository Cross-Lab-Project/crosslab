import { APIClient } from '@cross-lab-project/api-client'
import { config } from './config'

export const peerconnectionClosedCallbacks: string[] = []
export const apiClient: APIClient = new APIClient(config.BASE_URL)
