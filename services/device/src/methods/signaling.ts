import { PeerconnectionModel } from '../database/model'
import { peerconnectionRepository } from '../database/repositories/peerconnection'
import { CreatePeerconnectionMessage } from '../generated/types'
import { apiClient } from '../globals'
import { peerconnectionUrlFromId } from './urlFromId'
import { logger } from '@crosslab/service-common'
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
                logger.log('error', 'An error occurred while trying to start signaling', {
                    data: {
                        error,
                        peerconnection: peerconnectionUrlFromId(peerconnection.uuid),
                    },
                })
            }
        })
    }

    public isEmpty(): boolean {
        return this.queue.length === 0
    }
}

export const signalingQueue = new SignalingQueue()

/**
 * This function starts the signaling process for a peerconnection.
 * @param peerconnection The peerconnection the signaling process should be started for.
 * @throws Throws errors of the {@link apiClient.sendSignalingMessage | sendSignalingMessage()} function of the api-client.
 */
async function startSignaling(peerconnectionId: string) {
    logger.log('info', 'Starting signaling for a peerconnection', {
        data: { peerconnection: peerconnectionUrlFromId(peerconnectionId) },
    })

    const peerconnectionModel = await peerconnectionRepository.findOneOrFail({
        where: {
            uuid: peerconnectionId,
        },
        // relations: {
        //     deviceA: {
        //         config: true,
        //     },
        //     deviceB: {
        //         config: true,
        //     },
        // },
    })

    if (peerconnectionModel.status !== 'new') {
        logger.log(
            'info',
            `status of peerconnection '${peerconnectionUrlFromId(
                peerconnectionModel.uuid
            )}' is not 'new', '${peerconnectionModel.status}'`
        )
        return
    }

    const common = <CreatePeerconnectionMessage>{
        messageType: 'command',
        command: 'createPeerconnection',
        connectionType: peerconnectionModel.type,
        connectionUrl: peerconnectionUrlFromId(peerconnectionModel.uuid),
    }

    const createPeerConnectionMessageA: CreatePeerconnectionMessage = {
        ...common,
        services: peerconnectionModel.deviceA.config?.services ?? [],
        tiebreaker: false,
    }

    const createPeerConnectionMessageB: CreatePeerconnectionMessage = {
        ...common,
        services: peerconnectionModel.deviceB.config?.services ?? [],
        tiebreaker: true,
    }

    // TODO: find out how to handle the different possible errors
    peerconnectionModel.status = 'connecting'
    await peerconnectionRepository.save(peerconnectionModel)

    await apiClient.sendSignalingMessage(
        peerconnectionModel.deviceA.url,
        createPeerConnectionMessageA,
        peerconnectionUrlFromId(peerconnectionModel.uuid)
    )

    await apiClient.sendSignalingMessage(
        peerconnectionModel.deviceB.url,
        createPeerConnectionMessageB,
        peerconnectionUrlFromId(peerconnectionModel.uuid)
    )
}
