import { InstantiableBrowserDeviceRepository } from '../../../../src/database/repositories/device/instantiableBrowserDevice'
import { deviceUrlFromId } from '../../../../src/methods/urlFromId'
import { EntityData } from '@crosslab/service-common'

const uuid = '3742d2bd-8259-4dba-8908-f54dba68ba69'
const type = 'edge instantiable'
const name = 'Instantiable Browser Device Example'
const description = 'An example for an instantiable browser device'
const owner = 'http://localhost/users/superadmin'
const codeUrl = 'http://localhost/code'

const instantiable_browser_device: EntityData<InstantiableBrowserDeviceRepository> = {
    request: {
        type,
        name,
        description,
        codeUrl,
    },
    model: {
        uuid,
        type,
        name,
        description,
        owner,
        codeUrl,
    },
    response: {
        url: deviceUrlFromId(uuid),
        type,
        name,
        description,
        owner,
        codeUrl,
    },
}

export default instantiable_browser_device
