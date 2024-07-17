#!/usr/bin/env node
import { errorHandler, logging } from '@crosslab/service-common';
import express from 'express';
import asyncHandler from 'express-async-handler';

import { config } from './config.js';
import { opa_check } from './opa.js';
import { query_relations, update_relations } from './openfga.js';
import { CheckTuple } from './types.js';

const app = express();

app.use(logging.middleware());

app.get('/authorization/status', (_req, res) => {
  res.send({ status: 'ok' });
});

app.use((req, res, next) => {
  if (req.headers['x-authorization-psk'] !== config.PSK) {
    res.status(401).send('Unauthorized');
    return;
  }
  next();
});

app.use(express.json());
app.get(
  '/authorize',
  asyncHandler(async (req, res) => {
    if (typeof req.query.subject !== 'string') {
      res.send({ result: false, reason: 'subject is not a string' });
      return;
    }
    if (typeof req.query.action !== 'string') {
      res.send({ result: false, reason: 'action is not a string' });
      return;
    }
    if (typeof req.query.object !== 'string') {
      res.send({ result: false, reason: 'object is not a string' });
      return;
    }
    const check: CheckTuple = {
      subject: req.query.subject,
      action: req.query.action,
      object: req.query.object,
    };
    res.send((await opa_check([check]))[0]);
  }),
);

app.post(
  '/authorize',
  asyncHandler(async (req, res) => {
    const checks = req.body;
    if (!Array.isArray(checks)) {
      res.send({ result: false, reason: 'checks is not an array' });
      return;
    }
    if (checks.length === 0) {
      res.send({ result: false, reason: 'checks is empty' });
      return;
    }
    res.send(await opa_check(checks));
  }),
);

app.post(
  '/relations/update',
  asyncHandler(async (req, res) => {
    const input = req.body;
    const add = input.add ?? [];
    const remove = input.remove ?? [];
    await update_relations(add, remove);
    res.send();
  }),
);

app.post(
  '/relations/query',
  asyncHandler(async (req, res) => {
    res.json(await query_relations(req.body.subject, req.body.relation, req.body.object));
  }),
);

app.use(errorHandler);

export default app;
