import { deviceRepository } from '../../../../database/repositories/device'
import { postDevicesByDeviceIdAvailabilitySignature } from '../../../../generated/signatures'
import { calculateAvailability } from '../../../../methods/availability'
import { sendChangedCallback } from '../../../../methods/callbacks'
import { ImpossibleOperationError } from '@crosslab/service-common'

const YEAR = 365 * 24 * 60 * 60 * 1000

/**
 * This function implements the functionality for handling POST requests on /devices/{device_id}/availability endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const postDevicesByDeviceIdAvailability: postDevicesByDeviceIdAvailabilitySignature =
    async (parameters, body, _user) => {
        console.log(`postDevicesByDeviceIdAvailability called`)

        const deviceModel = await deviceRepository.findOneOrFail({
            where: { uuid: parameters.device_id },
        })

        if (deviceModel.type !== 'device') {
            throw new ImpossibleOperationError(
                `Can only update the availability for a device of type 'device', not for type '${deviceModel.type}'`,
                400
            )
        }

        deviceModel.availabilityRules ??= []
        deviceModel.availabilityRules.push(...(body ?? []))

        const start = Date.now()
        const end = start + YEAR
        deviceModel.announcedAvailability = calculateAvailability(
            deviceModel.availabilityRules,
            start,
            end
        )

        await deviceRepository.save(deviceModel)
        await sendChangedCallback(deviceModel)

        console.log(`postDevicesByDeviceIdAvailability succeeded`)

        return {
            status: 200,
            body: deviceModel.announcedAvailability,
        }
    }
