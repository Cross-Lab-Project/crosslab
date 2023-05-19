import { ConcreteDeviceRepository } from '../../../../src/database/repositories/device/concreteDevice'
import { deviceUrlFromId } from '../../../../src/methods/urlFromId'
import { EntityData } from '@crosslab/service-common/test-helper'

const uuid = '32348c89-f302-408f-8582-cb9783c74fee'
const type = 'device'
const name = 'Concrete Device Example (no description)'
const owner = 'http://localhost/users/superadmin'

const concrete_device_no_description: EntityData<ConcreteDeviceRepository> = {
    request: {
        type,
        name,
    },
    model: {
        uuid,
        type,
        name,
        owner,
        announcedAvailability: [],
        services: [],
        availabilityRules: [],
        connected: false,
    },
    response: {
        url: deviceUrlFromId(uuid),
        type,
        name,
        owner,
        connected: false,
        announcedAvailability: [],
        services: [],
    },
}

export default concrete_device_no_description
