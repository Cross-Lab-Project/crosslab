import { AppDataSource } from '../../data_source'
import {
    DeviceOverviewModel,
    isConcreteDeviceModel,
    ConcreteDeviceModel,
    isDeviceGroupModel,
    DeviceGroupModel,
    isInstantiableBrowserDeviceModel,
    InstantiableBrowserDeviceModel,
    isInstantiableCloudDeviceModel,
    InstantiableCloudDeviceModel,
} from '../../model'
import { InvalidValueError } from '../../types/errors'

/**
 * This function attempts to save a device model in its correct repository.
 * @param deviceModel The device model to be saved.
 */
export async function saveDeviceModel(deviceModel: DeviceOverviewModel) {
    if (isConcreteDeviceModel(deviceModel)) {
        await AppDataSource.getRepository(ConcreteDeviceModel).save(deviceModel)
    } else if (isDeviceGroupModel(deviceModel)) {
        await AppDataSource.getRepository(DeviceGroupModel).save(deviceModel)
    } else if (isInstantiableBrowserDeviceModel(deviceModel)) {
        await AppDataSource.getRepository(InstantiableBrowserDeviceModel).save(
            deviceModel
        )
    } else if (isInstantiableCloudDeviceModel(deviceModel)) {
        await AppDataSource.getRepository(InstantiableCloudDeviceModel).save(deviceModel)
    } else {
        throw new InvalidValueError(
            'The device model to be saved does not match any known device type',
            500
        )
    }
}
