import dayjs from 'dayjs';
import * as mysql from 'mysql2/promise';

// Keep in sync with booking-backend/internal.ts
export enum callbackType {
  DeviceUpdate,
  BookingUpdate,
}

export async function setupDummySql() {
  let sqlDNS: string = getSQLDNS();
  let db: mysql.Connection | undefined;

  try {
    db = await mysql.createConnection(sqlDNS);

    // Begin Transaction
    await db.connect();
    await db.beginTransaction();

    // Reservation
    await db.execute(
      'CREATE TABLE reservation (`id` BIGINT UNSIGNED AUTO_INCREMENT, `device` TEXT NOT NULL, `start` DATETIME NOT NULL, `end` DATETIME NOT NULL, `bookingreference` TEXT NOT NULL, PRIMARY KEY (`id`))',
    );
    await db.execute(
      'INSERT INTO reservation (`id`,`device`, `start`, `end`, `bookingreference`) VALUES (?,?,?,?,?)',
      [
        BigInt(1),
        'http://localhost:10801/devices/10000000-0000-0000-0000-000000000000',
        dayjs('2022-06-27T00:10:00Z').toDate(),
        dayjs('2022-06-27T00:20:00Z').toDate(),
        'unit test',
      ],
    );
    await db.execute(
      'INSERT INTO reservation (`id`,`device`, `start`, `end`, `bookingreference`) VALUES (?,?,?,?,?)',
      [
        BigInt(2),
        'http://localhost:10801/devices/10000000-0000-0000-0000-000000000000',
        dayjs('2022-06-27T00:20:00Z').toDate(),
        dayjs('2022-06-27T00:30:00Z').toDate(),
        'unit test',
      ],
    );
    await db.execute(
      'INSERT INTO reservation (`id`,`device`, `start`, `end`, `bookingreference`) VALUES (?,?,?,?,?)',
      [
        BigInt(3),
        'http://localhost:10801/devices/10000000-0000-0000-0000-000000000000',
        dayjs('2022-06-27T01:00:00Z').toDate(),
        dayjs('2022-06-27T02:00:00Z').toDate(),
        'unit test',
      ],
    );

    // Booking
    await db.execute(
      "CREATE TABLE booking (`id` BIGINT UNSIGNED AUTO_INCREMENT, `start` DATETIME(3) NOT NULL, `end` DATETIME(3) NOT NULL, `type` ENUM('normal'), `status` ENUM('pending', 'booked', 'rejected', 'cancelled', 'active', 'active-pending', 'active-rejected') NOT NULL, `user` TEXT NOT NULL, `message` LONGTEXT, PRIMARY KEY (`id`))",
    );
    await db.execute(
      'CREATE TABLE bookeddevices (`id` BIGINT UNSIGNED AUTO_INCREMENT, `booking` BIGINT UNSIGNED NOT NULL, `originaldevice` TEXT NOT NULL, `originalposition` INT NOT NULL, `bookeddevice` TEXT, `remotereference` TEXT, `local` BOOLEAN, PRIMARY KEY (`id`), `reservation` BIGINT UNSIGNED, FOREIGN KEY(`booking`) REFERENCES booking (`id`) ON DELETE CASCADE ON UPDATE RESTRICT)',
    );
    await db.execute(
      'CREATE TABLE bookingcallbacks (`id` BIGINT UNSIGNED AUTO_INCREMENT, `booking` BIGINT UNSIGNED NOT NULL, `url` TEXT NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY(`booking`) REFERENCES booking (`id`) ON DELETE CASCADE ON UPDATE RESTRICT)',
    );
    await db.execute(
      'CREATE TABLE callback (`id` VARCHAR(600), `type` INTEGER, `targetbooking` BIGINT UNSIGNED NOT NULL, `parameters` JSON NOT NULL DEFAULT "{}", PRIMARY KEY(`id`))',
    );

    // Booking already booked

    // // Fake booking local single device
    await db.execute(
      'INSERT INTO booking (`id`,`start`,`end`,`type`,`status`,`user`,`message`) VALUES (?,?,?,?,?,?,?)',
      [
        BigInt(1),
        dayjs('1999-01-10T06:00:00Z').toDate(),
        dayjs('1999-01-10T07:00:00Z').toDate(),
        'normal',
        'booked',
        'test',
        '',
      ],
    );
    await db.execute(
      'INSERT INTO bookeddevices (`id`,`booking`,`originaldevice`, `originalposition`,`bookeddevice`,`remotereference`,`local`,`reservation`) VALUES (?,?,?,?,?,?,?,?)',
      [
        BigInt(1),
        BigInt(1),
        'http://localhost:10801/devices/10000000-0000-0000-0000-000000000000',
        0,
        'http://localhost:10801/devices/10000000-0000-0000-0000-000000000000',
        null,
        true,
        BigInt(4),
      ],
    );
    await db.execute(
      'INSERT INTO bookingcallbacks (`id`, `booking`,`url`) VALUES (?,?,?)',
      [BigInt(1), BigInt(1), 'http://localhost:10801/test_callbacks/test-local-single'],
    );
    await db.execute(
      'INSERT INTO reservation (`id`,`device`, `start`, `end`, `bookingreference`) VALUES (?,?,?,?,?)',
      [
        BigInt(4),
        'http://localhost:10801/devices/10000000-0000-0000-0000-000000000000',
        dayjs('1999-01-10T06:00:00Z').toDate(),
        dayjs('1999-01-10T07:00:00Z').toDate(),
        'unit test fake booking',
      ],
    );
    await db.execute(
      'INSERT INTO callback(`id`,`type`,`targetbooking`,`parameters`) VALUES (?,?,?,?)',
      [BigInt(1), callbackType.DeviceUpdate, BigInt(1), JSON.stringify({ Position: 0 })],
    );

    // // Fake booking local two devices
    await db.execute(
      'INSERT INTO booking (`id`,`start`,`end`,`type`,`status`,`user`,`message`) VALUES (?,?,?,?,?,?,?)',
      [
        BigInt(2),
        dayjs('1999-02-10T06:00:00Z').toDate(),
        dayjs('1999-02-10T07:00:00Z').toDate(),
        'normal',
        'booked',
        'test',
        '',
      ],
    );
    await db.execute(
      'INSERT INTO bookeddevices (`id`,`booking`,`originaldevice`, `originalposition`,`bookeddevice`,`remotereference`,`local`,`reservation`) VALUES (?,?,?,?,?,?,?,?)',
      [
        BigInt(2),
        BigInt(2),
        'http://localhost:10801/devices/10000000-0000-0000-0000-000000000000',
        0,
        'http://localhost:10801/devices/10000000-0000-0000-0000-000000000000',
        null,
        true,
        BigInt(5),
      ],
    );
    await db.execute(
      'INSERT INTO bookeddevices (`id`,`booking`,`originaldevice`, `originalposition`,`bookeddevice`,`remotereference`,`local`,`reservation`) VALUES (?,?,?,?,?,?,?,?)',
      [
        BigInt(3),
        BigInt(2),
        'http://localhost:10801/devices/20000000-0000-0000-0000-000000000000',
        1,
        'http://localhost:10801/devices/20000000-0000-0000-0000-000000000000',
        null,
        true,
        BigInt(6),
      ],
    );
    await db.execute(
      'INSERT INTO bookingcallbacks (`id`, `booking`,`url`) VALUES (?,?,?)',
      [
        BigInt(2),
        BigInt(2),
        'http://localhost:10801/test_callbacks/test-local-two-first',
      ],
    );
    await db.execute(
      'INSERT INTO bookingcallbacks (`id`, `booking`,`url`) VALUES (?,?,?)',
      [
        BigInt(3),
        BigInt(2),
        'http://localhost:10801/test_callbacks/test-local-two-second',
      ],
    );
    await db.execute(
      'INSERT INTO reservation (`id`,`device`, `start`, `end`, `bookingreference`) VALUES (?,?,?,?,?)',
      [
        BigInt(5),
        'http://localhost:10801/devices/10000000-0000-0000-0000-000000000000',
        dayjs('1999-02-10T06:00:00Z').toDate(),
        dayjs('1999-02-10T07:00:00Z').toDate(),
        'unit test fake booking',
      ],
    );
    await db.execute(
      'INSERT INTO reservation (`id`,`device`, `start`, `end`, `bookingreference`) VALUES (?,?,?,?,?)',
      [
        BigInt(6),
        'http://localhost:10801/devices/20000000-0000-0000-0000-000000000000',
        dayjs('1999-02-10T06:00:00Z').toDate(),
        dayjs('1999-02-10T07:00:00Z').toDate(),
        'unit test fake booking',
      ],
    );
    await db.execute(
      'INSERT INTO callback(`id`,`type`,`targetbooking`,`parameters`) VALUES (?,?,?,?)',
      [BigInt(2), callbackType.DeviceUpdate, BigInt(2), JSON.stringify({ Position: 0 })],
    );
    await db.execute(
      'INSERT INTO callback(`id`,`type`,`targetbooking`,`parameters`) VALUES (?,?,?,?)',
      [BigInt(3), callbackType.DeviceUpdate, BigInt(2), JSON.stringify({ Position: 1 })],
    );

    // // Fake booking group
    await db.execute(
      'INSERT INTO booking (`id`,`start`,`end`,`type`,`status`,`user`,`message`) VALUES (?,?,?,?,?,?,?)',
      [
        BigInt(3),
        dayjs('1999-03-10T06:00:00Z').toDate(),
        dayjs('1999-03-10T07:00:00Z').toDate(),
        'normal',
        'booked',
        'test',
        '',
      ],
    );
    await db.execute(
      'INSERT INTO bookeddevices (`id`,`booking`,`originaldevice`, `originalposition`,`bookeddevice`,`remotereference`,`local`,`reservation`) VALUES (?,?,?,?,?,?,?,?)',
      [
        BigInt(4),
        BigInt(3),
        'http://localhost:10801/devices/00000000-0000-0000-0000-000000000010',
        0,
        'http://localhost:10801/devices/20000000-0000-0000-0000-000000000000',
        null,
        true,
        BigInt(7),
      ],
    );
    await db.execute(
      'INSERT INTO bookingcallbacks (`id`, `booking`,`url`) VALUES (?,?,?)',
      [BigInt(4), BigInt(3), 'http://localhost:10801/test_callbacks/test-local-group'],
    );
    await db.execute(
      'INSERT INTO reservation (`id`,`device`, `start`, `end`, `bookingreference`) VALUES (?,?,?,?,?)',
      [
        BigInt(7),
        'http://localhost:10801/devices/20000000-0000-0000-0000-000000000000',
        dayjs('1999-03-10T06:00:00Z').toDate(),
        dayjs('1999-03-10T07:00:00Z').toDate(),
        'unit test fake booking',
      ],
    );
    await db.execute(
      'INSERT INTO callback(`id`,`type`,`targetbooking`,`parameters`) VALUES (?,?,?,?)',
      [BigInt(4), callbackType.DeviceUpdate, BigInt(3), JSON.stringify({ Position: 0 })],
    );

    // // Fake booking remote
    await db.execute(
      'INSERT INTO booking (`id`,`start`,`end`,`type`,`status`,`user`,`message`) VALUES (?,?,?,?,?,?,?)',
      [
        BigInt(4),
        dayjs('1999-04-10T06:00:00Z').toDate(),
        dayjs('1999-04-10T07:00:00Z').toDate(),
        'normal',
        'booked',
        'test',
        '',
      ],
    );
    await db.execute(
      'INSERT INTO bookeddevices (`id`,`booking`,`originaldevice`, `originalposition`,`bookeddevice`,`remotereference`,`local`,`reservation`) VALUES (?,?,?,?,?,?,?,?)',
      [
        BigInt(5),
        BigInt(4),
        'http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000',
        0,
        'http://127.0.0.1:10802/devices/a0000000-0000-0000-0000-000000000000',
        'http://127.0.0.1:10802/booking/testremote',
        false,
        null,
      ],
    );
    await db.execute(
      'INSERT INTO bookingcallbacks (`id`, `booking`,`url`) VALUES (?,?,?)',
      [BigInt(5), BigInt(4), 'http://localhost:10801/test_callbacks/test-rmote-single'],
    );
    await db.execute(
      'INSERT INTO callback(`id`,`type`,`targetbooking`,`parameters`) VALUES (?,?,?,?)',
      [BigInt(5), callbackType.BookingUpdate, BigInt(4), JSON.stringify({ Position: 0 })],
    );

    // Booking new
    // // Fake booking local single device (5)
    await db.execute(
      'INSERT INTO booking (`id`,`start`,`end`,`type`,`status`,`user`,`message`) VALUES (?,?,?,?,?,?,?)',
      [
        BigInt(5),
        dayjs('1999-01-10T08:00:00Z').toDate(),
        dayjs('1999-01-10T09:00:00Z').toDate(),
        'normal',
        'pending',
        'test',
        '',
      ],
    );
    await db.execute(
      'INSERT INTO bookeddevices (`id`,`booking`,`originaldevice`, `originalposition`,`bookeddevice`,`remotereference`,`local`,`reservation`) VALUES (?,?,?,?,?,?,?,?)',
      [
        BigInt(6),
        BigInt(5),
        'http://localhost:10801/devices/10000000-0000-0000-0000-000000000000',
        0,
        null,
        null,
        true,
        null,
      ],
    );
    await db.execute(
      'INSERT INTO callback(`id`,`type`,`targetbooking`,`parameters`) VALUES (?,?,?,?)',
      [BigInt(6), callbackType.DeviceUpdate, BigInt(5), JSON.stringify({ Position: 0 })],
    );

    // // Fake booking local two devices (6)
    await db.execute(
      'INSERT INTO booking (`id`,`start`,`end`,`type`,`status`,`user`,`message`) VALUES (?,?,?,?,?,?,?)',
      [
        BigInt(6),
        dayjs('1999-02-10T08:00:00Z').toDate(),
        dayjs('1999-02-10T09:00:00Z').toDate(),
        'normal',
        'pending',
        'test',
        '',
      ],
    );
    await db.execute(
      'INSERT INTO bookeddevices (`id`,`booking`,`originaldevice`, `originalposition`,`bookeddevice`,`remotereference`,`local`,`reservation`) VALUES (?,?,?,?,?,?,?,?)',
      [
        BigInt(7),
        BigInt(6),
        'http://localhost:10801/devices/10000000-0000-0000-0000-000000000000',
        0,
        null,
        null,
        true,
        null,
      ],
    );
    await db.execute(
      'INSERT INTO bookeddevices (`id`,`booking`,`originaldevice`, `originalposition`,`bookeddevice`,`remotereference`,`local`,`reservation`) VALUES (?,?,?,?,?,?,?,?)',
      [
        BigInt(8),
        BigInt(6),
        'http://localhost:10801/devices/20000000-0000-0000-0000-000000000000',
        1,
        null,
        null,
        true,
        null,
      ],
    );
    await db.execute(
      'INSERT INTO callback(`id`,`type`,`targetbooking`,`parameters`) VALUES (?,?,?,?)',
      [BigInt(7), callbackType.DeviceUpdate, BigInt(6), JSON.stringify({ Position: 0 })],
    );
    await db.execute(
      'INSERT INTO callback(`id`,`type`,`targetbooking`,`parameters`) VALUES (?,?,?,?)',
      [BigInt(8), callbackType.DeviceUpdate, BigInt(6), JSON.stringify({ Position: 1 })],
    );

    // // Fake booking group (7)
    await db.execute(
      'INSERT INTO booking (`id`,`start`,`end`,`type`,`status`,`user`,`message`) VALUES (?,?,?,?,?,?,?)',
      [
        BigInt(7),
        dayjs('1999-03-10T08:00:00Z').toDate(),
        dayjs('1999-03-10T09:00:00Z').toDate(),
        'normal',
        'pending',
        'test',
        '',
      ],
    );
    await db.execute(
      'INSERT INTO bookeddevices (`id`,`booking`,`originaldevice`, `originalposition`,`bookeddevice`,`remotereference`,`local`,`reservation`) VALUES (?,?,?,?,?,?,?,?)',
      [
        BigInt(9),
        BigInt(7),
        'http://localhost:10801/devices/00000000-0000-0000-0000-000000000010',
        0,
        null,
        null,
        true,
        null,
      ],
    );
    await db.execute(
      'INSERT INTO callback(`id`,`type`,`targetbooking`,`parameters`) VALUES (?,?,?,?)',
      [BigInt(9), callbackType.DeviceUpdate, BigInt(7), JSON.stringify({ Position: 0 })],
    );

    // finish
    await db.commit();
    db.end();
  } catch (err) {
    console.log('error in test setup:', err);
    await db?.rollback();
    db?.end();
    throw err;
  }
}

export async function tearDownDummySql() {
  let db: mysql.Connection | undefined;
  try {
    db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await db.execute('DROP TABLE reservation');
    await db.execute('DROP TABLE bookingcallbacks');
    await db.execute('DROP TABLE bookeddevices');
    await db.execute('DROP TABLE booking');
    await db.execute('DROP TABLE callback');
    db.end();
  } catch (err) {
    console.log('error in test tear down:', err);
    db?.end();
    throw err;
  }
}

export function getSQLDNS(): string {
  return 'mysql://test:test@localhost/unittest?supportBigNumbers=true&bigNumberStrings=true';
}
