
import * as mocha from "mocha";
import express from 'express';
import * as http from 'http';
import * as mysql from 'mysql2/promise';
import dayjs from "dayjs";
import * as amqplib from 'amqplib';

import {setupDummySql, tearDownDummySql, getSQLDNS} from "../../test_common/setup"
import {getFakeInstitutePrefix, getFakeOwnURL, startFakeServer, stopFakeServer, fakeServerConfig, resetFakeServerVars} from "../../test_common/fakeservers"

import { config } from "../../common/config";
import { randomID } from "./internal";

let connection: amqplib.Connection;
let channel: amqplib.Channel;

mocha.describe("internal.ts", function () {
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

                // Connect to amqp
                connection = await amqplib.connect(config.AmqpUrl);
                channel = await connection.createChannel();
        
                await channel.assertQueue("device-booking", {
                    durable: true,
                });
                        
                await channel.assertQueue("device-reservation", {
                    durable: true,
                });
                        
                await channel.assertQueue("device-freeing", {
                    durable: true,
                });
        
                // Drain queues
                while (await channel.get("device-booking", { noAck: true })) {
                }
        
                while (await channel.get("device-reservation", { noAck: true })) {
                }     

                while (await channel.get("device-freeing", { noAck: true })) {
                }
    });

    mocha.afterEach(async function () {
        await tearDownDummySql();

        await channel.deleteQueue("device-booking");
        await channel.deleteQueue("device-reservation");
        await channel.deleteQueue("device-freeing");

        await channel.close();
        await connection.close();

        channel = undefined;
        connection = undefined;
    });

    mocha.it("handleCallback() DeviceUpdate (local)",async () => { 
        throw Error("TODO implement");
    });

    mocha.it("handleCallback() BookingUpdate (remote)",async () => { 
        throw Error("TODO implement");
    });

    mocha.it("addDeviceCallback()",async () => { 
        throw Error("TODO implement");
    });

    mocha.it("addBookingCallback()",async () => { 
        throw Error("TODO implement");
    });

    mocha.it("dispatchCallback()",async () => { 
        throw Error("TODO implement");
    });

    mocha.it("reservationCheckStatus()",async () => { 
        throw Error("TODO implement");
    });

    mocha.it("reservateDevice() - remote",async () => { 
        throw Error("TODO implement");
    });

    mocha.it("reservateDevice() - local single device",async () => { 
        throw Error("TODO implement");
    });

    mocha.it("reservateDevice() - local two devices",async () => { 
        throw Error("TODO implement");
    });

    mocha.it("reservateDevice() - local group",async () => { 
        throw Error("TODO implement");
    });

    mocha.it("freeDevice() - remote",async () => { 
        throw Error("TODO implement");
    });

    mocha.it("freeDevice() - local single device",async () => { 
        throw Error("TODO implement");
    });

    mocha.it("freeDevice() - local multiple devices",async () => { 
        throw Error("TODO implement");
    });

    mocha.it("freeDevice() - local group",async () => { 
        throw Error("TODO implement");
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

    mocha.it("DeleteBooking()",async () => { 
        throw Error("TODO implement");
    });

    mocha.it("calculateToken() remote", async () => {
        // TODO
    });

    mocha.it("calculateToken() local", async () => {
        // TODO
    });
});