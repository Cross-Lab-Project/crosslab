import * as mocha from "mocha";
import express from 'express';
import * as http from 'http';
import * as mysql from 'mysql2/promise';
import dayjs from "dayjs";

import { postBookingSchedule, getTimetables } from "./operations/booking"
import { config } from "../../common/config";

let device_server: http.Server;
let device_service_status = 200;
let device_wrong_device = false;
let device_single_is_group = false;
let proxy_server_status = 200;
let proxy_schedule_short_body = false;
let proxy_schedule_wrong_device = false;
let proxy_device_service_status = 200;

mocha.describe("operations.ts", function () {
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
                default:
                    res.status(proxy_server_status).send("Undefined error" + proxy_server_status);
                    return;
            };
        });

        app.get('/devices/10000000-0000-0000-0000-000000000000', (req, res) => {
            switch (device_service_status) {
                case 200:
                    if(device_single_is_group) {
                        res.send('{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000", "name": "Test Group 2", "description": "Test group two for unit tests", "type": "group", "owner": "http://localhost", "devices": [{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"}, {"url": "http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000"}]}');
                        return;    
                    }
                    res.send('{"url": "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000", "name": "Test Device", "description": "Test device for unit tests", "type": "device", "owner": "http://localhost", "connected": true, "announcedAvailability": [{"start": "2022-06-20T00:00:00Z", "end": "2022-06-27T06:00:00Z"}, {"start": "2022-06-27T07:00:00Z", "end": "2022-07-01T23:59:59Z"}]}');
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

    mocha.it("postBookingSchedule (no error case)", async function () {
        let correctFree = [{ Start: "2022-06-25T00:00:00Z", End: "2022-06-27T00:10:00Z" }, { Start: "2022-06-27T00:30:00Z", End: "2022-06-27T01:00:00Z" }, { Start: "2022-06-27T02:00:00Z", End: "2022-06-27T06:00:00Z" }, { Start: "2022-06-27T07:00:00Z", End: "2022-06-28T23:59:59Z" }]
        let correctBooked = [{ Start: "2022-06-27T00:10:00Z", End: "2022-06-27T00:30:00Z" }, { Start: "2022-06-27T01:00:00Z", End: "2022-06-27T02:00:00Z" }, { Start: "2022-06-27T06:00:00Z", End: "2022-06-27T07:00:00Z" }]

        let r = await postBookingSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { username: "test", role: "", scopes: [""] });
        if (r.status !== 200) {
            throw Error("Response error: " + r.body.status);
        }
        if (r.body.length != 2) {
            throw Error("Body has wrong length, should 2, is " + r.body.length);
        }

        for (let i = 0; i < r.body.length; i++) {
            if (i === 0) {
                if (r.body[i].Device !== "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001") {
                    throw Error("Device 1 is " + r.body[i].Device);
                }
            } else {
                if (r.body[i].Device !== "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002") {
                    throw Error("Device " + i + " is " + r.body[i].Device);
                }
            }

            if (r.body[i].Booked.length !== correctBooked.length) {
                console.log(r.body[i].Booked);
                throw Error("Device " + i + " Booked has length " + r.body[i].Booked.length);
            }

            if (r.body[i].Free.length !== correctFree.length) {
                console.log(r.body[i].Free);
                throw Error("Device " + i + " Free has length " + r.body[i].Free.length);
            }

            for (let j = 0; j < correctBooked.length; j++) {
                if (!dayjs(r.body[i].Booked[j].Start).isSame(dayjs(correctBooked[j].Start))) {
                    throw Error("Device " + i + " Booked.Start " + j + " is wrong, should " + correctBooked[j].Start + " is " + r.body[i].Booked[j].Start);
                }

                if (!dayjs(r.body[i].Booked[j].End).isSame(dayjs(correctBooked[j].End))) {
                    throw Error("Device " + i + " Booked.End " + j + " is wrong, should " + correctBooked[j].End + " is " + r.body[i].Booked[j].End);
                }
            }

            for (let j = 0; j < correctFree.length; j++) {
                if (!dayjs(r.body[i].Free[j].Start).isSame(dayjs(correctFree[j].Start))) {
                    throw Error("Device " + i + " Free.Start " + j + " is wrong, should " + correctFree[j].Start + " is " + r.body[i].Free[j].Start);
                }
            }

            for (let j = 0; j < correctFree.length; j++) {
                if (!dayjs(r.body[i].Free[j].End).isSame(dayjs(correctFree[j].End))) {
                    throw Error("Device " + i + " Free.End " + j + " is wrong, should " + correctFree[j].End + " is " + r.body[i].Free[j].End);
                }
            }
        }

        r = await postBookingSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: true, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { username: "test", role: "", scopes: [""] });
        if (r.status !== 200) {
            throw Error("Response error: " + r.body.status);
        }

        if (r.body.length != 1) {
            throw Error("Body has wrong length, should 1, is " + r.body.length);
        }

        if (r.body[0].Device !== "<combined>") {
            throw Error("Device is " + r.body[0].Device);
        }


        if (r.body[0].Booked.length !== correctBooked.length) {
            console.log(r.body[0].Booked);
            throw Error("Device Booked has length " + r.body[0].Booked.length);
        }

        if (r.body[0].Free.length !== correctFree.length) {
            console.log(r.body[0].Free);
            throw Error("Device Free has length " + r.body[0].Free.length);
        }

        for (let j = 0; j < correctBooked.length; j++) {
            if (!dayjs(r.body[0].Booked[j].Start).isSame(dayjs(correctBooked[j].Start))) {
                throw Error("Device Booked.Start " + j + " is wrong, should " + correctBooked[j].Start + " is " + r.body[0].Booked[j].Start);
            }

            if (!dayjs(r.body[0].Booked[j].End).isSame(dayjs(correctBooked[j].End))) {
                throw Error("Device Booked.End " + j + " is wrong, should " + correctBooked[j].End + " is " + r.body[0].Booked[j].End);
            }
        }

        for (let j = 0; j < correctFree.length; j++) {
            if (!dayjs(r.body[0].Free[j].Start).isSame(dayjs(correctFree[j].Start))) {
                throw Error("Device Free.Start " + j + " is wrong, should " + correctFree[j].Start + " is " + r.body[0].Free[j].Start);
            }
        }

        for (let j = 0; j < correctFree.length; j++) {
            if (!dayjs(r.body[0].Free[j].End).isSame(dayjs(correctFree[j].End))) {
                throw Error("Device Free.End " + j + " is wrong, should " + correctFree[j].End + " is " + r.body[0].Free[j].End);
            }
        }

        r = await postBookingSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { username: "test", role: "", scopes: [""] });
        if (r.status !== 200) {
            throw Error("Response error: " + r.body.status);
        }

        if (r.body.length != 1) {
            throw Error("Body has wrong length, should 1, is " + r.body.length);
        }

        if (r.body[0].Device !== "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000") {
            throw Error("Device is " + r.body[0].Device);
        }


        if (r.body[0].Booked.length !== correctBooked.length) {
            console.log(r.body[0].Booked);
            throw Error("Device Booked has length " + r.body[0].Booked.length);
        }

        if (r.body[0].Free.length !== correctFree.length) {
            console.log(r.body[0].Free);
            throw Error("Device Free has length " + r.body[0].Free.length);
        }

        for (let j = 0; j < correctBooked.length; j++) {
            if (!dayjs(r.body[0].Booked[j].Start).isSame(dayjs(correctBooked[j].Start))) {
                throw Error("Device Booked.Start " + j + " is wrong, should " + correctBooked[j].Start + " is " + r.body[0].Booked[j].Start);
            }

            if (!dayjs(r.body[0].Booked[j].End).isSame(dayjs(correctBooked[j].End))) {
                throw Error("Device Booked.End " + j + " is wrong, should " + correctBooked[j].End + " is " + r.body[0].Booked[j].End);
            }
        }

        for (let j = 0; j < correctFree.length; j++) {
            if (!dayjs(r.body[0].Free[j].Start).isSame(dayjs(correctFree[j].Start))) {
                throw Error("Device Free.Start " + j + " is wrong, should " + correctFree[j].Start + " is " + r.body[0].Free[j].Start);
            }
        }

        for (let j = 0; j < correctFree.length; j++) {
            if (!dayjs(r.body[0].Free[j].End).isSame(dayjs(correctFree[j].End))) {
                throw Error("Device Free.End " + j + " is wrong, should " + correctFree[j].End + " is " + r.body[0].Free[j].End);
            }
        }
    });
    mocha.it("postBookingSchedule (remote error case)", async function () {
        this.timeout(10000);

        // Case device overloaded
        /*
        device_service_status = 503;
        proxy_server_status = 200;

        let r = await postBookingSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { username: "test", role: "", scopes: [""] });
        if (r.status !== 503) {
            throw Error("Response error (device overloaded): " + r.status);
        }
        */

        // Case proxy device overloaded
        /*
        device_service_status = 200;
        proxy_server_status = 200;
        proxy_device_service_status = 503;

        let r = await postBookingSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { username: "test", role: "", scopes: [""] });
        if (r.status !== 503) {
            throw Error("Response error (device overloaded): " + r.status);
        }
        */

        // Case device wrong device
        device_service_status = 200;
        proxy_server_status = 200;
        proxy_device_service_status = 200;
        device_wrong_device = true;

        let r = await postBookingSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { username: "test", role: "", scopes: [""] });
        if (r.status !== 500) {
            throw Error("Response error (device wrong device): " + r.status);
        }

        // Case device is group
        device_service_status = 200;
        proxy_server_status = 200;
        proxy_device_service_status = 200;
        device_wrong_device = false;
        device_single_is_group = true;

        r = await postBookingSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { username: "test", role: "", scopes: [""] });
        if (r.status !== 500) {
            throw Error("Response error (device is group): " + r.status);
        }

        // Case schedule overloaded
        device_service_status = 200;
        proxy_server_status = 503;
        proxy_device_service_status = 200;
        device_single_is_group = false;

        r = await postBookingSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { username: "test", role: "", scopes: [""] });
        if (r.status !== 503) {
            throw Error("Response error (proxy overloaded): " + r.status);
        }

        // Schedule not found
        device_service_status = 200;
        proxy_server_status = 404;

        r = await postBookingSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { username: "test", role: "", scopes: [""] });
        if (r.status !== 404) {
            throw Error("Response error (proxy 404): " + r.status);
        }

        // Case proxy device generic error
        /*
        device_service_status = 200;
        proxy_server_status = 200;
        proxy_device_service_status = 500;

        let r = await postBookingSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { username: "test", role: "", scopes: [""] });
        if (r.status !== 503) {
            throw Error("Response error (device generic error): " + r.status);
        }
        */


        // Case device generic error
        /*
        device_service_status = 500;
        proxy_server_status = 200;
        proxy_device_service_status = 200;

        let r = await postBookingSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { username: "test", role: "", scopes: [""] });
        if (r.status !== 503) {
            throw Error("Response error (device generic error): " + r.status);
        }
        */

        // Schedule generic error
        device_service_status = 200;
        proxy_server_status = 500;
        proxy_device_service_status = 200;

        r = await postBookingSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { username: "test", role: "", scopes: [""] });
        if (r.status !== 500) {
            throw Error("Response error (proxy 500): " + r.status);
        }

        // Schedule wrong number of devices
        device_service_status = 200;
        proxy_server_status = 200;
        proxy_schedule_short_body = true;

        r = await postBookingSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { username: "test", role: "", scopes: [""] });
        if (r.status !== 500) {
            throw Error("Response error (wrong number of devices): " + r.status);
        }

        // Schedule wrong devices
        device_service_status = 200;
        proxy_server_status = 200;
        proxy_schedule_short_body = false;
        proxy_schedule_wrong_device = true

        r = await postBookingSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { username: "test", role: "", scopes: [""] });
        if (r.status !== 500) {
            throw Error("Response error (wrong devices): " + r.status);
        }
    });

    mocha.it("postBookingSchedule (bad requests)", async function () {
        this.timeout(10000);

        let r = await postBookingSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: true }, { username: "test", role: "", scopes: [""] });
        if (r.status !== 400) {
            throw Error("Response error (onlyOwn wrong usage): " + r.status);
        }
    });

    mocha.it("getTimetables", async function () {
        let r = await getTimetables(new URL("http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"), "2022-06-25T00:00:00", "2022-06-28T23:59:59");
        if (r.length !== 2) {
            throw new Error("r should have 2 elements, has " + r.length);
        }
        if (!dayjs(r[0].Start).isSame(dayjs("2022-06-27T00:10:00Z"))) {
            throw new Error("r[0].Start is " + r[0].Start)
        }
        if (!dayjs((r[0].End)).isSame(dayjs("2022-06-27T00:30:00Z"))) {
            throw new Error("r[0].End is " + r[0].End)
        }

        if (!dayjs(r[1].Start).isSame(dayjs("2022-06-27T01:00:00Z"))) {
            throw new Error("r[1].Start is " + r[1].Start)
        }
        if (!dayjs(r[1].End).isSame(dayjs("2022-06-27T02:00:00Z"))) {
            throw new Error("r[1].End is " + r[1].End)
        }
    });
});

