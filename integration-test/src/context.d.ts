/* eslint-disable @typescript-eslint/no-empty-interface */
import {DebugContext} from './fixtures/debug';
import {ServerContext} from './fixtures/localServer';

declare module 'mocha' {
  export interface Context extends ServerContext {}
  export interface Context extends DebugContext {}
}
