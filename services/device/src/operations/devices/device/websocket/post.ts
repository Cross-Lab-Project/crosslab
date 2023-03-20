import { MissingEntityError } from "@crosslab/service-common"
import { randomUUID } from "crypto"
import { AppDataSource } from "../../../../database/dataSource"
import { ConcreteDeviceModel } from "../../../../database/model"
import { postDevicesByDeviceIdWebsocketSignature } from "../../../../generated/signatures"

/**
 * This function implements the functionality for handling POST requests on /devices/{device_id}/token endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const postDevicesByDeviceIdWebsocket: postDevicesByDeviceIdWebsocketSignature =
    async (parameters, _user) => {
        console.log(`postDevicesByDeviceIdToken called`)
        const deviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
        const device = await deviceRepository.findOneBy({ uuid: parameters.device_id })

        if (!device)
            throw new MissingEntityError(
                `Could not find device ${parameters.device_id}`,
                404
            )

        device.token = randomUUID()
        await deviceRepository.save(device)

        setTimeout(async () => {
            device.token = undefined
            await deviceRepository.save(device)
        }, 300000)

        console.log(`postDevicesByDeviceIdToken succeeded`)

        return {
            status: 200,
            body: device.token,
        }
    }