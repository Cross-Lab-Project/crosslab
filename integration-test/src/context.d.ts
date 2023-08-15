/* eslint-disable @typescript-eslint/no-empty-interface */
import {DebugContext} from './fixtures/debug';
declare module 'mocha' {
  export interface Context extends DebugContext {}
}
