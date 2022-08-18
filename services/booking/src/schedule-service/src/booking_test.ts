import * as mocha from "mocha";
import express from 'express';
import * as http from 'http';
import * as mysql from 'mysql2/promise';

import { postBookingSchedule } from "./operations/booking"
import { config } from "../../common/config";

let device_server: http.Server;
let device_service_status = 200;
let proxy_server_status = 200;

mocha.describe("operations.ts", function () {
    mocha.before(function () {
        // Config
        config.OwnURL = "http://localhost:10801";
        config.InstitutePrefix = ["http://localhost:10801"];
        config.ReservationDSN = "mysql://test:test@localhost/unittest?supportBigNumbers=true&bigNumberStrings=true";

        // Fake Server
        let app: express.Application = express();
        app.get('/devices', (req, res) => {
            if (device_service_status == 200) {
                res.send('[{"url": "http://localhost/device/superDevice","name": "Test Device 1","description": "Test Device 1","type": "device","owner": "http://localhost"},{"url": "http://127.0.0.1:10802/device/remoteFake","name": "Test Device 2","description": "Test Device 2","type": "device","owner": "http://127.0.0.1:10802/"}]');
                return;
            };
            res.status(device_service_status).send("[]");
        });

        app.post('/proxy', (req, res) => {
            if (req.path.includes("/device/")) {
                let json = JSON.parse(req.body);
                if (proxy_server_status == 200) {
                    res.send('[{"Device": "http://127.0.0.1:10802/device/remoteFake","Booked": [],"Free": [{"Start": "' + json.Time.Start + '","End": "' + json.Time.End + '"}]}]');
                    return;
                };
                res.status(proxy_server_status).send("Faking error" + proxy_server_status);
            } else {
                console.log("unknown request to proxy:", req.path);
                res.status(999).send("unknown request to proxy: " + req.path);
            }
        });

        app.all('*', (req, res) => {
            console.log("Device: unknown request:", req.path)
        });
        device_server = app.listen(10801);
    });

    mocha.after(function () {
        device_server.close();
        device_server = undefined;
    });

    mocha.beforeEach(async function () {
        let db = await mysql.createConnection(config.ReservationDSN);
        await db.connect();
        await db.execute("CREATE TABLE reservation (`id` BIGINT UNSIGNED AUTO_INCREMENT, `device` TEXT NOT NULL, `start` DATETIME NOT NULL, `end` DATETIME NOT NULL, `bookingreference` TEXT NOT NULL, PRIMARY KEY (`id`))");
        db.end();
    });

    mocha.afterEach(async function () {
        let db = await mysql.createConnection(config.ReservationDSN);
        await db.connect();
        await db.execute("DROP TABLE reservation");
        db.end();
    });

    mocha.it("postBookingSchedule", async function () {
        this.timeout(10000);
        let r = await postBookingSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/device/superGroup" }, { ID: "http://localhost:10801/device/superGroup2" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00", End: "2022-06-28T23:59:59" }, onlyOwn: undefined }, { username: "test", role: "", scopes: [""] });
        r = await postBookingSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/device/superGroup" }, { ID: "http://localhost:10801/device/superGroup2" }] }, Combined: true, Time: { Start: "2022-06-25T00:00:00", End: "2022-06-28T23:59:59" }, onlyOwn: undefined }, { username: "test", role: "", scopes: [""] });
    });
    mocha.it("getTimetables", function (done) {
        done();
    });
});

