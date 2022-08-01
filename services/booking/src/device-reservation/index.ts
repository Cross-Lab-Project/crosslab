import * as amqplib from 'amqplib';
import * as mysql from 'mysql2/promise';
import { Mutex, tryAcquire, withTimeout } from 'async-mutex';

import { config } from '../common/config';
import { ReservationRequest, ReservationMessage, ReservationAnswer, ErrorTimeoutText } from './messageDefinition';
import { BelongsToUs } from '../common/auth';

(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

// Create mutex
var mutex = withTimeout(new Mutex(), 5000, new Error(ErrorTimeoutText));

console.log("Starting reservation service")
async function mainLoop(): Promise<void> {
    try {
        let connection = await amqplib.connect(config.AmqpUrl);
        let channel = await connection.createChannel();

        channel.assertQueue("device-reservation", {
            durable: true
        });

        channel.consume("device-reservation", async (msg) => {
            if (msg === null) {
                return;
            }

            // Parse data
            let data: ReservationMessage;
            try {
                data = ReservationMessage.fromString(msg.content.toString());
            } catch (error) {
                console.log("Can not parse message:", error)
                try {
                    channel.ack(msg);
                } catch (error) {
                    console.log("Can not ack message:", error);
                }
                return;
            };

            const release = await mutex.acquire();
            try {
                // Process message
                let answer: ReservationAnswer;
                let db = await mysql.createConnection(config.ReservationDSN);
                await db.connect();
                try {
                    let rows: any, fields: any;
                    switch (data.Type) {
                        case ReservationRequest.New:
                            answer = { Type: data.Type, ReservationID: -1n, Deleted: false, Successful: false, ErrorMessage: "BUG: unknown path in new" };
                            // Check input
                            if (data.Device === undefined) {
                                answer = { Type: data.Type, ReservationID: -1n, Deleted: false, Successful: false, ErrorMessage: "No start" };
                                break;
                            }

                            if (!BelongsToUs(data.Device)) {
                                answer = { Type: data.Type, Device: data.Device, ReservationID: -1n, Deleted: false, Successful: false, ErrorMessage: "Devive not belonging to institute" };
                                break;
                            };

                            if (data.Start === undefined) {
                                answer = { Type: data.Type, Device: data.Device, ReservationID: -1n, Deleted: false, Successful: false, ErrorMessage: "No start" };
                                break;
                            };

                            if (data.End === undefined) {
                                answer = { Type: data.Type, Device: data.Device, ReservationID: -1n, Deleted: false, Successful: false, ErrorMessage: "No end" };
                                break;
                            };

                            if (data.Start >= data.End) {
                                answer = { Type: data.Type, Device: data.Device, ReservationID: -1n, Deleted: false, Successful: false, ErrorMessage: "Start must be before end" };
                                break;
                            };

                            if (data.BookingReference === undefined) {
                                answer = { Type: data.Type, Device: data.Device, ReservationID: -1n, Deleted: false, Successful: false, ErrorMessage: "No booking reference" };
                                break;
                            };

                            // Check free slot
                            [rows, fields] = await db.execute("SELECT count(*) AS n FROM reservation WHERE `device`=? AND (`start` < ? OR `end` > ?)", [data.Device.toString(), data.End, data.Start]);
                            if (rows[0].n != 0) {
                                answer = { Type: data.Type, Device: data.Device, ReservationID: -1n, Deleted: false, Successful: false, ErrorMessage: "Slot already booked" };
                                break;
                            };

                            // Do reservation
                            const added: any = await db.execute("INSERT INTO reservation (`device`, `start`, `end`, `bookingreference`) VALUES (?,?,?,?)", [data.Device.toString(), data.Start, data.End, data.BookingReference.toString()]);
                            answer = { Type: data.Type, Device: data.Device, Start: data.Start, End: data.End, BookingReference: data.BookingReference, ReservationID: BigInt(added[0].insertId), Deleted: false, Successful: true, ErrorMessage: "" };
                            break;

                        case ReservationRequest.Get:
                            answer = { Type: data.Type, ReservationID: -1n, Deleted: false, Successful: false, ErrorMessage: "TODO: implement" };
                            // Get reservation
                            if(data.ReservationID === undefined) {
                                answer = { Type: data.Type, Device: data.Device, ReservationID: -1n, Deleted: false, Successful: false, ErrorMessage: "No reservation ID" };
                                break;
                            }

                            [rows, fields] = await db.execute("SELECT `device`, `start`, `end`, `bookingreference` FROM reservation WHERE `id`=?", [data.ReservationID]);
                            if (rows.length == 0) {
                                answer = { Type: data.Type, Device: data.Device, ReservationID: data.ReservationID, Deleted: false, Successful: false, ErrorMessage: "ID not found" };
                                break;
                            }
                            answer = { Type: data.Type, Device: new URL(rows[0].device), ReservationID: data.ReservationID, Start: rows[0].start, End: rows[0].end, BookingReference: rows[0].bookingreference, Deleted: false, Successful: true, ErrorMessage: "" };
                            break;
                        case ReservationRequest.Delete:
                            answer = { Type: data.Type, ReservationID: -1n, Deleted: false, Successful: false, ErrorMessage: "TODO: implement" };
                            // Check id
                            if(data.ReservationID === undefined) {
                                answer = { Type: data.Type, Device: data.Device, ReservationID: -1n, Deleted: false, Successful: false, ErrorMessage: "No reservation ID" };
                                break;
                            }

                            // Delete reservation
                            [rows, fields] = await db.execute("DELETE FROM reservation WHERE `id`=?", [data.ReservationID]);
                            if (rows.affectedRows == 0) {
                                answer = { Type: data.Type, ReservationID: data.ReservationID, Deleted: true, Successful: false, ErrorMessage: "ID not found" };
                                break;
                            }
                            answer = { Type: data.Type, ReservationID: data.ReservationID, Deleted: true, Successful: true, ErrorMessage: ""};
                            break;
                        default:
                            answer = { Type: data.Type, ReservationID: -1n, Deleted: false, Successful: false, ErrorMessage: "BUG: default switch case - should not happen" };
                            break;
                    };
                } catch (error) {
                    // Do not jump out here, always send an answer to caller
                    answer = { Type: data.Type, ReservationID: -1n, Deleted: false, Successful: false, ErrorMessage: error.toString() }
                    if(data.Device !== undefined) {
                        answer.Device = data.Device;
                    };
                };
                db.end();

                // Send answer
                try {
                    channel.assertQueue(data.AnswerQueue, {});
                    channel.sendToQueue(data.AnswerQueue, Buffer.from(JSON.stringify(answer)));
                    channel.ack(msg);
                } catch (error) {
                    console.log("Can not ack message:", error);
                }
            } catch (error) {
                try {
                    let answer: ReservationAnswer = { Type: data.Type, ReservationID: -1n, Deleted: false, Successful: false, ErrorMessage: error.toString() };
                    if(data.Device !== undefined) {
                        answer.Device = data.Device;
                    }

                    channel.assertQueue(data.AnswerQueue, {});
                    channel.sendToQueue(data.AnswerQueue, Buffer.from(JSON.stringify(answer)));
                    channel.ack(msg);
                } catch (e) {
                    console.log("Can not ack message:", e);
                }
            } finally {
                release();
            }
        }, { noAck: false });
    } catch (e) {
        console.log("Error in main loop, restarting AMQP connection:", e);
        mainLoop();
    };
};

mainLoop();