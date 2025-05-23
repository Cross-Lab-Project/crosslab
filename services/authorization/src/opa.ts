import { logger } from '@crosslab/service-common';
import { spawn } from 'child_process';
import readline from 'readline';

import fetch from 'node-fetch';
import { fix_object_without_colon, openfgaOpaData } from './openfga.js';
import { CheckTuple } from './types.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let opaProcess: any;

export async function opa_init() {
  opaProcess = spawn(
    'opa',
    ['run', '-s', '--bundle', 'policy', '--addr', 'localhost:3011'],
    { stdio: ['ignore', 'pipe', 'pipe'] },
  );

  readline
    .createInterface({
      input: opaProcess.stderr,
      terminal: false,
    })
    .on('line', line => {
      const json = JSON.parse(line.toString());
      logger.log(json.level, json.message, { ...json, subsystem: 'opa' });
    });

  readline
    .createInterface({
      input: opaProcess.stdout,
      terminal: false,
    })
    .on('line', line => {
      logger.log('error', line, { subsystem: 'opa' });
    });

  process.on('SIGINT', () => {
    opaProcess.kill('SIGINT');
    process.exit(0);
  });
  process.on('SIGTERM', () => {
    opaProcess.kill('SIGTERM');
    process.exit(0);
  });
  process.on('SIGQUIT', () => {
    opaProcess.kill('SIGQUIT');
    process.exit(0);
  });

  // wait for opa to be ready
  await new Promise<void>(resolve => {
    const interval = setInterval(() => {
      fetch('http://localhost:3011/')
        .then(() => {
          clearInterval(interval);
          resolve();
        })
        .catch(() => {
          // do nothing
        });
    }, 500);
  });
}

export function opa_deinit() {
  opaProcess.kill(9);
}

export async function opa_check(checks: CheckTuple[]) {
  const outputPromise = checks.map((input: CheckTuple) =>
    fetch('http://localhost:3011/v1/data/crosslab', {
      method: 'POST',
      body: JSON.stringify({
        input: {
          ...input,
          object: fix_object_without_colon(input.object),
          ...openfgaOpaData,
        },
      }),
    })
      .then(response => response.json())
      .then(response => {
        logger.info('opa_check', {
          ...input,
          object: fix_object_without_colon(input.object),
          ...openfgaOpaData,
          response,
        });
        return response as {result: {allow?: boolean, reason?: string}};
      })
      .then(json => ({
        result: json.result.allow ?? false,
        reason: json.result.reason ?? 'unknown',
      })),
  );
  return await Promise.all(outputPromise);
}

export async function opa_set_jwt_secret(secret: string) {
  await fetch('http://localhost:3011/v1/data/jwt_secret', {
    method: 'PUT',
    body: JSON.stringify(secret),
  });
}
