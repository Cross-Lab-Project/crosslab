import { AppDataSource } from '../../data_source'
import {
    ConcreteDeviceModel,
    DeviceGroupModel,
    InstantiableBrowserDeviceModel,
    InstantiableCloudDeviceModel,
} from '../../model'
import { InconsistentDatabaseError } from '../../types/errors'
import { DeviceModel } from '../../types/helper'

/**
 * This function retrieves a device from the database by its UUID.
 * @param uuid The UUID of the device to be retrieved.
 * @throws {InconsistentDatabaseError} Thrown if device is found as multiple types.
 * @returns The retrieved device.
 */
export async function findDeviceModelByUUID(
    uuid: string
): Promise<DeviceModel | undefined> {
    const concreteDeviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
    const deviceGroupRepository = AppDataSource.getRepository(DeviceGroupModel)
    const instantiableBrowserDeviceRepository = AppDataSource.getRepository(
        InstantiableBrowserDeviceModel
    )
    const instantiableCloudDeviceRepository = AppDataSource.getRepository(
        InstantiableCloudDeviceModel
    )
    const concreteDevice = await concreteDeviceRepository.findOne({
        where: {
            uuid: uuid,
        },
        relations: {
            announcedAvailability: true,
        },
    })
    const deviceGroup = await deviceGroupRepository.findOne({
        where: {
            uuid: uuid,
        },
        relations: {
            devices: true,
        },
    })
    const instantiableBrowserDevice = await instantiableBrowserDeviceRepository.findOne({
        where: {
            uuid: uuid,
        },
        relations: {
            instances: true,
        },
    })
    const instantiableCloudDevice = await instantiableCloudDeviceRepository.findOne({
        where: {
            uuid: uuid,
        },
        relations: {
            instances: true,
        },
    })

    if (
        (concreteDevice && deviceGroup) ||
        (concreteDevice && instantiableBrowserDevice) ||
        (concreteDevice && instantiableCloudDevice) ||
        (deviceGroup && instantiableBrowserDevice) ||
        (deviceGroup && instantiableCloudDevice) ||
        (instantiableBrowserDevice && instantiableCloudDevice)
    )
        throw new InconsistentDatabaseError('Multiple devices found for same uuid')

    if (concreteDevice) return concreteDevice
    if (deviceGroup) return deviceGroup
    if (instantiableBrowserDevice) return instantiableBrowserDevice
    if (instantiableCloudDevice) return instantiableCloudDevice
    return undefined
}
