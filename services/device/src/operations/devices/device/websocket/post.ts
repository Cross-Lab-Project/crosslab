import { AppDataSource } from '../../../../database/dataSource'
import { ConcreteDeviceModel } from '../../../../database/model'
import { postDevicesByDeviceIdWebsocketSignature } from '../../../../generated/signatures'
import { randomUUID } from 'crypto'

/**
 * This function implements the functionality for handling POST requests on /devices/{device_id}/token endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const postDevicesByDeviceIdWebsocket: postDevicesByDeviceIdWebsocketSignature =
    async (parameters, _user) => {
        console.log(`postDevicesByDeviceIdWebsocket called`)

        const deviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
        const deviceModel = await deviceRepository.findOneByOrFail({
            uuid: parameters.device_id,
        })

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
