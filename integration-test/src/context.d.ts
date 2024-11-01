/* eslint-disable @typescript-eslint/no-empty-object-type */
 
import { ClientContext } from './fixtures/client';
import { DebugContext } from './fixtures/debug';

declare module 'mocha' {
  export interface Context extends DebugContext {}
  export interface Context extends ClientContext {}
}
