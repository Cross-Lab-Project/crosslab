import getSpec from "./get.spec";
import peerconnectionSpec from "./peerconnection/index.spec";
import postSpec from "./post.spec";

export default [getSpec, postSpec, ...peerconnectionSpec];
