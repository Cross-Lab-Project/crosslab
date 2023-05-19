import express from 'express';
import * as http from 'http';

var device_server: http.Server;
var proxy_warning_server: http.Server;

export var fakeServerConfig = {
    device_service_status: 200,
    device_wrong_device: false,
    device_single_is_group: false,
    proxy_server_status: 200,
    proxy_schedule_short_body: false,
    proxy_schedule_wrong_device: false,
    proxy_device_service_status: 200,
};

export async function startFakeServer() {
            resetFakeServerVars();

            // Proxy warning
            let app: express.Application = express();

            app.get('*', (req, res) => {
                console.log("Proxy access wrong");
                res.status(405).send();
            });
    
            app.post('*', (req, res) => {
                console.log("Proxy access wrong");
                res.status(405).send();
            });
            proxy_warning_server = app.listen(10802)
    
            // Fake Server
            app = express();
    
            app.use(express.json());
    
            app.get('/devices/00000000-0000-0000-0000-000000000001', (req, res) => {
                switch (fakeServerConfig.device_service_status) {
                    case 200:
                        if (fakeServerConfig.device_wrong_device) {
                            res.send('{"url": "http://localhost:10801/devices/00000000-0000-0000-0000-111111111110", "name": "Test Group", "description": "Test group for unit tests", "type": "group", "owner": "http://localhost", "devices": [{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"}, {"url": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000"}]}');
                            return;
                        }
                        res.send('{"url": "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001", "name": "Test Group", "description": "Test group for unit tests", "type": "group", "owner": "http://localhost", "devices": [{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"}, {"url": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000"}]}');
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
                        res.status(fakeServerConfig.proxy_server_status).send("Undefined error" + fakeServerConfig.proxy_server_status);
                        return;
                };
            });
    
    
            app.get('/devices/00000000-0000-0000-0000-000000000002', (req, res) => {
                switch (fakeServerConfig.device_service_status) {
                    case 200:
                        res.send('{"url": "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002", "name": "Test Group 2", "description": "Test group two for unit tests", "type": "group", "owner": "http://localhost", "devices": [{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"}, {"url": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000"}]}');
                        return;
                    case 404:
                        res.status(404).send();
                        return;
                    case 500:
                        res.status(500).send();
                        return;
                    case 503:
                        res.status(503).send();
                        return
                    default:
                        res.status(fakeServerConfig.proxy_server_status).send("Undefined error" + fakeServerConfig.proxy_server_status);
                        return;
                };
            });
    
            app.get('/devices/10000000-0000-0000-0000-000000000000', (req, res) => {
                switch (fakeServerConfig.device_service_status) {
                    case 200:
                        if (fakeServerConfig.device_single_is_group) {
                            res.send('{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000", "name": "Test Group 2", "description": "Test group two for unit tests", "type": "group", "owner": "http://localhost", "devices": [{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"}, {"url": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000"}]}');
                            return;
                        }
                        res.send('{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000", "name": "Test Device", "description": "Test device for unit tests", "type": "device", "owner": "http://localhost", "connected": true, "announcedAvailability": [{"start":"1999-01-01T00:00:00Z", "end": "1999-12-31T23:59:59Z"},{"start": "2022-06-20T00:00:00Z", "end": "2022-06-27T06:00:00Z"}, {"start": "2022-06-27T07:00:00Z", "end": "2022-07-01T23:59:59Z"}]}');
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
                        res.status(fakeServerConfig.proxy_server_status).send("Undefined error" + fakeServerConfig.proxy_server_status);
                        return;
                };
            });
    
            app.post('/proxy', (req, res) => {
                if (typeof (req.query.URL) !== "string") {
                    console.log("query URL is not string:", req.query.URL);
                    res.status(999).send("query URL is not string: " + req.query.URL);
                    return
                }
                if (req.query.URL.includes("/schedule")) {
                    switch (fakeServerConfig.proxy_server_status) {
                        case 200:
                            if (fakeServerConfig.proxy_schedule_short_body) {
                                res.send('[{"Device": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000","Free":[],"Booked":[{"Start": "' + req.body.Time.Start + '","End": "' + req.body.Time.End + '"}]}]');
                            } else if (fakeServerConfig.proxy_schedule_wrong_device) {
                                res.send('[{"Device": "http://127.0.0.1:10802/devices/0aaaaaaa-0000-0000-0000-000000000000","Free":[],"Booked":[{"Start": "' + req.body.Time.Start + '","End": "' + req.body.Time.End + '"}]},{"Device": "http://127.0.0.1:10802/devices/wrong","Free":[],"Booked":[{"Start": "' + req.body.Time.Start + '","End": "' + req.body.Time.End + '"}]}]');
                            } else {
                                res.send('[{"Device": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000","Free":[],"Booked":[{"Start": "' + req.body.Time.Start + '","End": "' + req.body.Time.End + '"}]},{"Device": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000","Free":[],"Booked":[{"Start": "' + req.body.Time.Start + '","End": "' + req.body.Time.End + '"}]}]');
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
                            res.status(fakeServerConfig.proxy_server_status).send("\"http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000\"");
                            return;
                        default:
                            res.status(fakeServerConfig.proxy_server_status).send("Undefined error" + fakeServerConfig.proxy_server_status);
                            return;
                    };
                } else {
                    console.log("unknown request to proxy (post):", req.query);
                    res.status(999).send("");
                }
            });
    
            app.get('/proxy', (req, res) => {
                if (typeof (req.query.URL) !== "string") {
                    console.log("query URL is not string:", req.query.URL);
                    res.status(999).send("query URL is not string: " + req.query.URL);
                    return
                }
                if (req.query.URL.includes("/devices/a0000000")) {
                    switch (fakeServerConfig.proxy_device_service_status) {
                        case 200:
                            res.send('{"url": "http://localhost:10801/devices/a0000000-0000-0000-0000-000000000000", "name": "Remote Fake", "description": "Remote Fake test device for unit tests", "type": "device", "owner": "http://127.0.0.1:10802/", "connected": true, "announcedAvailability": [{"start": "2022-06-20T00:00:00Z", "end": "2022-06-27T06:00:00Z"}, {"start": "2022-06-27T07:00:00Z", "end": "2022-07-01T23:59:59Z"}]}');
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
                            res.status(fakeServerConfig.proxy_server_status).send("Undefined error" + fakeServerConfig.proxy_server_status);
                            return;
                    };
                } else {
                    console.log("unknown request to proxy (get):", req.query);
                    res.status(999).send("");
                }
            });
    
    
            app.all('*', (req, res) => {
                console.log("Fake server got unknown request:", req.path, req.method);
            });
            device_server = app.listen(10801);    
};

export async function stopFakeServer() {
    device_server.close();
        device_server = undefined;
        proxy_warning_server.close();
        proxy_warning_server = undefined;
};

export function resetFakeServerVars() {
    fakeServerConfig.device_service_status = 200;
    fakeServerConfig.device_wrong_device = false;
    fakeServerConfig.device_single_is_group = false;
    fakeServerConfig.proxy_server_status = 200;
    fakeServerConfig.proxy_schedule_short_body = false;
    fakeServerConfig.proxy_schedule_wrong_device = false;
    fakeServerConfig.proxy_device_service_status = 200;
};

export function getFakeOwnURL(): string {
    return "http://localhost:10801";
};

export function getFakeInstitutePrefix(): string[] {
    return ["http://localhost:10801"];
};

export function getFakeServerPort() : number {
    return 10801;
};

export function getFakeServerProxyPort() : number {
    return 10802;
};
