import { AppDataSource } from '../data_source'
import {
    getPeerconnectionsSignature,
    postPeerconnectionsSignature,
    getPeerconnectionsByPeerconnectionIdSignature,
    deletePeerconnectionsByPeerconnectionIdSignature,
} from '../generated/signatures/peerconnections'
import { ClosePeerconnectionMessage } from '../generated/types'
import { apiClient, peerconnectionsCallbackUrl, pendingPeerconnections } from '../globals'
import {
    closedCallbacks,
    sendClosedCallback,
    statusChangedCallbacks,
} from '../methods/callbacks'
import { formatPeerconnectionOverview } from '../methods/database/format'
import { peerconnectionUrlFromId } from '../methods/utils'
import { writePeerconnection } from '../methods/database/write'
import { PeerconnectionModel } from '../model'
import {
    InconsistentDatabaseError,
    InvalidValueError,
    MissingEntityError,
    MissingPropertyError,
} from '../types/errors'
import { startSignaling } from '../methods/signaling'

/**
 * This function implements the functionality for handling GET requests on /peerconnections endpoint.
 * @param _user The user submitting the request.
 */
export const getPeerconnections: getPeerconnectionsSignature = async (_user) => {
    console.log(`getPeerconnections called`)
    const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
    const peerconnections = await peerconnectionRepository.find({
        relations: {
            deviceA: true,
            deviceB: true,
        },
    })

    console.log(`getPeerconnections succeeded`)

    return {
        status: 200,
        body: peerconnections.map(formatPeerconnectionOverview),
    }
}

/**
 * This function implements the functionality for handling POST requests on /peerconnections endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 */
export const postPeerconnections: postPeerconnectionsSignature = async (
    parameters,
    body,
    _user
) => {
    console.log(`postPeerconnections called`)
    const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
    const peerconnection = peerconnectionRepository.create()
    await writePeerconnection(peerconnection, body)

    if (!peerconnection.deviceA.url || !peerconnection.deviceB.url) {
        throw new MissingEntityError(`One of the participating devices has no url`, 404)
    }

    await peerconnectionRepository.save(peerconnection)

    const deviceA = await apiClient.getDevice(peerconnection.deviceA.url)
    const deviceB = await apiClient.getDevice(peerconnection.deviceB.url)

    if (deviceA.type !== 'device' || deviceB.type !== 'device') {
        throw new InvalidValueError(
            `Cannot establish a peerconnection between devices of type "${deviceA.type}" and "${deviceB.type}"`,
            400
        )
    }

    if (!deviceA.url || !deviceB.url) {
        throw new MissingPropertyError(
            `One of the resolved devices does not have an url`,
            500
        ) // NOTE: error code
    }

    if (deviceA.connected && deviceB.connected) {
        // peerconnection can be started directly
        await startSignaling(peerconnection)
    } else {
        // need to wait for devices to connect
        // register changed callbacks for devices to get notified when they connect
        const n_deviceA = await apiClient.patchDevice(
            deviceA.url,
            {},
            { changedUrl: peerconnectionsCallbackUrl }
        )
        const n_deviceB = await apiClient.patchDevice(
            deviceB.url,
            {},
            { changedUrl: peerconnectionsCallbackUrl }
        )

        // check that devices still have the correct type
        if (n_deviceA.type !== 'device' || n_deviceB.type !== 'device') {
            throw new InvalidValueError(
                `The type of device ${
                    deviceA.type !== 'device' ? deviceA.url : deviceB.url
                } is not "device" anymore`,
                400
            )
        }

        // set timeout for checking if devices are connected
        const timeout = setTimeout(() => {
            console.log('devices did not connect')
            peerconnection.status = 'failed'
            peerconnectionRepository.save(peerconnection)
        }, 30000)

        pendingPeerconnections.push({
            peerconnection: peerconnection,
            deviceA: n_deviceA,
            deviceB: n_deviceB,
            timeout: timeout,
        })
    }

    if (parameters.closedUrl) {
        console.log(
            `postPeerconnections: registering closed-callback for ${parameters.closedUrl}`
        )
        const closedCallbackURLs = closedCallbacks.get(peerconnection.uuid) ?? []
        closedCallbackURLs.push(parameters.closedUrl)
        closedCallbacks.set(peerconnection.uuid, closedCallbackURLs)
    }

    if (parameters.statusChangedUrl) {
        console.log(
            `postPeerconnections: registering status-changed-callback for ${parameters.statusChangedUrl}`
        )
        const statusChangedCallbackURLs =
            statusChangedCallbacks.get(peerconnection.uuid) ?? []
        statusChangedCallbackURLs.push(parameters.statusChangedUrl)
        statusChangedCallbacks.set(peerconnection.uuid, statusChangedCallbackURLs)
    }

    console.log(`postPeerconnections succeeded`)

    return {
        status: peerconnection.status === 'connected' ? 201 : 202,
        body: formatPeerconnectionOverview(peerconnection),
    }
}

/**
 * This function implements the functionality for handling GET requests on /peerconnections/{peerconnection_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 */
export const getPeerconnectionsByPeerconnectionId: getPeerconnectionsByPeerconnectionIdSignature =
    async (parameters, _user) => {
        console.log(`getPeerconnectionsByPeerconnectionId called`)
        const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
        const peerconnection = await peerconnectionRepository.findOne({
            where: {
                uuid: parameters.peerconnection_id,
            },
            relations: {
                deviceA: true,
                deviceB: true,
            },
        })

        if (!peerconnection)
            throw new MissingEntityError(
                `Could not find peerconnection ${parameters.peerconnection_id}`,
                404
            )

        console.log(`getPeerconnectionsByPeerconnectionId succeeded`)

        return {
            status: 200,
            body: formatPeerconnectionOverview(peerconnection),
        }
    }

/**
 * This function implements the functionality for handling DELETE requests on /peerconnection/{peerconnection_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 */
export const deletePeerconnectionsByPeerconnectionId: deletePeerconnectionsByPeerconnectionIdSignature =
    async (parameters, _user) => {
        console.log(`deletePeerconnectionsByPeerconnectionId called`)
        const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
        const peerconnection = await peerconnectionRepository.findOneOrFail({
            where: {
                uuid: parameters.peerconnection_id,
            },
            relations: {
                deviceA: true,
                deviceB: true,
            },
        })
        const result = await peerconnectionRepository.softDelete({
            uuid: parameters.peerconnection_id,
        })

        if (!result.affected) {
            throw new MissingEntityError(
                `Could not find peerconnection ${parameters.peerconnection_id}`,
                404
            )
        }

        if (result.affected > 1) {
            throw new InconsistentDatabaseError(
                'Deleted Multiple Peerconnections with same uuid',
                500
            )
        }

        const closePeerconnectionMessage: ClosePeerconnectionMessage = {
            messageType: 'command',
            command: 'closePeerconnection',
            connectionUrl: peerconnectionUrlFromId(peerconnection.uuid),
        }

        await apiClient.sendSignalingMessage(
            peerconnection.deviceA.url,
            peerconnectionUrlFromId(peerconnection.uuid),
            closePeerconnectionMessage
        )
        await apiClient.sendSignalingMessage(
            peerconnection.deviceB.url,
            peerconnectionUrlFromId(peerconnection.uuid),
            closePeerconnectionMessage
        )

        sendClosedCallback(peerconnection)

        console.log(`deletePeerconnectionsByPeerconnectionId succeeded`)

        return {
            status: 204,
        }
    }
