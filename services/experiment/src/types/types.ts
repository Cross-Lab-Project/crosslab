import { DeviceServiceTypes } from '@cross-lab-project/api-client'
import { ExperimentModel } from '../database/model'

export type Instance = {
    url: string
    token: string
}

export type ResolvedDevice = DeviceServiceTypes.Device<'response'> & {
    instanceUrl?: string
    instanceToken?: string
}

export type InstantiatedDevice = DeviceServiceTypes.ConcreteDevice<'response'> & {
    token: string
}

export type ExtraRequire<Type, Key extends keyof Type> = Type & {
    [Property in Key]-?: Type[Property]
}

export type ExperimentModelStatusMapping<T extends ExperimentModel['status']> =
    T extends 'created'
        ? ExperimentModel
        : T extends 'booked'
        ? ExtraRequire<
              ExperimentModel,
              'bookingID' | 'bookingStart' | 'bookingEnd' | 'devices'
          >
        : T extends 'booking-locked'
        ? ExtraRequire<
              ExperimentModel,
              'bookingID' | 'bookingStart' | 'bookingEnd' | 'devices'
          >
        : T extends 'devices-instantiated'
        ? ExtraRequire<
              ExperimentModel,
              'bookingID' | 'bookingStart' | 'bookingEnd' | 'devices'
          >
        : T extends 'booking-updated'
        ? ExtraRequire<
              ExperimentModel,
              'bookingID' | 'bookingStart' | 'bookingEnd' | 'devices'
          >
        : T extends 'peerconnections-created'
        ? ExtraRequire<
              ExperimentModel,
              'bookingID' | 'bookingStart' | 'bookingEnd' | 'devices'
          >
        : T extends 'running'
        ? ExtraRequire<
              ExperimentModel,
              'bookingID' | 'bookingStart' | 'bookingEnd' | 'devices'
          >
        : T extends 'finished'
        ? ExperimentModel
        : never
