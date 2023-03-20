import { connectedDevices } from '../..'
import { deviceRepository } from '../../../../database/repositories/device'
import { postDevicesByDeviceIdSignalingSignature } from '../../../../generated/signatures'
import { apiClient } from '../../../../globals'
import { deviceUrlFromId } from '../../../../methods/urlFromId'
import {
    ForbiddenOperationError,
    MissingPropertyError,
    UnrelatedPeerconnectionError,
    MissingEntityError,
} from '@crosslab/service-common'

/**
 * This function implements the functionality for handling POST requests on /devices/{device_id}/signaling endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database or if websocket for device is not found.
 * @throws {InvalidValueError} Thrown if type of device is not "device" or if device is not part of the peerconnection.
 */
export const postDevicesByDeviceIdSignaling: postDevicesByDeviceIdSignalingSignature =
    async (parameters, body, _user) => {
        console.log(`postDevicesByDeviceIdSignaling called`)

        // Get device
        const device = await deviceRepository.findOneOrFail({
            where: { uuid: parameters.device_id },
        })

        // Make sure device is a concrete device
        if (device.type !== 'device')
            throw new ForbiddenOperationError(
                `Cannot send signaling message to device with type ${device.type}`,
                400
            )

        // Retrieve peerconnection and make sure the device is taking part in it
        const peerconnection = await apiClient.getPeerconnection(
            parameters.peerconnection_url
        )
        if (!peerconnection.devices)
            throw new MissingPropertyError(
                `Peerconnection does not have any devices`,
                404
            )
        const deviceA = peerconnection.devices[0]
        const deviceB = peerconnection.devices[1]

        if (
            !(deviceA.url === deviceUrlFromId(device.uuid)) &&
            !(deviceB.url === deviceUrlFromId(device.uuid))
        ) {
            throw new UnrelatedPeerconnectionError(
                `Device is not part of the peerconnection`,
                400
            )
        }

        const ws = connectedDevices.get(parameters.device_id)

        if (!ws)
            throw new MissingEntityError(
                `Could not find websocket connection for device ${parameters.device_id}`,
                404
            )

        ws.send(JSON.stringify(body))

        console.log(`postDevicesByDeviceIdSignaling succeeded`)

        return {
            status: 200,
        }
    }
