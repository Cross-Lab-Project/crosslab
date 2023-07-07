import * as mocha from "mocha";
import dayjs from "dayjs";

import {setupDummySql, tearDownDummySql, getSQLDNS} from "../../test_common/setup"
import {getFakeInstitutePrefix, getFakeOwnURL, startFakeServer, stopFakeServer, fakeServerConfig, resetFakeServerVars} from "../../test_common/fakeserver"

import { postSchedule, getTimetables } from "./operations"
import { config } from "../../common/config";

mocha.describe("operations.ts", function () {
    this.timeout(10000);

    mocha.before(function () {
        // Config
        config.OwnURL = getFakeOwnURL();
        config.InstitutePrefix = getFakeInstitutePrefix();
        config.ReservationDSN = getSQLDNS();

        startFakeServer();
    });

    mocha.after(function () {
        stopFakeServer();
    });

    mocha.beforeEach(async function () {
        // Reset server status
        resetFakeServerVars();

        // Setup database
        await setupDummySql();
    });

    mocha.afterEach(async function () {
        await tearDownDummySql();
    });

    mocha.it("postBookingSchedule (no error case)", async function () {
        let correctFree = [{ Start: "2022-06-25T00:00:00Z", End: "2022-06-27T00:10:00Z" }, { Start: "2022-06-27T00:30:00Z", End: "2022-06-27T01:00:00Z" }, { Start: "2022-06-27T02:00:00Z", End: "2022-06-27T06:00:00Z" }, { Start: "2022-06-27T07:00:00Z", End: "2022-06-28T23:59:59Z" }]
        let correctBooked = [{ Start: "2022-06-27T00:10:00Z", End: "2022-06-27T00:30:00Z" }, { Start: "2022-06-27T01:00:00Z", End: "2022-06-27T02:00:00Z" }, { Start: "2022-06-27T06:00:00Z", End: "2022-06-27T07:00:00Z" }]

        let r = await postSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { "JWT": { username: "test", url: "localhost/user/test", scopes: [""] } });
        if (r.status !== 200) {
            throw Error("Response error: " + r.status);
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

        r = await postSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: true, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { "JWT": { username: "test", url: "localhost/user/test", scopes: [""] } });
        if (r.status !== 200) {
            throw Error("Response error: " + r.status);
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

        r = await postSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { "JWT": { username: "test", url: "localhost/user/test", scopes: [""] } });
        if (r.status !== 200) {
            throw Error("Response error: " + r.status);
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

    mocha.it("postBookingSchedule (completely free)", async function () {
        let r = await postSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000" }] }, Combined: false, Time: { Start: "1999-06-25T00:00:00Z", End: "1999-06-28T23:59:59Z" }, onlyOwn: undefined }, { "JWT": { username: "test", url: "localhost/user/test", scopes: [""] } });
        if (r.status !== 200) {
            throw Error("Response error: " + r.status);
        }
        if (r.body.length != 1) {
            throw Error("Body has wrong length, should 1, is " + r.body.length);
        }

        if (r.body[0].Device !== "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000") {
            throw Error("Device is " + r.body[0].Device);
        }

        if (r.body[0].Booked.length !== 0) {
            console.log(r.body[0].Booked);
            throw Error("Device " + 0 + " Booked has length " + r.body[0].Booked.length);
        }

        if (r.body[0].Free.length !== 1) {
            console.log(r.body[0].Free);
            throw Error("Device " + 0 + " Free has length " + r.body[0].Free.length);
        }

        if (!dayjs(r.body[0].Free[0].Start).isSame(dayjs("1999-06-25T00:00:00Z"))) {
            throw Error("Device " + 0 + " Free.Start is wrong, should 1999-06-25T00:00:00Z is " + r.body[0].Free[0].Start);
        }

        if (!dayjs(r.body[0].Free[0].End).isSame(dayjs("1999-06-28T23:59:59Z"))) {
            throw Error("Device " + 0 + " Free.End is wrong, should 1999-06-28T23:59:59Z is " + r.body[0].Free[0].End);
        }
    });

    mocha.it("postBookingSchedule (completely free)", async function () {
        let r = await postSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000" }] }, Combined: false, Time: { Start: "1999-06-25T00:00:00Z", End: "1999-06-28T23:59:59Z" }, onlyOwn: undefined }, { "JWT": { username: "test", url: "localhost/user/test", scopes: [""] } });
        if (r.status !== 200) {
            throw Error("Response error: " + r.status);
        }
        if (r.body.length != 1) {
            throw Error("Body has wrong length, should 1, is " + r.body.length);
        }

        if (r.body[0].Device !== "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000") {
            throw Error("Device is " + r.body[0].Device);
        }

        if (r.body[0].Booked.length !== 0) {
            console.log(r.body[0].Booked);
            throw Error("Device " + 0 + " Booked has length " + r.body[0].Booked.length);
        }

        if (r.body[0].Free.length !== 1) {
            console.log(r.body[0].Free);
            throw Error("Device " + 0 + " Free has length " + r.body[0].Free.length);
        }

        if (!dayjs(r.body[0].Free[0].Start).isSame(dayjs("1999-06-25T00:00:00Z"))) {
            throw Error("Device " + 0 + " Free.Start is wrong, should 1999-06-25T00:00:00Z is " + r.body[0].Free[0].Start);
        }

        if (!dayjs(r.body[0].Free[0].End).isSame(dayjs("1999-06-28T23:59:59Z"))) {
            throw Error("Device " + 0 + " Free.End is wrong, should 1999-06-28T23:59:59Z is " + r.body[0].Free[0].End);
        }
    });

    mocha.it("postBookingSchedule (remote error case)", async function () {
        this.timeout(10000);

        // Case device overloaded
        /* Error case not implemented in device API
        device_service_status = 503;
        proxy_server_status = 200;

        let r = await postSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, {"JWT":{ username: "test", url: "localhost/user/test", scopes: [""] }});
        if (r.status !== 503) {
            throw Error("Response error (device overloaded): " + r.status);
        }
        */

        // Case proxy device overloaded
        /* Error case not implemented in device API
        device_service_status = 200;
        proxy_server_status = 200;
        proxy_device_service_status = 503;

        r = await postSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, {"JWT":{ username: "test", url: "localhost/user/test", scopes: [""] }});
        if (r.status !== 503) {
            throw Error("Response error (device overloaded): " + r.status);
        }
        */

        // Case device wrong device
        fakeServerConfig.device_service_status = 200;
        fakeServerConfig.proxy_server_status = 200;
        fakeServerConfig.proxy_device_service_status = 200;
        fakeServerConfig.device_wrong_device = true;

        let r = await postSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { "JWT": { username: "test", url: "localhost/user/test", scopes: [""] } });
        if (r.status !== 500) {
            throw Error("Response error (device wrong device): " + r.status);
        }

        // Case device is group
        fakeServerConfig.device_service_status = 200;
        fakeServerConfig.proxy_server_status = 200;
        fakeServerConfig.proxy_device_service_status = 200;
        fakeServerConfig.device_wrong_device = false;
        fakeServerConfig.device_single_is_group = true;

        r = await postSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { "JWT": { username: "test", url: "localhost/user/test", scopes: [""] } });
        if (r.status !== 500) {
            throw Error("Response error (device is group): " + r.status);
        }

        // Case schedule overloaded
        fakeServerConfig.device_service_status = 200;
        fakeServerConfig.proxy_server_status = 503;
        fakeServerConfig.proxy_device_service_status = 200;
        fakeServerConfig.device_single_is_group = false;

        r = await postSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { "JWT": { username: "test", url: "localhost/user/test", scopes: [""] } });
        if (r.status !== 503) {
            throw Error("Response error (proxy overloaded): " + r.status);
        }

        // Device not found
        fakeServerConfig.device_service_status = 404;
        fakeServerConfig.proxy_server_status = 200;

        r = await postSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { "JWT": { username: "test", url: "localhost/user/test", scopes: [""] } });
        if (r.status !== 404) {
            throw Error("Response error (proxy 404): " + r.status);
        }

        // Schedule not found
        fakeServerConfig.device_service_status = 200;
        fakeServerConfig.proxy_server_status = 404;

        r = await postSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { "JWT": { username: "test", url: "localhost/user/test", scopes: [""] } });
        if (r.status !== 404) {
            throw Error("Response error (proxy 404): " + r.status);
        }

        // Case proxy device generic error
        fakeServerConfig.device_service_status = 200;
        fakeServerConfig.proxy_server_status = 200;
        fakeServerConfig.proxy_device_service_status = 500;

        r = await postSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { "JWT": { username: "test", url: "localhost/user/test", scopes: [""] } });
        if (r.status !== 500) {
            throw Error("Response error (device generic error): " + r.status);
        }

        // Case device generic error
        fakeServerConfig.device_service_status = 500;
        fakeServerConfig.proxy_server_status = 200;
        fakeServerConfig.proxy_device_service_status = 200;

        r = await postSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { "JWT": { username: "test", url: "localhost/user/test", scopes: [""] } });
        if (r.status !== 500) {
            throw Error("Response error (device generic error): " + r.status);
        }

        // Schedule generic error
        fakeServerConfig.device_service_status = 200;
        fakeServerConfig.proxy_server_status = 500;
        fakeServerConfig.proxy_device_service_status = 200;

        r = await postSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { "JWT": { username: "test", url: "localhost/user/test", scopes: [""] } });
        if (r.status !== 500) {
            throw Error("Response error (proxy 500): " + r.status);
        }

        // Schedule wrong number of devices
        fakeServerConfig.device_service_status = 200;
        fakeServerConfig.proxy_server_status = 200;
        fakeServerConfig.proxy_schedule_short_body = true;

        r = await postSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { "JWT": { username: "test", url: "localhost/user/test", scopes: [""] } });
        if (r.status !== 500) {
            throw Error("Response error (wrong number of devices): " + r.status);
        }

        // Schedule wrong devices
        fakeServerConfig.device_service_status = 200;
        fakeServerConfig.proxy_server_status = 200;
        fakeServerConfig.proxy_schedule_short_body = false;
        fakeServerConfig.proxy_schedule_wrong_device = true

        r = await postSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: undefined }, { "JWT": { username: "test", url: "localhost/user/test", scopes: [""] } });
        if (r.status !== 500) {
            throw Error("Response error (wrong devices): " + r.status);
        }
    });

    mocha.it("postBookingSchedule (bad requests)", async function () {
        this.timeout(10000);

        let r = await postSchedule({ Experiment: { Devices: [{ ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000001" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000002" }] }, Combined: false, Time: { Start: "2022-06-25T00:00:00Z", End: "2022-06-28T23:59:59Z" }, onlyOwn: true }, { "JWT": { username: "test", url: "localhost/user/test", scopes: [""] } });
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

