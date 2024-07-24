#!/usr/bin/env node
import { errorHandler, logging } from '@crosslab/service-common';
import express from 'express';
import asyncHandler from 'express-async-handler';

import { Experiment } from './clients/experiment/types.js';
import { experiment } from './clients/index.js';
import { config } from './config.js';
import * as key_management from './key_management.js';
import { handle_dynamic_registration_initiation_request } from './lti/dynamic_registration.js';
import { grading } from './lti/grading.js';
import {
  complete_manual_registration,
  handle_manual_registration,
} from './lti/manual_registration.js';
import { handle_login_request } from './lti/message.js';

export let app: express.Express;

export function init_app() {
  app = express();
  app.use(logging.middleware())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get(
    '/',
    asyncHandler(async (req, res) => {
      if (req.query.openid_configuration) {
        await handle_dynamic_registration_initiation_request(req, res);
      } else {
        await handle_manual_registration(req, res);
      }
    }),
  );

  app.post(
    '/register',
    asyncHandler(async (req, res) => {
      await complete_manual_registration(req, res);
    }),
  );

  app.post(
    '/',
    asyncHandler(async (req, res) => {
      console.log(req.body);
      await handle_login_request(req, res);
      //res.send("ok")
    }),
  );

  app.get(
    '/.well-known/jwks.json',
    asyncHandler(async (_req, res) => {
      res.send(key_management.get_jwks());
    }),
  );

  app.get(
    '/logo.png',
    asyncHandler(async (_req, res) => {
      res.sendFile('logo.png', { root: 'assets/' });
    }),
  );

  app.post(
    '/grading',
    asyncHandler(async (req, res) => {
      const exp: Experiment = req.body.experiment;
      if (
        exp.status === 'finished' &&
        exp.lti_platform_reference !==undefined &&
        exp.lti_grade !==undefined &&
        !exp.lti_graded
      ) {
        await experiment.updateExperiment(exp.url, { lti_graded: true });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        grading({ ...exp.lti_platform_reference, grade: exp.lti_grade } as any);
      }
      res.send('ok');
    }),
  );

  app.use(errorHandler);

  app.listen(config.PORT);
}
