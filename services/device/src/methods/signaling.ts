import { AppDataSource } from '../database/dataSource'
import { PeerconnectionModel } from '../database/model'
import { CreatePeerconnectionMessage } from '../generated/types'
import { apiClient } from '../globals'
import { sendStatusChangedCallback } from './callbacks'
import { peerconnectionUrlFromId } from './utils'
import Queue from 'queue'

class SignalingQueue {
    private queue: Queue

    constructor() {
        this.queue = new Queue({
            autostart: true,
            concurrency: 1,
        })
    }

    public addPeerconnection(peerconnection: PeerconnectionModel) {
        this.queue.push(async function () {
            try {
                await startSignaling(peerconnection.uuid)
            } catch (error) {
                if (error instanceof Error) console.log(error.message)
                else console.log(error)
            }
        })
    }
}

export const signalingQueue = new SignalingQueue()

/**
 * This function starts the signaling process for a peerconnection.
 * @param peerconnection The peerconnection the signaling process should be started for.
 * @throws Throws errors of the {@link apiClient.sendSignalingMessage | sendSignalingMessage()} function of the api-client.
 */
async function startSignaling(peerconnectionId: string) {
    console.log(`Starting signaling for ${peerconnectionId}`)
    const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)

    const peerconnection = await peerconnectionRepository.findOneOrFail({
        where: {
            uuid: peerconnectionId,
        },
        relations: {
            deviceA: {
                config: true,
            },
            deviceB: {
                config: true,
            },
        },
    })

    if (peerconnection.status !== 'waiting-for-devices') {
        console.log(
            `status of peerconnection '${peerconnection.uuid}' is not 'waiting-for-devices', '${peerconnection.status}'`
        )
        return
    }

    const common = <CreatePeerconnectionMessage>{
        messageType: 'command',
        command: 'createPeerconnection',
        connectionType: 'webrtc',
        connectionUrl: peerconnectionUrlFromId(peerconnection.uuid),
    }

    const createPeerConnectionMessageA: CreatePeerconnectionMessage = {
        ...common,
        services: peerconnection.deviceA.config?.services
            ? peerconnection.deviceA.config.services
            : [],
        tiebreaker: false,
    }

    const createPeerConnectionMessageB: CreatePeerconnectionMessage = {
        ...common,
        services: peerconnection.deviceB.config?.services
            ? peerconnection.deviceB.config.services
            : [],
        tiebreaker: true,
    }

    // TODO: check what problems may occur here and address them accordingly
    const response1 = apiClient.sendSignalingMessage(
        peerconnection.deviceA.url,
        createPeerConnectionMessageA,
        peerconnectionUrlFromId(peerconnection.uuid)
    )

    const response2 = apiClient.sendSignalingMessage(
        peerconnection.deviceB.url,
        createPeerConnectionMessageB,
        peerconnectionUrlFromId(peerconnection.uuid)
    )

    await Promise.all([response1, response2])

    // NOTE: this behaviour should maybe be changed later on
    peerconnection.status = 'connected'
    await AppDataSource.getRepository(PeerconnectionModel).save(peerconnection)

    await sendStatusChangedCallback(peerconnection)
}
