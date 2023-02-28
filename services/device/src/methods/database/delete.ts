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
 * This function attempts to delete a given device model.
 * @param deviceModel The device model to be deleted.
 * @throws {InvalidValueError} Thrown when the given device model does not match any known device type.
 */
export async function deleteDeviceModel(deviceModel: DeviceOverviewModel) {
    if (isConcreteDeviceModel(deviceModel)) {
        const concreteDeviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
        await concreteDeviceRepository.softDelete(deviceModel.uuid)
    } else if (isDeviceGroupModel(deviceModel)) {
        const deviceGroupRepository = AppDataSource.getRepository(DeviceGroupModel)
        await deviceGroupRepository.softDelete(deviceModel.uuid)
    } else if (isInstantiableBrowserDeviceModel(deviceModel)) {
        const instantiableBrowserDeviceRepository = AppDataSource.getRepository(
            InstantiableBrowserDeviceModel
        )
        await instantiableBrowserDeviceRepository.softDelete(deviceModel.uuid)
    } else if (isInstantiableCloudDeviceModel(deviceModel)) {
        const instantiableCloudDeviceRepository = AppDataSource.getRepository(
            InstantiableCloudDeviceModel
        )
        await instantiableCloudDeviceRepository.softDelete(deviceModel.uuid)
    } else {
        throw new InvalidValueError(
            'The device model to be deleted does not match any known device type',
            500
        )
    }
}
