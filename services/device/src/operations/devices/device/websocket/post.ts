import { deviceRepository } from '../../../../database/repositories/device'
import { postDevicesByDeviceIdWebsocketSignature } from '../../../../generated/signatures'
import {
    ForbiddenOperationError,
    MissingEntityError as _MissingEntityError,
} from '@crosslab/service-common'
import { randomUUID } from 'crypto'

/**
 * This function implements the functionality for handling POST requests on /devices/{device_id}/token endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 * @throws {_MissingEntityError} Thrown if device is not found in the database.
 */
export const postDevicesByDeviceIdWebsocket: postDevicesByDeviceIdWebsocketSignature =
    async (parameters, _user) => {
        console.log(`postDevicesByDeviceIdWebsocket called`)

        const deviceModel = await deviceRepository.findOneOrFail({
            where: {
                uuid: parameters.device_id,
            },
        })

        if (deviceModel.type !== 'device')
            throw new ForbiddenOperationError(
                "A websocket token may only be requested for a device of type 'device'",
                400
            )

        deviceModel.token = randomUUID()
        await deviceRepository.save(deviceModel)

        setTimeout(async () => {
            deviceModel.token = undefined
            await deviceRepository.save(deviceModel)
        }, 300000)

        console.log(`postDevicesByDeviceIdWebsocket succeeded`)

        return {
            status: 200,
            body: deviceModel.token,
        }
    }
