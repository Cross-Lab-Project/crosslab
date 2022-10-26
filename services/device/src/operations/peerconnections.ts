import { AppDataSource } from '../data_source'
import {
    getPeerconnectionsSignature,
    postPeerconnectionsSignature,
    getPeerconnectionsByPeerconnectionIdSignature,
    deletePeerconnectionsByPeerconnectionIdSignature,
} from '../generated/signatures/peerconnections'
import {
    ClosePeerconnectionMessage,
    CreatePeerconnectionMessage,
} from '../generated/types'
import { apiClient } from '../globals'
import { closedCallbacks, handleClosedCallback } from '../methods/callbacks'
import { formatPeerconnectionOverview, formatServiceConfig } from '../methods/format'
import { peerconnectionUrlFromId } from '../methods/utils'
import { writePeerconnection } from '../methods/write'
import { PeerconnectionModel } from '../model'
import { InconsistentDatabaseError, MissingEntityError } from '../types/errors'

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

    const common = <CreatePeerconnectionMessage>{
        messageType: 'command',
        command: 'createPeerconnection',
        connectionType: 'webrtc',
        connectionUrl: peerconnectionUrlFromId(peerconnection.uuid),
    }

    const createPeerConnectionMessageA: CreatePeerconnectionMessage = {
        ...common,
        services: peerconnection.deviceA.config
            ? peerconnection.deviceA.config.map(formatServiceConfig)
            : [],
        tiebreaker: false,
    }

    const createPeerConnectionMessageB: CreatePeerconnectionMessage = {
        ...common,
        services: peerconnection.deviceB.config
            ? peerconnection.deviceB.config.map(formatServiceConfig)
            : [],
        tiebreaker: true,
    }

    apiClient.sendSignalingMessage(
        peerconnection.deviceA.url,
        peerconnectionUrlFromId(peerconnection.uuid),
        createPeerConnectionMessageA
    )

    apiClient.sendSignalingMessage(
        peerconnection.deviceB.url,
        peerconnectionUrlFromId(peerconnection.uuid),
        createPeerConnectionMessageB
    )

    if (parameters.closedUrl) {
        console.log(
            `postPeerconnections: registering closed-callback for ${parameters.closedUrl}`
        )
        const closedCallbackURLs = closedCallbacks.get(peerconnection.uuid) ?? []
        closedCallbackURLs.push(parameters.closedUrl)
        closedCallbacks.set(peerconnection.uuid, closedCallbackURLs)
    }

    console.log(`postPeerconnections succeeded`)

    return {
        status: 201,
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
                'Deleted Multiple Peerconnection with same uuid',
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

        handleClosedCallback(peerconnection)

        console.log(`deletePeerconnectionsByPeerconnectionId succeeded`)

        return {
            status: 204,
        }
    }
