import * as mysql from 'mysql2/promise';
import dayjs from "dayjs";

export async function setupDummySql() {
    let sqlDNS: string = getSQLDNS();
    let db: mysql.Connection;

    try {
        db = await mysql.createConnection(sqlDNS);

        // Begin Transaction
        await db.connect();
        await db.beginTransaction();

        // Reservation
        await db.execute("CREATE TABLE reservation (`id` BIGINT UNSIGNED AUTO_INCREMENT, `device` TEXT NOT NULL, `start` DATETIME NOT NULL, `end` DATETIME NOT NULL, `bookingreference` TEXT NOT NULL, PRIMARY KEY (`id`))");
        await db.execute("INSERT INTO reservation (`device`, `start`, `end`, `bookingreference`) VALUES (?,?,?,?)", ["http://localhost:10801/devices/10000000-0000-0000-0000-000000000000", dayjs("2022-06-27T00:10:00Z").toDate(), dayjs("2022-06-27T00:20:00Z").toDate(), "unit test"]);
        await db.execute("INSERT INTO reservation (`device`, `start`, `end`, `bookingreference`) VALUES (?,?,?,?)", ["http://localhost:10801/devices/10000000-0000-0000-0000-000000000000", dayjs("2022-06-27T00:20:00Z").toDate(), dayjs("2022-06-27T00:30:00Z").toDate(), "unit test"]);
        await db.execute("INSERT INTO reservation (`device`, `start`, `end`, `bookingreference`) VALUES (?,?,?,?)", ["http://localhost:10801/devices/10000000-0000-0000-0000-000000000000", dayjs("2022-06-27T01:00:00Z").toDate(), dayjs("2022-06-27T02:00:00Z").toDate(), "unit test"]);

        // Booking
        await db.execute("CREATE TABLE booking (`id` BIGINT UNSIGNED AUTO_INCREMENT, `start` DATETIME NOT NULL, `end` DATETIME NOT NULL, `type` ENUM('normal'), `status` ENUM('pending', 'booked', 'rejected', 'cancelled', 'active', 'active-pending', 'active-rejected') NOT NULL, `user` TEXT NOT NULL, `message` LONGTEXT, PRIMARY KEY (`id`))");
        await db.execute("CREATE TABLE bookeddevices (`id` BIGINT UNSIGNED AUTO_INCREMENT, `booking` BIGINT UNSIGNED NOT NULL, `originaldevice` TEXT NOT NULL, `originalposition` INT NOT NULL, `bookeddevice` TEXT, `remotereference` TEXT, `local` BOOLEAN, PRIMARY KEY (`id`), `reservation` BIGINT UNSIGNED, FOREIGN KEY(`booking`) REFERENCES booking (`id`) ON DELETE CASCADE ON UPDATE RESTRICT)");
        await db.execute("CREATE TABLE bookingcallbacks (`id` BIGINT UNSIGNED AUTO_INCREMENT, `booking` BIGINT UNSIGNED NOT NULL, `url` TEXT NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY(`booking`) REFERENCES booking (`id`) ON DELETE CASCADE ON UPDATE RESTRICT)");

        // Callback
        await db.execute("CREATE TABLE callback (`id` VARCHAR(600), `type` INTEGER, `targetbooking` BIGINT UNSIGNED NOT NULL, `parameters` JSON NOT NULL DEFAULT \"{}\", PRIMARY KEY(`id`))");

        // finish
        await db.commit();
        db.end();
    } catch (err) {
        console.log("error in test setup:", err);
        await db.rollback();
        db.end();
        throw err;
    }
}

export async function tearDownDummySql() {
    let db: mysql.Connection;
    try {
        db = await mysql.createConnection(getSQLDNS());
        await db.connect();
        await db.execute("DROP TABLE reservation");
        await db.execute("DROP TABLE bookingcallbacks");
        await db.execute("DROP TABLE bookeddevices");
        await db.execute("DROP TABLE booking");
        await db.execute("DROP TABLE callback");
        db.end();
    } catch (err) {
        console.log("error in test tear down:", err);
        db.end();
        throw err;
    }
}

export function getSQLDNS(): string {
    return "mysql://test:test@localhost/unittest?supportBigNumbers=true&bigNumberStrings=true"
}