import { AppDataSource } from '../../data_source'
import {
    isConcreteDevice,
    isDeviceGroup,
    isInstantiableBrowserDevice,
    isInstantiableCloudDevice,
} from '../../generated/types'
import {
    ConcreteDeviceModel,
    DeviceGroupModel,
    InstantiableBrowserDeviceModel,
    InstantiableCloudDeviceModel,
} from '../../model'
import { InvalidValueError } from '../../types/errors'
import {
    DeviceTypeName,
    DeviceModelFromName,
    WriteDeviceFromModel,
    DeviceModel,
} from '../../types/helper'
import {
    writeConcreteDevice,
    writeDeviceGroup,
    writeInstantiableBrowserDevice,
    writeInstantiableCloudDevice,
} from './write'

/**
 * This function attempts to create a device model with a given type.
 * @param type The type of device model to create.
 * @throws {InvalidValueError} Thrown if the given type does not match any known device type.
 * @returns The created device model.
 */
export function createDeviceModel<T extends DeviceTypeName>(
    type: T
): DeviceModelFromName<T> {
    switch (type) {
        case 'device':
            return AppDataSource.getRepository(
                ConcreteDeviceModel
            ).create() as DeviceModelFromName<T>
        case 'group':
            return AppDataSource.getRepository(
                DeviceGroupModel
            ).create() as DeviceModelFromName<T>
        case 'edge instantiable':
            return AppDataSource.getRepository(
                InstantiableBrowserDeviceModel
            ).create() as DeviceModelFromName<T>
        case 'cloud instantiable':
            return AppDataSource.getRepository(
                InstantiableCloudDeviceModel
            ).create() as DeviceModelFromName<T>
        default:
            throw new InvalidValueError(
                'The given type does not match any known device type',
                500
            )
    }
}

/**
 * This function attempts to create a device model with the data provided.
 * @param data The provided data in the form of a device.
 * @throws {InvalidValueError} Thrown if the type of the device does not match any known device type
 * @returns The created device model.
 */
export function createDeviceModelFromDevice<T extends DeviceModel>(
    data: WriteDeviceFromModel<T>
): T {
    if (isConcreteDevice(data)) {
        const deviceModel = createDeviceModel('device')
        writeConcreteDevice(deviceModel, data)
        return deviceModel as T
    } else if (isDeviceGroup(data)) {
        const deviceModel = createDeviceModel('group')
        writeDeviceGroup(deviceModel, data)
        return deviceModel as T
    } else if (isInstantiableBrowserDevice(data)) {
        const deviceModel = createDeviceModel('edge instantiable')
        writeInstantiableBrowserDevice(deviceModel, data)
        return deviceModel as T
    } else if (isInstantiableCloudDevice(data)) {
        const deviceModel = createDeviceModel('cloud instantiable')
        writeInstantiableCloudDevice(deviceModel, data)
        return deviceModel as T
    } else {
        throw new InvalidValueError(
            'The device does not match any known device type',
            500
        )
    }
}
