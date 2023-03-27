import { ConcreteDeviceRepository } from '../../../../src/database/repositories/device/concreteDevice'
import { deviceUrlFromId } from '../../../../src/methods/urlFromId'
import { EntityData } from '@crosslab/service-common'

const uuid = '32348c89-f302-408f-8582-cb9783c74fbb'
const type = 'device'
const name = 'Concrete Device Example'
const description = 'An example for a concrete device'
const owner = 'http://localhost/users/superadmin'

const concrete_device: EntityData<ConcreteDeviceRepository> = {
    request: {
        type,
        name,
        description,
    },
    model: {
        uuid,
        type,
        name,
        description,
        owner,
        announcedAvailability: [],
    },
    response: {
        url: deviceUrlFromId(uuid),
        type,
        name,
        description,
        owner,
        connected: false,
        announcedAvailability: [],
    },
}

export default concrete_device
