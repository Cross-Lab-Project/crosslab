import express from 'express';
import * as http from 'http';

var device_server: http.Server;
var proxy_warning_server: http.Server;

var running: boolean = false;

export var fakeServerConfig = {
  device_service_status: 200,
  device_wrong_device: false,
  device_single_is_group: false,
  device_not_available: false,
  proxy_server_status: 200,
  proxy_schedule_short_body: false,
  proxy_schedule_wrong_device: false,
  proxy_schedule_empty: false,
  proxy_device_service_status: 200,
  schedule_service_status: 200,
  schedule_service_booked: false,
  callback_test_local_single_was_called: false,
  callback_test_local_two_first_was_called: false,
  callback_test_local_two_second_was_called: false,
  callback_test_local_group_was_called: false,
  callback_test_remote_single_was_called: false,
  booking_status: 'booked',
};

export async function startFakeServer() {
  if (running) {
    throw Error('fakeserver already started');
  }
  running = true;
  resetFakeServerVars();

  // Proxy warning
  let app: express.Application = express();

  app.get('*', (req, res) => {
    console.log('Proxy access wrong');
    res.status(405).send();
  });

  app.post('*', (req, res) => {
    console.log('Proxy access wrong');
    res.status(405).send();
  });
  proxy_warning_server = app.listen(10802);

  // Fake Server
  app = express();

  app.use(express.json());

  app.get('/devices/00000000-0000-0000-0000-000000000001', (req, res) => {
    switch (fakeServerConfig.device_service_status) {
      case 200:
        if (fakeServerConfig.device_wrong_device) {
          res.send(
            '{"url": "http://localhost:10801/devices/00000000-0000-0000-0000-111111111110", "name": "Test Group", "description": "Test group for unit tests", "type": "group", "devices": [{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"}, {"url": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000"}], "isPublic": true}',
          );
          return;
        }
        res.send(
          '{"url": "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001", "name": "Test Group", "description": "Test group for unit tests", "type": "group", "devices": [{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"}, {"url": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000"}], "isPublic": true}',
        );
      case 404:
        res.status(404).send();
        return;
      case 500:
        res.status(500).send();
        return;
      case 503:
        res.status(503).send();
        return;
      default:
        res
          .status(fakeServerConfig.device_service_status)
          .send('Undefined error' + fakeServerConfig.device_service_status);
        return;
    }
  });

  app.get('/devices/00000000-0000-0000-0000-000000000002', (req, res) => {
    switch (fakeServerConfig.device_service_status) {
      case 200:
        res.send(
          '{"url": "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002", "name": "Test Group 2", "description": "Test group two for unit tests", "type": "group", "devices": [{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"}, {"url": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000"}], "isPublic": true}',
        );
        return;
      case 404:
        res.status(404).send();
        return;
      case 500:
        res.status(500).send();
        return;
      case 503:
        res.status(503).send();
        return;
      default:
        res
          .status(fakeServerConfig.device_service_status)
          .send('Undefined error' + fakeServerConfig.device_service_status);
        return;
    }
  });

  app.get('/devices/00000000-0000-0000-0000-000000000010', (req, res) => {
    switch (fakeServerConfig.device_service_status) {
      case 200:
        res.send(
          '{"url": "http://localhost:10801/devices/00000000-0000-0000-0000-000000000010", "name": "Test Group Booking", "description": "Test group containing two local devices. Used in booking-backend/bookng-frontend tests.", "type": "group", "devices": [{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"}, {"url": "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000"}], "isPublic": true}',
        );
        return;
      case 404:
        res.status(404).send();
        return;
      case 500:
        res.status(500).send();
        return;
      case 503:
        res.status(503).send();
        return;
      default:
        res
          .status(fakeServerConfig.device_service_status)
          .send('Undefined error' + fakeServerConfig.device_service_status);
        return;
    }
  });

  app.get('/devices/10000000-0000-0000-0000-000000000000', (req, res) => {
    switch (fakeServerConfig.device_service_status) {
      case 200:
        if (fakeServerConfig.device_single_is_group) {
          res.send(
            '{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000", "name": "Test Group 2", "description": "Test group two for unit tests", "type": "group", "devices": [{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"}, {"url": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000"}], "isPublic": true}',
          );
          return;
        }
        if (fakeServerConfig.device_not_available) {
          res.send(
            '{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000", "name": "Test Device", "description": "Test device for unit tests", "type": "device", "connected": true, "announcedAvailability": [], "isPublic": true}',
          );
          return;
        }
        res.send(
          '{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000", "name": "Test Device", "description": "Test device for unit tests", "type": "device", "connected": true, "announcedAvailability": [{"start":"1999-01-01T00:00:00Z", "end": "1999-12-31T23:59:59Z"},{"start": "2022-06-20T00:00:00Z", "end": "2022-06-27T06:00:00Z"}, {"start": "2022-06-27T07:00:00Z", "end": "2022-07-01T23:59:59Z"}], "isPublic": true}',
        );
        return;
      case 404:
        res.status(404).send();
        return;
      case 500:
        res.status(500).send();
        return;
      case 503:
        res.status(503).send();
        return;
      default:
        res
          .status(fakeServerConfig.device_service_status)
          .send('Undefined error' + fakeServerConfig.device_service_status);
        return;
    }
  });

  app.get('/devices/20000000-0000-0000-0000-000000000000', (req, res) => {
    switch (fakeServerConfig.device_service_status) {
      case 200:
        if (fakeServerConfig.device_single_is_group) {
          res.send(
            '{"url": "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000", "name": "Test Group 3", "description": "Test group two for unit tests", "type": "group", "devices": [{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"}, {"url": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000"}], "isPublic": true}',
          );
          return;
        }
        if (fakeServerConfig.device_not_available) {
          res.send(
            '{"url": "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000", "name": "Test Device 2", "description": "Test device for unit tests", "type": "device", "connected": true, "announcedAvailability": [], "isPublic": true}',
          );
          return;
        }
        res.send(
          '{"url": "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000", "name": "Test Device 2", "description": "Test device for unit tests", "type": "device", "connected": true, "announcedAvailability": [{"start":"1999-01-01T00:00:00Z", "end": "1999-12-31T23:59:59Z"},{"start": "2022-06-20T00:00:00Z", "end": "2022-06-27T06:00:00Z"}, {"start": "2022-06-27T07:00:00Z", "end": "2022-07-01T23:59:59Z"}], "isPublic": true}',
        );
        return;
      case 404:
        res.status(404).send();
        return;
      case 500:
        res.status(500).send();
        return;
      case 503:
        res.status(503).send();
        return;
      default:
        res
          .status(fakeServerConfig.device_service_status)
          .send('Undefined error' + fakeServerConfig.device_service_status);
        return;
    }
  });

  app.get('/test_callbacks/test-local-single', (req, res) => {
    fakeServerConfig.callback_test_local_single_was_called = true;
    res.status(200).send();
  });

  app.get('/test_callbacks/test-local-two-first', (req, res) => {
    fakeServerConfig.callback_test_local_two_first_was_called = true;
    res.status(200).send();
  });

  app.get('/test_callbacks/test-local-two-second', (req, res) => {
    fakeServerConfig.callback_test_local_two_second_was_called = true;
    res.status(200).send();
  });

  app.get('/test_callbacks/test-local-group', (req, res) => {
    fakeServerConfig.callback_test_local_group_was_called = true;
    res.status(200).send();
  });

  app.get('/test_callbacks/test-remote-single', (req, res) => {
    fakeServerConfig.callback_test_remote_single_was_called = true;
    res.status(200).send();
  });

  app.post('/schedule', (req, res) => {
    switch (fakeServerConfig.schedule_service_status) {
      case 200:
        if (fakeServerConfig.schedule_service_booked) {
          res.send(
            '[{"Device": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000","Free":[],"Booked":[{"Start": "' +
              req.body.Time.Start +
              '","End": "' +
              req.body.Time.End +
              '"}]}]',
          );
        } else {
          res.send(
            '[{"Device": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000","Free":[{"Start": "' +
              req.body.Time.Start +
              '","End": "' +
              req.body.Time.End +
              '"}],"Booked":[]}]',
          );
        }
        return;
      case 400:
        res.status(400).send();
      case 401:
        res.status(401).send();
      case 404:
        res.status(404).send('FAKE404');
        return;
      case 422:
        res.status(422).send('FAKE422');
        return;
      case 500:
        res.status(500).send('FAKE500');
        return;
      case 503:
        res.status(503).send();
        return;
      default:
        res
          .status(fakeServerConfig.proxy_server_status)
          .send('Undefined error' + fakeServerConfig.proxy_server_status);
        return;
    }
  });

  app.post('/proxy', (req, res) => {
    if (typeof req.query.URL !== 'string') {
      console.log('query URL is not string:', req.query.URL);
      res.status(999).send('query URL is not string: ' + req.query.URL);
      return;
    }
    if (req.query.URL.includes('/schedule')) {
      switch (fakeServerConfig.proxy_server_status) {
        case 200:
          if (fakeServerConfig.proxy_schedule_short_body) {
            res.send(
              '[{"Device": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000","Free":[],"Booked":[{"Start": "' +
                req.body.Time.Start +
                '","End": "' +
                req.body.Time.End +
                '"}]}]',
            );
          } else if (fakeServerConfig.proxy_schedule_wrong_device) {
            res.send(
              '[{"Device": "http://127.0.0.1:10802/devices/0aaaaaaa-0000-0000-0000-000000000000","Free":[],"Booked":[{"Start": "' +
                req.body.Time.Start +
                '","End": "' +
                req.body.Time.End +
                '"}]},{"Device": "http://127.0.0.1:10802/devices/wrong","Free":[],"Booked":[{"Start": "' +
                req.body.Time.Start +
                '","End": "' +
                req.body.Time.End +
                '"}]}]',
            );
          } else if (fakeServerConfig.proxy_schedule_empty) {
            res.send(
              '[{"Device": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000","Free":[],"Booked":[]}]',
            );
          } else {
            res.send(
              '[{"Device": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000","Free":[],"Booked":[{"Start": "' +
                req.body.Time.Start +
                '","End": "' +
                req.body.Time.End +
                '"}]},{"Device": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000","Free":[],"Booked":[{"Start": "' +
                req.body.Time.Start +
                '","End": "' +
                req.body.Time.End +
                '"}]}]',
            );
          }
          return;
        case 400:
        case 401:
        case 503:
          res.status(fakeServerConfig.proxy_server_status).send();
          return;
        case 500:
          res.status(fakeServerConfig.proxy_server_status).send();
          return;
        case 404:
          res
            .status(fakeServerConfig.proxy_server_status)
            .send(
              '"http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000"',
            );
          return;
        default:
          res
            .status(fakeServerConfig.proxy_server_status)
            .send('Undefined error' + fakeServerConfig.proxy_server_status);
          return;
      }
    } else if (req.query.URL.includes('/booking')) {
      res.status(200).send('{BookingID: "http://127.0.0.1:10802/booking/testremote"}');
    } else {
      console.log('unknown request to proxy (post):', req.query);
      res.status(999).send('');
    }
  });

  app.get('/proxy', (req, res) => {
    if (typeof req.query.URL !== 'string') {
      console.log('query URL is not string:', req.query.URL);
      res.status(999).send('query URL is not string: ' + req.query.URL);
      return;
    }
    if (req.query.URL.includes('/devices/a0000000')) {
      switch (fakeServerConfig.proxy_device_service_status) {
        case 200:
          res.send(
            '{"url": "http://localhost:10801/devices/a0000000-0000-0000-0000-000000000000", "name": "Remote Fake", "description": "Remote Fake test device for unit tests", "type": "device", "connected": true, "announcedAvailability": [{"start": "2022-06-20T00:00:00Z", "end": "2022-06-27T06:00:00Z"}, {"start": "2022-06-27T07:00:00Z", "end": "2022-07-01T23:59:59Z"}], "isPublic": true}',
          );
          return;
        case 404:
          res.status(404).send();
          return;
        case 500:
          res.status(500).send();
          return;
        case 503:
          res.status(503).send();
          return;
        default:
          res
            .status(fakeServerConfig.proxy_server_status)
            .send('Undefined error' + fakeServerConfig.proxy_server_status);
          return;
      }
    } else if (req.query.URL.includes('/booking/testremote')) {
      res.send(
        '{"Booking": { "ID": "http://127.0.0.1:10802/booking/testremote", "Time": { "Start": "1999-04-10T06:00:00Z", "End": "1999-04-10T07:00:00Z"}, "Devices": ["http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000"], "Type": "normal", "Status": "' +
          fakeServerConfig.booking_status +
          '", "You": true, "External": true, "Message": "Fake test booking remote"}, "Locked": false}',
      );
      return;
    } else {
      console.log('unknown request to proxy (get):', req.query);
      res.status(999).send('');
    }
  });

  app.all('*', (req, res) => {
    console.log('Fake server got unknown request:', req.path, req.method);
    res
      .status(999)
      .send('Fake server got unknown request: ' + req.path + ' ' + req.method);
  });
  device_server = app.listen(10801);
}

