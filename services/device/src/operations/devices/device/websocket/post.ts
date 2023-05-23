import { deviceRepository } from '../../../../database/repositories/device'
import { postDevicesByDeviceIdWebsocketSignature } from '../../../../generated/signatures'
import { deviceUrlFromId } from '../../../../methods/urlFromId'
import {
    ImpossibleOperationError,
    MissingEntityError as _MissingEntityError,
    logger,
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
        logger.log('info', 'postDevicesByDeviceIdWebsocket called')

        const deviceModel = await deviceRepository.findOneOrFail({
            where: {
                uuid: parameters.device_id,
            },
        })

        if (deviceModel.type !== 'device')
            throw new ImpossibleOperationError(
                "A websocket token may only be requested for a device of type 'device'",
                400
            )

        deviceModel.token = randomUUID()
        await deviceRepository.save(deviceModel)

        setTimeout(async () => {
            logger.log(
                'info',
                `trying to delete websocket token of device '${deviceUrlFromId(
                    parameters.device_id
                )}'`
            )

            const deviceModel = await deviceRepository.findOne({
                where: {
                    uuid: parameters.device_id,
                },
            })

            if (!deviceModel) {
                logger.error(
                    'error',
                    `device '${deviceUrlFromId(parameters.device_id)}' does not exist`
                )
                return
            }

            if (deviceModel.type !== 'device') {
                logger.error(
                    'error',
                    `device '${deviceUrlFromId(parameters.device_id)}' has type '${
                        deviceModel.type
                    }' instead of 'device'`
                )
                return
            }

            deviceModel.token = undefined
            await deviceRepository.save(deviceModel)
        }, 300000)

        logger.log('info', 'postDevicesByDeviceIdWebsocket succeeded')

        return {
            status: 200,
            body: deviceModel.token,
        }
    }
