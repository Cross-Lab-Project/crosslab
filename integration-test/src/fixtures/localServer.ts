import {APIClient} from '@cross-lab-project/api-client';
import {ChildProcessWithoutNullStreams, execSync, spawn} from 'child_process';
import fs from 'fs';
import path from 'path';

import {ENV} from './localServer.config';

const repository_dir = path.resolve(__filename, '../../../../');

type Service = {
  process: ChildProcessWithoutNullStreams;
  stdout: string;
  stderr: string;
};

export interface ServerContext {
  authService: Service;
  deviceService: Service;
  experimentService: Service;
  federationService: Service;
  gatewayService: Service;
  client: APIClient;
}

function prepare_service(process: ChildProcessWithoutNullStreams): Service {
  const ret = {
    process,
    stdout: '',
    stderr: '',
  };
  process.stdout.on('data', data => {
    ret.stdout += data;
  });
  process.stderr.on('data', data => {
    ret.stderr += data;
  });
  return ret;
}

function start_service(service_path: string, env: {[key: string]: string}, clear = false, debug: boolean | number = false) {
  const additional_params = [];
  if (clear) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    fs.rm(`${service_path}/db`, {recursive: true}, () => {});
  }
  if (debug) {
    if (typeof debug === 'number') {
      additional_params.push('--inspect-brk=' + debug.toString());
    } else if (debug) {
      additional_params.push('--inspect-brk');
    }
  }

  const service = spawn('node', [...additional_params, './app/index.js'], {env: {PATH: process.env.PATH, ...env}, cwd: service_path});

  if (debug) {
    console.log(`Service ${service_path} started with debug port ${debug}. Please attach debugger`);
  }

  return prepare_service(service);
}

function start_gateway(gateway_path: string, env: {[key: string]: string}) {
  execSync('./scripts/create_config.sh', {env: {...process.env, ...env}, cwd: gateway_path}).toString();
  const nginx_conf_dir = path.resolve(gateway_path, 'conf_compiled');
  const service = spawn('nginx', ['-g', 'daemon off;', '-p', nginx_conf_dir, '-c', nginx_conf_dir + '/nginx.conf'], {
    env: {...process.env, ...env},
    cwd: gateway_path,
  });
  return prepare_service(service);
}

export const mochaHooks = {
  async beforeEach(this: ServerContext & Mocha.Context) {
    this.client = new APIClient(ENV.common.BASE_URL);
    this.authService.stderr = '';
    this.authService.stdout = '';
    this.deviceService.stderr = '';
    this.deviceService.stdout = '';
    this.experimentService.stderr = '';
    this.experimentService.stdout = '';
    this.federationService.stderr = '';
    this.federationService.stdout = '';
    this.gatewayService.stderr = '';
    this.gatewayService.stdout = '';
  },

  async afterEach(this: ServerContext & Mocha.Context) {
    if (this.currentTest?.state === 'failed') {
      if (this.authService.stderr) console.error('AuthService stderr:', this.authService.stderr);
      if (this.authService.stdout) console.log('AuthService stdout:', this.authService.stdout);
      if (this.deviceService.stderr) console.error('DeviceService stderr:', this.deviceService.stderr);
      if (this.deviceService.stdout) console.log('DeviceService stdout:', this.deviceService.stdout);
      if (this.experimentService.stderr) console.error('ExperimentService stderr:', this.experimentService.stderr);
      if (this.experimentService.stdout) console.log('ExperimentService stdout:', this.experimentService.stdout);
      if (this.federationService.stderr) console.error('FederationService stderr:', this.federationService.stderr);
      if (this.federationService.stdout) console.log('FederationService stdout:', this.federationService.stdout);
      if (this.gatewayService.stderr) console.error('GatewayService stderr:', this.gatewayService.stderr);
      if (this.gatewayService.stdout) console.log('GatewayService stdout:', this.gatewayService.stdout);
    }
  },

  async beforeAll(this: ServerContext & Mocha.Context) {
    console.log('Starting services...');
    this.timeout(20000);

    this.authService = start_service(
      path.resolve(repository_dir, 'services', 'auth'),
      {...ENV.common, ...ENV.auth},
      true,
      this.debug?.auth?.debug_port,
    );
    this.deviceService = start_service(
      path.resolve(repository_dir, 'services', 'device'),
      {...ENV.common, ...ENV.device},
      true,
      this.debug?.device?.debug_port,
    );
    this.experimentService = start_service(
      path.resolve(repository_dir, 'services', 'experiment'),
      {...ENV.common, ...ENV.experiment},
      true,
      this.debug?.experiment?.debug_port,
    );
    this.federationService = start_service(
      path.resolve(repository_dir, 'services', 'federation'),
      {...ENV.common, ...ENV.federation},
      true,
      this.debug?.federation?.debug_port,
    );
    this.gatewayService = start_gateway(path.resolve(repository_dir, 'services', 'gateway'), {...ENV.common, ...ENV.gateway});

    // TODO: wait for health check to complete on all services -> needs health check endpoint
    // for now just wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 5000));
  },

  async afterAll(this: ServerContext & Mocha.Context) {
    this.authService.process.kill();
    this.deviceService.process.kill();
    this.experimentService.process.kill();
    this.federationService.process.kill();
    this.gatewayService.process.kill();
  },
};