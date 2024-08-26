#!/usr/bin/env node
import express, { Application } from 'express';
import { config } from './config.js';

import { authorization, error, logger, logging } from '@crosslab/service-common';
import { middleware as clientMiddleware } from './clients/index.js';
import { app } from './generated/index.js';

export function init_app() {
  //app = express();
  //app.use(logging.middleware())
  //app.use(express.json());
  //app.use(express.urlencoded({ extended: true }));
//
  //app.get(
  //  '/',
  //  asyncHandler(async (req, res) => {
  //    if (req.query.openid_configuration) {
  //      await handle_dynamic_registration_initiation_request(req, res);
  //    } else {
  //      await handle_manual_registration(req, res);
  //    }
  //  }),
  //);
//
  //app.post(
  //  '/register',
  //  asyncHandler(async (req, res) => {
  //    await complete_manual_registration(req, res);
  //  }),
  //);
//
  //app.post(
  //  '/',
  //  asyncHandler(async (req, res) => {
  //    console.log(req.body);
  //    await handle_login_request(req, res);
  //    //res.send("ok")
  //  }),
  //);
//
  //app.get(
  //  '/.well-known/jwks.json',
  //  asyncHandler(async (_req, res) => {
  //    res.send(key_management.get_jwks());
  //  }),
  //);
//
  //app.get(
  //  '/logo.png',
  //  asyncHandler(async (_req, res) => {
  //    res.sendFile('logo.png', { root: 'assets/' });
  //  }),
  //);
//
  //app.post(
  //  '/grading',
  //  asyncHandler(async (req, res) => {
  //    const exp: Experiment = req.body.experiment;
  //    if (
  //      exp.status === 'finished' &&
  //      exp.lti_platform_reference !==undefined &&
  //      exp.lti_grade !==undefined &&
  //      !exp.lti_graded
  //    ) {
  //      await experiment.updateExperiment(exp.url, { lti_graded: true });
  //      // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //      grading({ ...exp.lti_platform_reference, grade: exp.lti_grade } as any);
  //    }
  //    res.send('ok');
  //  }),
  //);
//
  //app.use(errorHandler);
  app.initService({
    preHandlers: [
      (application: Application) => {
        application.use((req, _res, next) => {logger.info(req.headers); next();});
        application.use(express.json());
        application.use(express.urlencoded({ extended: false }));
        application.use(logging.middleware());
        application.use(authorization.middleware(config));
        application.use(clientMiddleware)
      },
    ],
    postHandlers: [
      (application: Application) => {
        application.get('/device/status', (_req, res) => {
          res.send({ status: 'ok' });
        });
      },
    ],
    errorHandler: error.middleware,
  })

  app.listen(config.PORT);
}
