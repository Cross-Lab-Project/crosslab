import { repositories } from '../../database/dataSource'
import {
    ClosePeerconnectionMessage,
    CreatePeerconnectionMessage,
    SignalingMessage,
} from '../../generated/types'
import { peerconnectionUrlFromId } from '../urlFromId'
import { SignalingQueue } from './signalingQueue'
import { MissingEntityError, logger } from '@crosslab/service-common'

export class SignalingQueueManager {
    private queueMap: Map<
        string,
        {
            deviceA: { url: string; queue: SignalingQueue }
            deviceB: { url: string; queue: SignalingQueue }
            onClose?: () => void
        }
    >

    constructor() {
        this.queueMap = new Map()
    }

    public setOnCloseHandler(peerconnectionId: string, onClose: () => void) {
        const peerconnectionUrl = peerconnectionUrlFromId(peerconnectionId)
        const queues = this.queueMap.get(peerconnectionUrl)

        if (!queues)
            throw new MissingEntityError(
                `Peerconnection '${peerconnectionUrl}' does not have any associated signaling queues`,
                404
            )

        queues.onClose = () => {
            onClose()
            this.queueMap.delete(peerconnectionId)
        }
    }

    public async createSignalingQueues(peerconnectionId: string) {
        const peerconnectionUrl = peerconnectionUrlFromId(peerconnectionId)

        logger.log(
            'info',
            `Trying to create signaling queues for peerconnection '${peerconnectionUrl}'`
        )

        // TODO: change to more meaningful error
        if (this.queueMap.has(peerconnectionUrl))
            throw new Error(
                `Peerconnection '${peerconnectionUrl}' already has signaling queues`
            )

        const peerconnectionModel = await repositories.peerconnection.findOneOrFail({
            where: {
                uuid: peerconnectionId,
            },
        })

        if (peerconnectionModel.status !== 'new') {
            logger.log(
                'info',
                `Status of peerconnection '${peerconnectionUrl}' is not 'new', '${peerconnectionModel.status}'`
            )
            return
        }

        // create SignalingQueues
        const queueDeviceA = new SignalingQueue(
            peerconnectionUrl,
            peerconnectionModel.deviceA.url
        )

        const queueDeviceB = new SignalingQueue(
            peerconnectionUrl,
            peerconnectionModel.deviceB.url
        )

        // register onClose handlers
        queueDeviceA.onClose = () => {
            const queues = this.queueMap.get(peerconnectionUrl)
            if (
                queues?.deviceB.queue.state === 'peerconnection-closed' &&
                queues.onClose
            ) {
                queues.onClose()
                this.queueMap.delete(peerconnectionUrl)
            }
        }

        queueDeviceB.onClose = () => {
            const queues = this.queueMap.get(peerconnectionUrl)
            if (
                queues?.deviceA.queue.state === 'peerconnection-closed' &&
                queues.onClose
            ) {
                queues.onClose()
                this.queueMap.delete(peerconnectionUrl)
            }
        }

        // prepare createPeerconnection messages
        const common = <CreatePeerconnectionMessage>{
            messageType: 'command',
            command: 'createPeerconnection',
            connectionType: peerconnectionModel.type,
            connectionUrl: peerconnectionUrl,
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

        // add createPeerconnection messages
        queueDeviceA.add(createPeerConnectionMessageA)
        queueDeviceB.add(createPeerConnectionMessageB)

        this.queueMap.set(peerconnectionUrl, {
            deviceA: { url: peerconnectionModel.deviceA.url, queue: queueDeviceA },
            deviceB: { url: peerconnectionModel.deviceB.url, queue: queueDeviceB },
        })

        logger.log(
            'info',
            `Successfully created signaling queues for peerconnection '${peerconnectionUrl}'`
        )
    }

    public startSignalingQueues(peerconnectionId: string) {
        const peerconnectionUrl = peerconnectionUrlFromId(peerconnectionId)
        const queues = this.queueMap.get(peerconnectionUrl)

        if (!queues)
            throw new MissingEntityError(
                `Peerconnection '${peerconnectionUrl}' does not have any associated signaling queues`,
                404
            )

        queues.deviceA.queue.start()
        queues.deviceB.queue.start()
    }

    public stopSignalingQueues(peerconnectionId: string) {
        const peerconnectionUrl = peerconnectionUrlFromId(peerconnectionId)
        const queues = this.queueMap.get(peerconnectionUrl)

        if (!queues)
            throw new MissingEntityError(
                `Peerconnection '${peerconnectionUrl}' does not have any associated signaling queues`,
                404
            )

        queues.deviceA.queue.stop()
        queues.deviceB.queue.stop()
    }

    public addSignalingMessage(
        peerconnectionUrl: string,
        deviceUrl: string,
        signalingMessage:
            | CreatePeerconnectionMessage
            | ClosePeerconnectionMessage
            | SignalingMessage
    ) {
        const queues = this.queueMap.get(peerconnectionUrl)

        if (queues?.deviceA.url === deviceUrl)
            return queues.deviceA.queue.add(signalingMessage)
        if (queues?.deviceB.url === deviceUrl)
            return queues.deviceB.queue.add(signalingMessage)

        throw new MissingEntityError(
            `Peerconnection '${peerconnectionUrl}' does not have any associated signaling queue for device '${deviceUrl}'`,
            404
        )
    }

    public closeSignalingQueues(peerconnectionId: string) {
        const peerconnectionUrl = peerconnectionUrlFromId(peerconnectionId)
        const queues = this.queueMap.get(peerconnectionUrl)

        // TODO: change to more meaningful error
        if (!queues)
            throw new MissingEntityError(
                `Peerconnection '${peerconnectionUrl}' does not have any associated signaling queues`,
                404
            )

        const closePeerconnectionMessage: ClosePeerconnectionMessage = {
            messageType: 'command',
            command: 'closePeerconnection',
            connectionUrl: peerconnectionUrl,
        }

        if (queues.deviceA.queue.state === 'new' && queues.deviceA.queue.onClose)
            queues.deviceA.queue.onClose()
        else queues.deviceA.queue.add(closePeerconnectionMessage)

        if (queues.deviceB.queue.state === 'new' && queues.deviceB.queue.onClose)
            queues.deviceB.queue.onClose()
        else queues.deviceB.queue.add(closePeerconnectionMessage)
    }
}

export const signalingQueueManager = new SignalingQueueManager()
