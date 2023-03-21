import { DeviceGroupRepository } from '../../../../src/database/repositories/device/deviceGroup'
import { EntityData } from '@crosslab/service-common'

const uuid = 'd65b289a-44c5-452f-8c7b-e003714d3645'
const type = 'group'
const name = 'Device Group Example'
const description = 'An example for a device group'
const owner = 'http://localhost/users/superadmin'
const devices = [{ url: 'http://localhost/devices/32348c89-f302-408f-8582-cb9783c74fbb' }]

const device_group: EntityData<DeviceGroupRepository> = {
    request: {
        type,
        name,
        description,
        devices,
    },
    model: {
        uuid,
        type,
        name,
        description,
        devices,
        owner,
    },
    response: {
        url: 'http://localhost/devices/32348c89-f302-408f-8582-cb9783c74fbb',
        type,
        name,
        description,
        devices,
        owner,
    },
}

export default device_group
