import { DeviceRepository } from '../../src/database/repositories/device'
import { EntityData } from '@crosslab/service-common'

export const deviceNames = ['concrete device example'] as const
export type DeviceName = (typeof deviceNames)[number]
export type DeviceData = Record<DeviceName, EntityData<DeviceRepository>>

export const deviceData: DeviceData = {
    'concrete device example': {
        request: {
            type: 'device',
            name: 'Concrete Device Example',
            description: 'An example for a concrete device.',
        },
        model: {
            uuid: '32348c89-f302-408f-8582-cb9783c74fbb',
            type: 'device',
            name: 'Concrete Device Example',
            description: 'An example for a concrete device.',
            owner: 'http://localhost/users/superadmin',
        },
        response: {
            url: 'http://localhost/devices/32348c89-f302-408f-8582-cb9783c74fbb',
            type: 'device',
            name: 'Concrete Device Example',
            description: 'An example for a concrete device.',
            owner: 'http://localhost/users/superadmin',
            connected: false,
            announcedAvailability: [],
        },
    },
}
