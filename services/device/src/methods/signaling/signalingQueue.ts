import {
    CreatePeerconnectionMessage,
    ClosePeerconnectionMessage,
    SignalingMessage,
} from '../../generated/types'
import { apiClient } from '../../globals'
import { logger } from '@crosslab/service-common'
import Queue from 'queue'

export class SignalingQueue {
    private queue: Queue
    private deviceUrl: string
    private peerconnectionUrl: string
    private _state:
        | 'new'
        | 'started'
        | 'peerconnection-created'
        | 'peerconnection-closed' = 'new'
    private _isStopped = false
    private _onClose: () => void

    constructor(peerconnectionUrl: string, deviceUrl: string) {
        this.deviceUrl = deviceUrl
        this.peerconnectionUrl = peerconnectionUrl
        this.queue = new Queue({
            concurrency: 1,
        })
        this._onClose = () => {
            this.queue.end()
        }
    }

    public get state() {
        return this._state
    }

    public get isStopped() {
        return this._isStopped
    }

    public get onClose(): (() => void) | undefined {
        return this._onClose
    }

    public set onClose(onClose: (() => void) | undefined) {
        this._onClose = () => {
            this._state = 'peerconnection-closed'
            this.queue.end()
            if (onClose) onClose()
        }
    }

    public add(
        signalingMessage:
            | CreatePeerconnectionMessage
            | ClosePeerconnectionMessage
            | SignalingMessage
    ) {
        this.queue.push(async () => {
            await this.sendSignalingMessage(signalingMessage)

            if (signalingMessage.messageType === 'command') {
                switch (signalingMessage.command) {
                    case 'createPeerconnection':
                        this._state = 'peerconnection-created'
                        break
                    case 'closePeerconnection':
                        this._state = 'peerconnection-closed'
                        this._onClose()
                        break
                }
            }
        })

        if (
            (this.state === 'peerconnection-created' || this.state === 'started') &&
            !this._isStopped
        )
            this.start()
    }

    private async sendSignalingMessage(
        signalingMessage:
            | CreatePeerconnectionMessage
            | ClosePeerconnectionMessage
            | SignalingMessage
    ) {
        try {
            await apiClient.sendSignalingMessage(
                this.deviceUrl,
                signalingMessage,
                this.peerconnectionUrl
            )
        } catch (error) {
            logger.log(
                'error',
                'An error occurred while trying to send a signaling message',
                {
                    data: {
                        error,
                        message: signalingMessage,
                        targetDevice: this.deviceUrl,
                        peerconnection: this.peerconnectionUrl,
                    },
                }
            )
        }
    }

    public start() {
        this.queue.start((error) => {
            if (error)
                logger.log(
                    'error',
                    'An error occurred while processing a signaling message',
                    {
                        data: {
                            error,
                            targetDevice: this.deviceUrl,
                            peerconnection: this.peerconnectionUrl,
                        },
                    }
                )
        })
        this._isStopped = false
        if (this._state === 'new') this._state = 'started'
    }

    public stop() {
        this.queue.stop()
        this._isStopped = true
    }

    public isEmpty(): boolean {
        return this.queue.length === 0
    }
}
