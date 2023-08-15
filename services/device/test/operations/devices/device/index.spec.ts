import availabilitySpec from "./availability/index.spec";
import deleteSpec from "./delete.spec";
import getSpec from "./get.spec";
import patchSpec from "./patch.spec";
import postSpec from "./post.spec";
import signalingSpec from "./signaling/index.spec";
import websocketSpec from "./websocket/index.spec";

export default [
  getSpec,
  postSpec,
  patchSpec,
  deleteSpec,
  ...availabilitySpec,
  ...signalingSpec,
  ...websocketSpec,
];
