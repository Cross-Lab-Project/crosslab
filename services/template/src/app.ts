#!/usr/bin/env node
import { errorHandler, logHandling } from '@crosslab/service-common';
import express from 'express';
import asyncHandler from 'express-async-handler';

const app = express();
logHandling(app);
app.use(express.json());

app.get(
  '/',
  asyncHandler(async (_req, res) => {
    res.send('Hello World!');
  }),
);

app.use(errorHandler);
export default app;