export async function stopFakeServer() {
  if (!running) {
    throw Error('can not stop fakeserver that is not running.');
  }
  device_server.close();
  device_server = undefined;
  proxy_warning_server.close();
  proxy_warning_server = undefined;
  running = false;
}

export function resetFakeServerVars() {
  fakeServerConfig.device_service_status = 200;
  fakeServerConfig.device_wrong_device = false;
  fakeServerConfig.device_single_is_group = false;
  fakeServerConfig.device_not_available = false;
  fakeServerConfig.proxy_server_status = 200;
  fakeServerConfig.proxy_schedule_short_body = false;
  fakeServerConfig.proxy_schedule_wrong_device = false;
  fakeServerConfig.proxy_device_service_status = 200;
  fakeServerConfig.proxy_schedule_empty = false;
  fakeServerConfig.schedule_service_status = 200;
  fakeServerConfig.schedule_service_booked = false;
  fakeServerConfig.callback_test_local_single_was_called = false;
  fakeServerConfig.callback_test_local_two_first_was_called = false;
  fakeServerConfig.callback_test_local_two_second_was_called = false;
  fakeServerConfig.callback_test_local_group_was_called = false;
  fakeServerConfig.callback_test_remote_single_was_called = false;
  fakeServerConfig.booking_status = 'booked';
}

export function getFakeOwnURL(): string {
  return 'http://localhost:10801';
}

export function getFakeInstitutePrefix(): string[] {
  return ['http://localhost:10801'];
}

export function getFakeServerPort(): number {
  return 10801;
}

export function getFakeServerProxyPort(): number {
  return 10802;
}
