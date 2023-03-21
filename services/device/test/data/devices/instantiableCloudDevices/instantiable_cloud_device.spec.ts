import { InstantiableCloudDeviceRepository } from '../../../../src/database/repositories/device/instantiableCloudDevice'
import { EntityData } from '@crosslab/service-common'

const uuid = '15d9de70-3646-4d05-a83b-3c70862c0b98'
const type = 'cloud instantiable'
const name = 'Instantiable Cloud Device Example'
const description = 'An example for an instantiable cloud device'
const owner = 'http://localhost/users/superadmin'
const instantiateUrl = 'http://localhost/code'

const instantiable_cloud_device: EntityData<InstantiableCloudDeviceRepository> = {
    request: {
        type,
        name,
        description,
        instantiateUrl,
    },
    model: {
        uuid,
        type,
        name,
        description,
        owner,
        instantiateUrl,
    },
    response: {
        url: 'http://localhost/devices/32348c89-f302-408f-8582-cb9783c74fbb',
        type,
        name,
        description,
        owner,
        instantiateUrl,
    },
}

export default instantiable_cloud_device
