import { repositories } from '../../../database/dataSource'
import { getDevicesByDeviceIdSignature } from '../../../generated/signatures'
import { DeviceOwnershipError, JWTVerify, logger } from '@crosslab/service-common'
import { checkPermission } from '../../../methods/permission'
import { config } from '../../../config'
import { UserType, isUserType } from '../../../generated/types'

function validatePayload(output: unknown): output is UserType<'JWT'> {
    return isUserType(output, 'JWT')
}

const validateExecuteFor = JWTVerify(config, validatePayload, (input: string) => input)

/**
 * This function implements the functionality for handling GET requests on /devices/{device_id} endpoint.
 * @param parameters The parameters of the request.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const getDevicesByDeviceId: getDevicesByDeviceIdSignature = async (
    parameters,
    user
) => {
    logger.log('info', 'getDevicesByDeviceId called')

    const executeForUser = parameters.execute_for
        ? await validateExecuteFor(parameters.execute_for, [])
        : undefined

    const deviceModel = await repositories.device.findOneOrFail({
        where: { uuid: parameters.device_id },
    })

    if (!checkPermission('read', deviceModel, user.JWT)) throw new DeviceOwnershipError()
    if (executeForUser)
        if (!checkPermission('read', deviceModel, executeForUser))
            throw new DeviceOwnershipError()

    logger.log('info', 'getDevicesByDeviceId succeeded')

    return {
        status: 200,
        body: await repositories.device.format(deviceModel, {
            flat_group: parameters.flat_group,
            execute_for: parameters.execute_for ?? user.JWT.jwt,
        }),
    }
}
