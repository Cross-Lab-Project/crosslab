import { ParticipantEntityDataWithLinks } from './index.spec.js';

const serviceId = 'exampleId';
const config = {};

export const example_participant: ParticipantEntityDataWithLinks = {
    request: {
        serviceId,
        role: 'example role',
        config,
    },
    model: {
        uuid: '0b27a032-1cc2-41ff-93ff-c9bd1febed8f',
        serviceId,
        role: 'example role',
        config,
        serviceConfiguration: 'example serviceConfiguration',
    },
    response: {
        serviceId,
        role: 'example role',
        config,
    },
};
