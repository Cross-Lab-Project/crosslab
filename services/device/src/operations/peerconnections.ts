import { MissingEntityError, InvalidValueError, MissingPropertyError, InconsistentDatabaseError } from "@crosslab/service-common"
import { AppDataSource } from "../data_source"
import { getPeerconnectionsSignature, postPeerconnectionsSignature, getPeerconnectionsByPeerconnectionIdSignature, deletePeerconnectionsByPeerconnectionIdSignature } from "../generated/signatures"
import { ClosePeerconnectionMessage } from "../generated/types"
import { apiClient, timeoutMap } from "../globals"
import { callbackUrl, sendStatusChangedCallback, closedCallbacks, statusChangedCallbacks, sendClosedCallback } from "../methods/callbacks"
import { formatPeerconnectionOverview } from "../methods/database/format"
import { writePeerconnection } from "../methods/database/write"
import { startSignaling } from "../methods/signaling"
import { peerconnectionUrlFromId } from "../methods/utils"
import { PeerconnectionModel } from "../model"

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
        const n_deviceA = await apiClient.updateDevice(
            deviceA.url,
            {},
            { changedUrl: callbackUrl }
        )
        const n_deviceB = await apiClient.updateDevice(
            deviceB.url,
            {},
            { changedUrl: callbackUrl }
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
        timeoutMap.set(
            peerconnection.uuid, 
            setTimeout(async () => {
                console.log('devices did not connect')
                peerconnection.status = 'failed'
                await peerconnectionRepository.save(peerconnection)
                await sendStatusChangedCallback(peerconnection)
            }, 30000)
        )
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
            closePeerconnectionMessage,
            peerconnectionUrlFromId(peerconnection.uuid)
        )
        await apiClient.sendSignalingMessage(
            peerconnection.deviceB.url,
            closePeerconnectionMessage,
            peerconnectionUrlFromId(peerconnection.uuid)
        )

        await sendClosedCallback(peerconnection)

        console.log(`deletePeerconnectionsByPeerconnectionId succeeded`)

        return {
            status: 204,
        }
    }