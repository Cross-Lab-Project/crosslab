import {
    ConcreteDeviceModel,
    DeviceGroupModel,
    InstantiableBrowserDeviceModel,
    InstantiableCloudDeviceModel,
} from '../database/model'
import {
    ConcreteDevice,
    DeviceGroup,
    InstantiableBrowserDevice,
    InstantiableCloudDevice,
} from '../generated/types'

export type Device<T extends 'request' | 'response' | 'all' = 'all'> =
    | ConcreteDevice<T>
    | DeviceGroup<T>
    | InstantiableBrowserDevice<T>
    | InstantiableCloudDevice<T>

export type DeviceModel =
    | ConcreteDeviceModel
    | DeviceGroupModel
    | InstantiableBrowserDeviceModel
    | InstantiableCloudDeviceModel
