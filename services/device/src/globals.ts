import { APIClient } from '@cross-lab-project/api-client'
import { config } from './config'
import { ConcreteDevice } from './generated/types'
import { PeerconnectionModel } from './model'

type PendingPeerconnectionModel = {
    peerconnection: PeerconnectionModel,
    deviceA: ConcreteDevice,
    deviceB: ConcreteDevice,
    timeout: NodeJS.Timeout
}

export const apiClient = new APIClient(config.BASE_URL)
export const YEAR = 365 * 24 * 60 * 60 * 1000
export const peerconnectionsCallbackUrl: string = config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + 'peerconnections/callbacks'
export const pendingPeerconnections: PendingPeerconnectionModel[] = []