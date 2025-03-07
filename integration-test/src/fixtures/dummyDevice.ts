import { APIClient } from '@cross-lab-project/api-client';
import assert from 'assert';
import { ChildProcessWithoutNullStreams, execSync, spawn } from 'child_process';
import fs from 'fs';
import { resolve } from 'path';
import { TypedEmitter } from 'tiny-typed-emitter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const repository_dir = resolve(__filename, '../../../../');

export interface DummyDeviceEvents {
  websocketToken(token: string): void;
  connectionsChanged(connections: { url: string; state: string }[]): void;
  websocketConnected(): void;
  gpio(event: { signal: string; value: string }): void;
  configuration(configuration: { [k: string]: unknown }): void;
  experimentStatusChanged(status: { status: string; message: string }): void;
  file(event: Record<string, never>): void;
}

function createPythonEnvironment() {
  // if venv is not created, create it
  if (!fs.existsSync(`${repository_dir}/integration-test/venv`)) {
    execSync('virtualenv venv && venv/bin/pip install -r requirements.txt', {
      cwd: `${repository_dir}/integration-test`,
    });
  }
}

export const clientTypes = ['js', 'python'] as const;
export type ClientType = (typeof clientTypes)[number];
export const deviceTypes = [
  'device',
  'edge instantiable',
  'cloud instantiable',
  'group',
] as const;
export type DeviceType = (typeof deviceTypes)[number];

export class DummyDevice extends TypedEmitter<DummyDeviceEvents> {
  private binary: string[];
  private debugPrint?: string;
  private process: ChildProcessWithoutNullStreams | undefined;
  private ready = false;
  private exitWithoutError = false;

  public url = '';
  log_file: string;
  context: Mocha.Context;

  constructor(
    type: ClientType,
    debug: boolean | number = false,
    host_debug: boolean | number = false,
    log_file: string,
    context: Mocha.Context,
  ) {
    super();
    switch (type) {
      case 'js':
        this.binary = `node${
          host_debug ? ` --inspect-brk=${host_debug}` : ''
        } node_modules/@crosslab/dummy-device/app/index.js${
          debug ? ` --browser-inspect ${debug}` : ''
        }`.split(' ');
        if (host_debug) {
          this.debugPrint = `    js dummy device host started with debug port ${host_debug}. Please attach debugger`;
        }
        if (debug) {
          this.debugPrint =
            (this.debugPrint ? this.debugPrint + '\n' : '') +
            `    js dummy device started with debug port ${debug}. Please attach debugger`;
        }
        break;
      case 'python':
        createPythonEnvironment();
        if (debug) {
          this.binary =
            `${repository_dir}/integration-test/venv/bin/python -m debugpy --listen ${debug} --wait-for-client -m dummy_device`.split(
              ' ',
            );
          this.debugPrint = `    python dummy device started with debug port ${debug}. Please attach debugger`;
        } else {
          this.binary =
            `${repository_dir}/integration-test/venv/bin/python -m dummy_device`.split(
              ' ',
            );
        }
        break;
    }
    this.log_file = log_file;
    this.context = context;
  }

  public async start(client: APIClient, deviceUrl: string) {
    assert(this.process === undefined, 'Device already started');
    this.context.log(this.log_file, 'starting device', 'log');
    this.url = deviceUrl;

    assert(client.url && client.accessToken && deviceUrl);
    const cli = [
      '--url',
      client.url,
      '--auth-token',
      client.accessToken,
      '--device-url',
      deviceUrl,
    ];

    this.process = spawn(this.binary[0], [...this.binary.slice(1), ...cli], {
      env: { ...process.env },
    });
    if (this.debugPrint) {
      console.log(this.debugPrint);
    }

    this.process.on('exit', code => {
      if (!this.exitWithoutError) {
        throw Error(`Device exited with code ${code}`);
      }
    });

    this.process.stderr.on('data', data => {
      this.context.log(this.log_file, data.toString(), 'err');
    });

    let stdout = '';
    this.process.stdout.on('data', data => {
      this.context.log(this.log_file, data.toString(), 'log');
      stdout += data.toString();
      const lines = stdout.split('\n');
      stdout = lines.pop() ?? '';
      for (const line of lines) {
        const split_line = line.split(' ');
        if (split_line.length >= 1) {
          const event = split_line[0];
          const param = split_line.splice(1).join(' ');
          if (event == `[websocketToken]`) {
            this.emit('websocketToken', JSON.parse(param));
          }
          if (event == `[connectionsChanged]`) {
            this.emit('connectionsChanged', JSON.parse(param));
          }
          if (event == `[websocketConnected]`) {
            this.emit('websocketConnected');
          }
          if (event == `[gpio]`) {
            this.emit('gpio', JSON.parse(param));
          }
          if (event == `[file]`) {
            this.emit('file', {});
          }
          if (event == `[configuration]`) {
            this.emit('configuration', JSON.parse(param));
          }
          if (event == `[experimentStatusChanged]`) {
            this.emit('experimentStatusChanged', JSON.parse(param));
          }
          if (event == `[ready]`) {
            this.ready = true;
            this._sendList.forEach(d => {
              this.send(d.event, d.data);
            });
            this._sendList = [];
          }
        }
      }
    });
  }

  public async stop() {
    assert(this.process !== undefined, 'Device not started');
    this.exitWithoutError = true;
    this.process.kill('SIGINT');
  }

  _sendList: { event: string; data: unknown }[] = [];
  public send(
    event: 'gpio',
    data: { signal: string; value: 'strongH' | 'strongL' },
  ): void;
  public send(event: string, data: unknown): void;
  public send(event: string, data: unknown) {
    if (this.ready && this.process) {
      this.process.stdin.cork();
      this.process.stdin.write('[' + event + '] ' + JSON.stringify(data) + '\n');
      this.process.stdin.uncork();
    } else {
      this._sendList.push({ event, data });
    }
  }
}
