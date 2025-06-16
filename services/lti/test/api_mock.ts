import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';

import { config } from '../src/config.js';

export class APIMock {
  app: http.Server | undefined;
  requests: any[] = [];

  async init() {
    const app = express();
    app.use(bodyParser.json());
    app.use('/', (req, _res, next) => {
      this.requests.push({ url: req.url, method: req.method, body: req.body });
      next();
    });
    app.post('/token', (_req, res) => {
      res.status(201);
      res.send('token');
    });
    app.get('/templates/8e1bcc6b-a259-4ab2-8443-0dc74f84ba60', (_req, res) => {
      res.status(200);
      res.send({
        url: config.BASE_URL + '/templates/2ede1fdf-c2a1-48e8-a95a-bc721461b0af',
        name: 'Test',
        description: '',
        configuration: {
          devices: [
            {
              device: config.BASE_URL + '/devices/879297b0-d4bf-40c9-92c4-c0f7a8b01020',
              role: 'pspu',
            },
            {
              device: config.BASE_URL + '/devices/8aaabfd2-5075-4dbb-92d1-ff561ec68269',
              role: 'ecp',
            },
          ],
          roles: [{ name: 'pspu' }, { name: 'ecp' }],
          serviceConfigurations: [],
        },
      });
    });
    app.post('/experiments?', (_req, res) => {
      res.status(201);
      res.send({
        url: config.BASE_URL + '/experiments/cc384616-9c1a-4d56-bad7-a605df71acd3',
        status: 'created',
        bookingTime: {
          startTime: '2024-09-24T17:43:08.296Z',
          endTime: '2024-09-24T18:43:08.296Z',
        },
        devices: [
          {
            device: config.BASE_URL + '/devices/8aaabfd2-5075-4dbb-92d1-ff561ec68269',
            role: 'ecp',
          },
          {
            device: config.BASE_URL + '/devices/879297b0-d4bf-40c9-92c4-c0f7a8b01020',
            role: 'pspu',
          },
        ],
        roles: [{ name: 'ecp' }, { name: 'pspu' }],
        connections: [],
        serviceConfigurations: [],
        instantiatedDevices: [],
      });
    });
    app.patch('/experiments/cc384616-9c1a-4d56-bad7-a605df71acd3?', (_req, res) => {
      res.status(200);
      res.send({
        url: config.BASE_URL + '/experiments/cc384616-9c1a-4d56-bad7-a605df71acd3',
        status: 'created',
        bookingTime: {
          startTime: '2024-09-24T17:43:08.296Z',
          endTime: '2024-09-24T18:43:08.296Z',
        },
        devices: [
          {
            device: config.BASE_URL + '/devices/8aaabfd2-5075-4dbb-92d1-ff561ec68269',
            role: 'ecp',
          },
          {
            device: config.BASE_URL + '/devices/879297b0-d4bf-40c9-92c4-c0f7a8b01020',
            role: 'pspu',
          },
        ],
        roles: [{ name: 'ecp' }, { name: 'pspu' }],
        connections: [],
        serviceConfigurations: [],
        instantiatedDevices: [],
      });
    });
    app.use('/', (_req, res) => {
      res.status(500);
      res.send('Url not mocked');
    });

    app.listen(4000);
  }

  close() {
    if (this.app) {
      this.app.closeAllConnections();
      this.app.close();
    }
  }
}
