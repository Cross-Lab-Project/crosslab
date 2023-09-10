import getSpec from './get.spec.js';
import peerconnectionSpec from './peerconnection/index.spec.js';
import postSpec from './post.spec.js';

export default [getSpec, postSpec, ...peerconnectionSpec];
