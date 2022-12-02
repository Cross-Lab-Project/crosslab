import { AppDataSource } from '../data_source'
import { CreatePeerconnectionMessage } from '../generated/types'
import { apiClient } from '../globals'
import { PeerconnectionModel } from '../model'
import { sendStatusChangedCallback } from './callbacks'
import { formatServiceConfig } from './database/format'
import { peerconnectionUrlFromId } from './utils'

/**
 * This function starts the signaling process for a peerconnection.
 * @param peerconnection The peerconnection the signaling process should be started for.
 * @throws Throws errors of the {@link apiClient.sendSignalingMessage | sendSignalingMessage()} function of the api-client.
 */
export async function startSignaling(peerconnection: PeerconnectionModel) {
    const common = <CreatePeerconnectionMessage>{
        messageType: 'command',
        command: 'createPeerconnection',
        connectionType: 'webrtc',
        connectionUrl: peerconnectionUrlFromId(peerconnection.uuid),
    }

    const createPeerConnectionMessageA: CreatePeerconnectionMessage = {
        ...common,
        services: peerconnection.deviceA.config
            ? peerconnection.deviceA.config.map(formatServiceConfig) as any
            : [],
        tiebreaker: false,
    }

    const createPeerConnectionMessageB: CreatePeerconnectionMessage = {
        ...common,
        services: peerconnection.deviceB.config
            ? peerconnection.deviceB.config.map(formatServiceConfig) as any
            : [],
        tiebreaker: true,
    }

    await apiClient.sendSignalingMessage(
        peerconnection.deviceA.url,
        createPeerConnectionMessageA,
        peerconnectionUrlFromId(peerconnection.uuid)
    )

    await apiClient.sendSignalingMessage(
        peerconnection.deviceB.url,
        createPeerConnectionMessageB,
        peerconnectionUrlFromId(peerconnection.uuid)
    )

    // NOTE: this behaviour should maybe be changed later on
    peerconnection.status = 'connected'
    await AppDataSource.getRepository(PeerconnectionModel).save(peerconnection)

    sendStatusChangedCallback(peerconnection)
}
