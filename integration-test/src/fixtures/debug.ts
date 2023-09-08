import { readFileSync } from 'fs';
import { WriteStream, createWriteStream } from 'fs';
import { resolve } from 'path';

export interface DebugContext {
  debug?: {
    auth?: { debug_port: number };
    device?: { debug_port: number };
    experiment?: { debug_port: number };
    federation?: { debug_port: number };
    jsDevice?: { [key: number]: { debug_port: number } };
    jsDeviceHost?: { [key: number]: { debug_port: number } };
    pythonDevice?: { [key: number]: { debug_port: number } };
  };
  log: (file: string, data: string, level: 'log' | 'err') => void;
}

const debug_conf = resolve(__filename, '../../../debug.ini');

const startUpTime = Date.now();
const fileStreams = new Map<string, WriteStream>();
function log(
  file = 'test.log',
  data: string,
  level: 'log' | 'err' = 'log',
  testName: string,
) {
  const timeSinceStart = Date.now() - startUpTime;

  const prefix =
    `${timeSinceStart}`.padStart(10, ' ') + (level === 'log' ? 'ms [log] ' : 'ms [err] ');
  // remove newline if its the first or last character
  if (data.startsWith('\n')) {
    data = data.substring(1);
  }
  if (data.endsWith('\n')) {
    data = data.substring(0, data.length - 1);
  }
  data = data.replaceAll('\n', '\n' + prefix);
  data = prefix + data;

  let stream = fileStreams.get(file);
  if (!stream) {
    stream = createWriteStream('./dist/' + file);
    fileStreams.set(file, stream);
    stream.write('================== ' + testName + '\n');
  }
  stream.write(data + '\n');
}

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
        debug[key as 'auth' | 'device' | 'experiment' | 'federation'] = {
          debug_port: parseInt(value),
        };
      } else {
        const [sub_key, index] = key.split('_');
        if (['jsDevice', 'jsDeviceHost', 'pythonDevice'].includes(sub_key)) {
          if (!debug[sub_key as 'jsDevice' | 'jsDeviceHost' | 'pythonDevice']) {
            debug[sub_key as 'jsDevice' | 'jsDeviceHost' | 'pythonDevice'] = {};
          }
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          debug[sub_key as 'jsDevice' | 'jsDeviceHost' | 'pythonDevice']![
            parseInt(index)
          ] = { debug_port: parseInt(value) };
        } else {
          throw new Error(`Unknown key ${key} in ${debug_conf}`);
        }
      }
    }
    if (Object.keys(debug).length > 0) {
      this.debug = debug;
    }

    const testName = this.currentTest?.titlePath().join(': ') ?? 'unknown test';
    this.log = (file, data, level) => log(file, data, level, testName);
  },
  async beforeEach(this: DebugContext & Mocha.Context) {
    const testName = this.currentTest?.titlePath().join(': ') ?? 'unknown test';
    for (const file of fileStreams.keys()) {
      const stream = fileStreams.get(file);
      stream && stream.write('================== ' + testName + '\n');
    }
    this.log = (file, data, level) => log(file, data, level, testName);
  },
};
