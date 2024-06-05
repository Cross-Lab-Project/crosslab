import { BelongsToUs, baseConfig, sleep } from '@crosslab/booking-service-common';
import * as amqplib from 'amqplib';
import { Mutex, withTimeout } from 'async-mutex';
import * as crypto from 'crypto';
import * as mysql from 'mysql2/promise';

import {
  ErrorTimeoutText,
  ReservationAnswer,
  ReservationMessage,
  ReservationRequest,
} from './messageDefinition';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

// Create mutex
var mutex = withTimeout(new Mutex(), 5000, new Error(ErrorTimeoutText));

// Exported and put in own file for testing ONLY... who thought it was a good idea to not allow testing of 'private' functions? T.T
export async function mainLoop(): Promise<void> {
  while (true) {
    try {
      let connection = await amqplib.connect(baseConfig.AmqpUrl);
      let channel = await connection.createChannel();

      await channel.assertQueue('device-reservation', {
        durable: true,
      });

      while (true) {
        let msg = await channel.get('device-reservation', { noAck: false });

        if (typeof msg === 'boolean') {
          await sleep(20);
          continue;
        }

        if (msg === null) {
          continue;
        }

        // Parse data
        let data: ReservationMessage;
        try {
          data = ReservationMessage.fromString(msg.content.toString());
        } catch (error) {
          console.log('Can not parse message:', error);
          try {
            channel.ack(msg);
          } catch (error) {
            console.log('Can not ack message:', error);
          }
          continue;
        }

        const release = await mutex.acquire();
        try {
          // Process message
          let answer: ReservationAnswer;
          let db = await mysql.createConnection(baseConfig.ReservationDSN);
          await db.connect();
          try {
            let rows: any, fields: any;
            switch (data.Type) {
              case ReservationRequest.Stop:
                // This should never be called by any service, we still need it to stop main loop for testing...
                channel.ack(msg);
                await sleep(250);
                channel.close();
                connection.close();
                return;
              case ReservationRequest.New:
                answer = {
                  Type: data.Type,
                  ReservationID: -1n,
                  Deleted: false,
                  Successful: false,
                  ErrorMessage: 'BUG: unknown path in new',
                };
                // Check input
                if (data.Device === undefined) {
                  answer = {
                    Type: data.Type,
                    ReservationID: -1n,
                    Deleted: false,
                    Successful: false,
                    ErrorMessage: 'No start',
                  };
                  break;
                }

                if (!BelongsToUs(data.Device)) {
                  answer = {
                    Type: data.Type,
                    Device: data.Device,
                    ReservationID: -1n,
                    Deleted: false,
                    Successful: false,
                    ErrorMessage: 'Devive not belonging to institute',
                  };
                  break;
                }

                if (data.Start === undefined) {
                  answer = {
                    Type: data.Type,
                    Device: data.Device,
                    ReservationID: -1n,
                    Deleted: false,
                    Successful: false,
                    ErrorMessage: 'No start',
                  };
                  break;
                }

                if (data.End === undefined) {
                  answer = {
                    Type: data.Type,
                    Device: data.Device,
                    ReservationID: -1n,
                    Deleted: false,
                    Successful: false,
                    ErrorMessage: 'No end',
                  };
                  break;
                }

                if (data.Start >= data.End) {
                  answer = {
                    Type: data.Type,
                    Device: data.Device,
                    ReservationID: -1n,
                    Deleted: false,
                    Successful: false,
                    ErrorMessage: 'Start must be before end',
                  };
                  break;
                }

                if (data.BookingReference === undefined) {
                  answer = {
                    Type: data.Type,
                    Device: data.Device,
                    ReservationID: -1n,
                    Deleted: false,
                    Successful: false,
                    ErrorMessage: 'No booking reference',
                  };
                  break;
                }

                // Check free slot
                [rows, fields] = await db.execute(
                  'SELECT count(*) AS n FROM reservation WHERE `device`=? AND ((`start` < ? AND `start` > ?) OR (`end` > ? AND `end` < ?) OR (`start` = ? AND `end` = ?) OR (`start` < ? AND `end` > ?))',
                  [
                    data.Device.toString(),
                    data.End.toDate(),
                    data.Start.toDate(),
                    data.Start.toDate(),
                    data.End.toDate(),
                    data.Start.toDate(),
                    data.End.toDate(),
                    data.Start.toDate(),
                    data.End.toDate(),
                  ],
                );
                if (rows[0].n != 0) {
                  answer = {
                    Type: data.Type,
                    Device: data.Device,
                    ReservationID: -1n,
                    Deleted: false,
                    Successful: false,
                    ErrorMessage: 'Slot already booked',
                  };
                  break;
                }

                // Do reservation
                const added: any = await db.execute(
                  'INSERT INTO reservation (`device`, `start`, `end`, `bookingreference`) VALUES (?,?,?,?)',
                  [
                    data.Device.toString(),
                    data.Start.toDate(),
                    data.End.toDate(),
                    data.BookingReference.toString(),
                  ],
                );
                answer = {
                  Type: data.Type,
                  Device: data.Device,
                  Start: data.Start,
                  End: data.End,
                  BookingReference: data.BookingReference,
                  ReservationID: BigInt(added[0].insertId),
                  Deleted: false,
                  Successful: true,
                  ErrorMessage: '',
                };
                break;

              case ReservationRequest.Get:
                answer = {
                  Type: data.Type,
                  ReservationID: -1n,
                  Deleted: false,
                  Successful: false,
                  ErrorMessage: 'BUG: unknown path in get',
                };
                // Get reservation
                if (data.ReservationID === undefined) {
                  answer = {
                    Type: data.Type,
                    Device: data.Device,
                    ReservationID: -1n,
                    Deleted: false,
                    Successful: false,
                    ErrorMessage: 'No reservation ID',
                  };
                  break;
                }

                [rows, fields] = await db.execute(
                  'SELECT `device`, `start`, `end`, `bookingreference` FROM reservation WHERE `id`=?',
                  [data.ReservationID],
                );
                if (rows.length == 0) {
                  answer = {
                    Type: data.Type,
                    Device: data.Device,
                    ReservationID: data.ReservationID,
                    Deleted: false,
                    Successful: false,
                    ErrorMessage: 'ID not found',
                  };
                  break;
                }
                answer = {
                  Type: data.Type,
                  Device: new URL(rows[0].device),
                  ReservationID: data.ReservationID,
                  Start: rows[0].start,
                  End: rows[0].end,
                  BookingReference: rows[0].bookingreference,
                  Deleted: false,
                  Successful: true,
                  ErrorMessage: '',
                };
                break;
              case ReservationRequest.Delete:
                answer = {
                  Type: data.Type,
                  ReservationID: -1n,
                  Deleted: false,
                  Successful: false,
                  ErrorMessage: 'BUG: unknown path in delete',
                };
                // Check id
                if (data.ReservationID === undefined) {
                  answer = {
                    Type: data.Type,
                    Device: data.Device,
                    ReservationID: -1n,
                    Deleted: false,
                    Successful: false,
                    ErrorMessage: 'No reservation ID',
                  };
                  break;
                }

                // Delete reservation
                [rows, fields] = await db.execute(
                  'DELETE FROM reservation WHERE `id`=?',
                  [data.ReservationID],
                );
                if (rows.affectedRows == 0) {
                  answer = {
                    Type: data.Type,
                    ReservationID: data.ReservationID,
                    Deleted: true,
                    Successful: false,
                    ErrorMessage: 'ID not found',
                  };
                  break;
                }
                answer = {
                  Type: data.Type,
                  ReservationID: data.ReservationID,
                  Deleted: true,
                  Successful: true,
                  ErrorMessage: '',
                };
                break;
              default:
                answer = {
                  Type: data.Type,
                  ReservationID: -1n,
                  Deleted: false,
                  Successful: false,
                  ErrorMessage: 'BUG: default switch case - should not happen',
                };
                break;
            }
          } catch (error) {
            // Do not jump out here, always send an answer to caller
            answer = {
              Type: data.Type,
              ReservationID: -1n,
              Deleted: false,
              Successful: false,
              ErrorMessage: error.toString(),
            };
            if (data.Device !== undefined) {
              answer.Device = data.Device;
            }
          } finally {
            db.end();
          }

          // Send answer
          try {
            await channel.assertQueue(data.AnswerQueue, {
              durable: false,
            });
            channel.sendToQueue(data.AnswerQueue, Buffer.from(JSON.stringify(answer)));
            channel.ack(msg);
          } catch (error) {
            console.log('Can not ack message:', error);
          }
        } catch (error) {
          try {
            let answer: ReservationAnswer = {
              Type: data.Type,
              ReservationID: -1n,
              Deleted: false,
              Successful: false,
              ErrorMessage: error.toString(),
            };
            if (data.Device !== undefined) {
              answer.Device = data.Device;
            }

            await channel.assertQueue(data.AnswerQueue, {});
            channel.sendToQueue(data.AnswerQueue, Buffer.from(JSON.stringify(answer)));
            channel.ack(msg);
          } catch (e) {
            console.log('Can not ack message:', e);
          }
        } finally {
          release();
        }
      }
    } catch (err) {
      console.log(err);
      console.log('Reconnecting...');
    }
  }
}
