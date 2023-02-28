import {
    ConcreteDevice,
    DeviceGroup,
    InstantiableBrowserDevice,
    InstantiableCloudDevice,
    AvailabilityRule,
} from '../generated/types'
import {
    ConcreteDeviceModel,
    DeviceGroupModel,
    InstantiableBrowserDeviceModel,
    InstantiableCloudDeviceModel,
} from '../model'

export type DeviceTypeName =
    | 'device'
    | 'group'
    | 'edge instantiable'
    | 'cloud instantiable'
export type Device =
    | ConcreteDevice
    | DeviceGroup
    | InstantiableBrowserDevice
    | InstantiableCloudDevice
export type DeviceModel =
    | ConcreteDeviceModel
    | DeviceGroupModel
    | InstantiableBrowserDeviceModel
    | InstantiableCloudDeviceModel

export type DeviceFromName<T extends DeviceTypeName> = T extends 'device'
    ? ConcreteDevice
    : T extends 'group'
    ? DeviceGroup
    : T extends 'edge instantiable'
    ? InstantiableBrowserDevice
    : T extends 'cloud instantiable'
    ? InstantiableCloudDevice
    : never

export type DeviceModelFromName<T extends DeviceTypeName> = T extends 'device'
    ? ConcreteDeviceModel
    : T extends 'group'
    ? DeviceGroupModel
    : T extends 'edge instantiable'
    ? InstantiableBrowserDeviceModel
    : T extends 'cloud instantiable'
    ? InstantiableCloudDeviceModel
    : never

export type DeviceFromModel<T extends DeviceModel> = T extends ConcreteDeviceModel
    ? ConcreteDevice
    : T extends DeviceGroupModel
    ? DeviceGroup
    : T extends InstantiableBrowserDeviceModel
    ? InstantiableBrowserDevice
    : T extends InstantiableCloudDeviceModel
    ? InstantiableCloudDevice
    : never

export type WriteDeviceFromModel<T extends DeviceModel> = T extends ConcreteDeviceModel
    ? ConcreteDevice & { announcedAvailability?: AvailabilityRule[] }
    : T extends DeviceGroupModel
    ? DeviceGroup
    : T extends InstantiableBrowserDeviceModel
    ? InstantiableBrowserDevice
    : T extends InstantiableCloudDeviceModel
    ? InstantiableCloudDevice
    : never
