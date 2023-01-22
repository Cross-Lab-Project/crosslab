import { APIClient } from '@cross-lab-project/api-client'
import { config } from './config'

export type PendingPeerconnectionModel = {
    peerconnectionId: string
    deviceA: string
    deviceB: string
    timeout: NodeJS.Timeout
}

export const apiClient = new APIClient(config.BASE_URL)
export const YEAR = 365 * 24 * 60 * 60 * 1000
export const timeoutMap: Map<string, NodeJS.Timeout> = new Map()
