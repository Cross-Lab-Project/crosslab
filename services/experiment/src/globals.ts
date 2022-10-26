import { APIClient } from '@cross-lab-project/api-client'
import { config } from './config'

export const peerconnectionClosedCallbacks: string[] = []
export const deviceChangedCallbacks: string[] = []
export const apiClient: APIClient = new APIClient(config.BASE_URL)
export const callbackUrl: string = config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + 'experiments/callbacks'