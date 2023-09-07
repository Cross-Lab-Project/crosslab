import availabilitySpec from './availability/index.spec.js';
import deleteSpec from './delete.spec.js';
import getSpec from './get.spec.js';
import patchSpec from './patch.spec.js';
import postSpec from './post.spec.js';
import signalingSpec from './signaling/index.spec.js';
import websocketSpec from './websocket/index.spec.js';

export default [
    getSpec,
    postSpec,
    patchSpec,
    deleteSpec,
    ...availabilitySpec,
    ...signalingSpec,
    ...websocketSpec,
];
