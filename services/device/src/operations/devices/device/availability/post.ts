import { deviceRepository } from '../../../../database/repositories/device'
import { postDevicesByDeviceIdAvailabilitySignature } from '../../../../generated/signatures'
import { applyAvailabilityRules } from '../../../../methods/availability'
import { sendChangedCallback } from '../../../../methods/callbacks'
import { ForbiddenOperationError } from '@crosslab/service-common'

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
        const device = await deviceRepository.findOneOrFail({
            where: { uuid: parameters.device_id },
        })

        if (device.type !== 'device') {
            throw new ForbiddenOperationError(
                `Can only the availability for a device of type 'device', not for type '${device.type}'`
            )
        }

        device.availabilityRules ??= []
        device.availabilityRules.push(...(body ?? []))

        device.announcedAvailability = []
        const start = Date.now()
        const end = start + YEAR
        device.announcedAvailability = applyAvailabilityRules(
            device.announcedAvailability,
            device.availabilityRules,
            start,
            end
        )

        await deviceRepository.save(device)
        await sendChangedCallback(device)

        console.log(`postDevicesByDeviceIdAvailability succeeded`)

        return {
            status: 200,
            body: device.announcedAvailability,
        }
    }
