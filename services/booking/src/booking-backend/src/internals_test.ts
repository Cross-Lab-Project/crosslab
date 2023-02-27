
/*
import * as mocha from "mocha";
import express from 'express';
import * as http from 'http';
import * as mysql from 'mysql2/promise';
import dayjs from "dayjs";

import { config } from "../../common/config";
import { randomID } from "./internal";

mocha.describe("internal.ts", function () {
    this.timeout(10000);

    mocha.before(function () {
        // Config
        config.OwnURL = "http://localhost:10801";
        config.InstitutePrefix = ["http://localhost:10801"];
        config.ReservationDSN = "mysql://test:test@localhost/unittest?supportBigNumbers=true&bigNumberStrings=true";

        // Fake Server
        let app: express.Application = express();

        app.use(express.json());

        app.get('/devices/00000000-0000-0000-0000-000000000001', (req, res) => {
            switch (device_service_status) {
                case 200:
                    if (device_wrong_device) {
                        res.send('{"url": "http://localhost:10801/devices/00000000-0000-0000-0000-111111111110", "name": "Test Group", "description": "Test group for unit tests", "type": "group", "owner": "http://localhost", "devices": [{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"}, {"url": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000"}]}');
                        return;
                    }
                    res.send('{"url": "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001", "name": "Test Group", "description": "Test group for unit tests", "type": "group", "owner": "http://localhost", "devices": [{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"}, {"url": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000"}]}');
                case 404:
                    res.status(404).send();
                    return;
                default:
                    res.status(proxy_server_status).send("Undefined error" + proxy_server_status);
                    return;
            };
        });


        app.get('/devices/00000000-0000-0000-0000-000000000002', (req, res) => {
            switch (device_service_status) {
                case 200:
                    res.send('{"url": "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002", "name": "Test Group 2", "description": "Test group two for unit tests", "type": "group", "owner": "http://localhost", "devices": [{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"}, {"url": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000"}]}');
                    return;
                case 404:
                    res.status(404).send();
                    return;
                default:
                    res.status(proxy_server_status).send("Undefined error" + proxy_server_status);
                    return;
            };
        });

        app.get('/devices/10000000-0000-0000-0000-000000000000', (req, res) => {
            switch (device_service_status) {
                case 200:
                    if (device_single_is_group) {
                        res.send('{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000", "name": "Test Group 2", "description": "Test group two for unit tests", "type": "group", "owner": "http://localhost", "devices": [{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"}, {"url": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000"}]}');
                        return;
                    }
                    res.send('{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000", "name": "Test Device", "description": "Test device for unit tests", "type": "device", "owner": "http://localhost", "connected": true, "announcedAvailability": [{"start":"1999-01-01T00:00:00Z", "end": "1999-12-31T23:59:59Z"},{"start": "2022-06-20T00:00:00Z", "end": "2022-06-27T06:00:00Z"}, {"start": "2022-06-27T07:00:00Z", "end": "2022-07-01T23:59:59Z"}]}');
                    return;
                case 404:
                    res.status(404).send();
                    return;
                default:
                    res.status(proxy_server_status).send("Undefined error" + proxy_server_status);
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
                switch (proxy_server_status) {
                    case 200:
                        if (proxy_schedule_short_body) {
                            res.send('[{"Device": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000","Free":[],"Booked":[{"Start": "' + req.body.Time.Start + '","End": "' + req.body.Time.End + '"}]}]');
                        } else if (proxy_schedule_wrong_device) {
                            res.send('[{"Device": "http://127.0.0.1:10802/devices/0aaaaaaa-0000-0000-0000-000000000000","Free":[],"Booked":[{"Start": "' + req.body.Time.Start + '","End": "' + req.body.Time.End + '"}]},{"Device": "http://127.0.0.1:10802/devices/wrong","Free":[],"Booked":[{"Start": "' + req.body.Time.Start + '","End": "' + req.body.Time.End + '"}]}]');
                        } else {
                            res.send('[{"Device": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000","Free":[],"Booked":[{"Start": "' + req.body.Time.Start + '","End": "' + req.body.Time.End + '"}]},{"Device": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000","Free":[],"Booked":[{"Start": "' + req.body.Time.Start + '","End": "' + req.body.Time.End + '"}]}]');
                        }
                        return;
                    case 400:
                    case 401:
                    case 503:
                        res.status(proxy_server_status).send();
                        return;
                    case 500:
                        res.status(proxy_server_status).send("Faking error" + proxy_server_status);
                        return;
                    case 404:
                        res.status(proxy_server_status).send("[\"http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000\"]");
                        return;
                    default:
                        res.status(proxy_server_status).send("Undefined error" + proxy_server_status);
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
                switch (proxy_device_service_status) {
                    case 200:
                        res.send('{"url": "http://localhost:10801/devices/a0000000-0000-0000-0000-000000000000", "name": "Remote Fake", "description": "Remote Fake test device for unit tests", "type": "device", "owner": "http://127.0.0.1:10802/", "connected": true, "announcedAvailability": [{"start": "2022-06-20T00:00:00Z", "end": "2022-06-27T06:00:00Z"}, {"start": "2022-06-27T07:00:00Z", "end": "2022-07-01T23:59:59Z"}]}');
                        return;
                    default:
                        res.status(proxy_server_status).send("Undefined error" + proxy_server_status);
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
    });

    mocha.after(function () {
        device_server.close();
        device_server = undefined;
    });

    mocha.beforeEach(async function () {
        // Reset server status
        proxy_server_status = 200;
        device_wrong_device = false;
        device_single_is_group = false;
        device_service_status = 200;
        proxy_schedule_short_body = false;
        proxy_schedule_wrong_device = false;
        proxy_device_service_status = 200;

        // Setup database
        try {
            let db = await mysql.createConnection(config.ReservationDSN);
            await db.connect();
            await db.execute("CREATE TABLE reservation (`id` BIGINT UNSIGNED AUTO_INCREMENT, `device` TEXT NOT NULL, `start` DATETIME NOT NULL, `end` DATETIME NOT NULL, `bookingreference` TEXT NOT NULL, PRIMARY KEY (`id`))");
            await db.execute("INSERT INTO reservation (`device`, `start`, `end`, `bookingreference`) VALUES (?,?,?,?)", ["http://localhost:10801/devices/10000000-0000-0000-0000-000000000000", dayjs("2022-06-27T00:10:00Z").toDate(), dayjs("2022-06-27T00:20:00Z").toDate(), "unit test"]);
            await db.execute("INSERT INTO reservation (`device`, `start`, `end`, `bookingreference`) VALUES (?,?,?,?)", ["http://localhost:10801/devices/10000000-0000-0000-0000-000000000000", dayjs("2022-06-27T00:20:00Z").toDate(), dayjs("2022-06-27T00:30:00Z").toDate(), "unit test"]);
            await db.execute("INSERT INTO reservation (`device`, `start`, `end`, `bookingreference`) VALUES (?,?,?,?)", ["http://localhost:10801/devices/10000000-0000-0000-0000-000000000000", dayjs("2022-06-27T01:00:00Z").toDate(), dayjs("2022-06-27T02:00:00Z").toDate(), "unit test"]);
            db.end();
        } catch (err) {
            console.log("error in test setup:", err);
            throw err;
        }
    });

    mocha.afterEach(async function () {
        let db = await mysql.createConnection(config.ReservationDSN);
        await db.connect();
        await db.execute("DROP TABLE reservation");
        db.end();
    });

    mocha.it("randomID()", async () => {
        let ids: string[] = [];
        for(let i = 0; i < 10000; i++) {
            let newID = randomID()
            for(let j = 0; j < ids.length; j++) {
                if(newID === ids[j]) {
                    throw new Error("Found identical ID!");
                }
            }
            ids.push(newID)
        }
    });

    mocha.it("reservateDevice() local", async () => {
    });

    mocha.it("reservateDevice() remote", async () => {
    });
});
*/