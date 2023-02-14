import {readFileSync} from 'fs';
import {resolve} from 'path';

export interface DebugContext {
  debug?: {
    auth?: {debug_port: number};
    device?: {debug_port: number};
    experiment?: {debug_port: number};
    federation?: {debug_port: number};
    jsDevice?: {[key: number]: {debug_port: number}};
    jsDeviceHost?: {[key: number]: {debug_port: number}};
    pythonDevice?: {[key: number]: {debug_port: number}};
  };
}

const debug_conf = resolve(__filename, '../../../debug.ini');

export const mochaHooks = {
  async beforeAll(this: DebugContext & Mocha.Context) {
    // read debug.ini
    const debug: DebugContext['debug'] = {};
    for (const line of readFileSync(debug_conf, 'utf-8').split('\n')) {
      if (line.startsWith('#')) {
        continue;
      }
      const [key, value] = line.split('=');
      if (['auth', 'device', 'experiment', 'federation'].includes(key)) {
        debug[key as 'auth' | 'device' | 'experiment' | 'federation'] = {debug_port: parseInt(value)};
      } else {
        const [sub_key, index] = key.split('_');
        if (['jsDevice', 'jsDeviceHost', 'pythonDevice'].includes(sub_key)) {
          if (!debug[sub_key as 'jsDevice' | 'jsDeviceHost' | 'pythonDevice']) {
            debug[sub_key as 'jsDevice' | 'jsDeviceHost' | 'pythonDevice'] = {};
          }
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          debug[sub_key as 'jsDevice' | 'jsDeviceHost' | 'pythonDevice']![parseInt(index)] = {debug_port: parseInt(value)};
        } else {
          throw new Error(`Unknown key ${key} in ${debug_conf}`);
        }
      }
    }
    if (Object.keys(debug).length > 0) {
      this.debug = debug;
    }
  },
};
