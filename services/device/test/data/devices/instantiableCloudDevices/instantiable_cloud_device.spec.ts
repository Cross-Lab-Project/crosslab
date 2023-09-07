import { InstantiableCloudDeviceRepository } from '../../../../src/database/repositories/device/instantiableCloudDevice.js.ts";
import { deviceUrlFromId } from '../../../../src/methods/urlFromId.js.ts";
import { EntityData } from '@crosslab/service-common/test-helper';

const uuid = '15d9de70-3646-4d05-a83b-3c70862c0b98';
const type = 'cloud instantiable';
const name = 'Instantiable Cloud Device Example';
const description = 'An example for an instantiable cloud device';
const owner = 'http://localhost/users/superadmin';
const instantiateUrl = 'http://localhost/code';
const isPublic = true;

const instantiable_cloud_device: EntityData<InstantiableCloudDeviceRepository> = {
    request: {
        type,
        name,
        description,
        instantiateUrl,
        isPublic,
    },
    model: {
        uuid,
        type,
        name,
        description,
        owner,
        instantiateUrl,
        isPublic,
    },
    response: {
        url: deviceUrlFromId(uuid),
        type,
        name,
        description,
        owner,
        instantiateUrl,
        isPublic,
    },
};

export default instantiable_cloud_device;
