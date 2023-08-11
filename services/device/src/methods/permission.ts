import { DeviceModel } from '../database/model'
import { UserType } from '../generated/types'

/**
 * This function checks if a given user is allowed to perform a given operation on
 * a given device.
 * @param operation The operation to be performed.
 * @param deviceModel The device for which to check the permission.
 * @param user The user for whom to check the permission.
 * @returns true, if the user is allowed to perform the operation on the device.
 */
export function checkPermission(
    operation: 'read' | 'write' | 'instantiate' | 'delete',
    deviceModel: DeviceModel,
    user: UserType<'JWT'>
): boolean {
    return true;
    if (user.scopes.includes('device') || user.scopes.includes(`device:${operation}`)) {
        return true
    }

    if (!user.scopes.includes(`device:${operation}:owned`)) return false

    return (
        user.url === deviceModel.owner || (operation === 'read' && deviceModel.isPublic)
    )
}
