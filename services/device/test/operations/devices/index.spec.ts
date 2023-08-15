import deviceTests from "./device/index.spec";
import getSpec from "./get.spec";
import postSpec from "./post.spec";

export default [getSpec, postSpec, ...deviceTests];
