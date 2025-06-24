import { MigrationInterface, QueryRunner } from "typeorm";

export class Setup1750681470180 implements MigrationInterface {
    name = 'Setup1750681470180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Booking" ("uuid" varchar PRIMARY KEY NOT NULL, "status" varchar NOT NULL, "start" varchar NOT NULL, "end" varchar NOT NULL, "isLocked" boolean NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "Reservation" ("uuid" varchar PRIMARY KEY NOT NULL, "start" varchar NOT NULL, "end" varchar NOT NULL, "remoteBooking" varchar)`);
        await queryRunner.query(`CREATE TABLE "Device" ("uuid" varchar PRIMARY KEY NOT NULL, "id" varchar NOT NULL, "url" varchar NOT NULL, "type" varchar NOT NULL, "essential" boolean NOT NULL, "selectedDevice" varchar, "bookingUuid" varchar, "reservationUuid" varchar, CONSTRAINT "REL_8d3f92ba672808da01156a27a9" UNIQUE ("reservationUuid"))`);
        await queryRunner.query(`CREATE TABLE "CallbackUrl" ("uuid" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "type" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "booking_callback_urls_callback_url" ("bookingUuid" varchar NOT NULL, "callbackUrlUuid" varchar NOT NULL, PRIMARY KEY ("bookingUuid", "callbackUrlUuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f99a1ddfe854529a82cf0149e6" ON "booking_callback_urls_callback_url" ("bookingUuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_a37dc4854217cbe7bc76d8bed4" ON "booking_callback_urls_callback_url" ("callbackUrlUuid") `);
        await queryRunner.query(`CREATE TABLE "temporary_Device" ("uuid" varchar PRIMARY KEY NOT NULL, "id" varchar NOT NULL, "url" varchar NOT NULL, "type" varchar NOT NULL, "essential" boolean NOT NULL, "selectedDevice" varchar, "bookingUuid" varchar, "reservationUuid" varchar, CONSTRAINT "REL_8d3f92ba672808da01156a27a9" UNIQUE ("reservationUuid"), CONSTRAINT "FK_e62ffe13b87698e148fdd9116b6" FOREIGN KEY ("bookingUuid") REFERENCES "Booking" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_8d3f92ba672808da01156a27a90" FOREIGN KEY ("reservationUuid") REFERENCES "Reservation" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Device"("uuid", "id", "url", "type", "essential", "selectedDevice", "bookingUuid", "reservationUuid") SELECT "uuid", "id", "url", "type", "essential", "selectedDevice", "bookingUuid", "reservationUuid" FROM "Device"`);
        await queryRunner.query(`DROP TABLE "Device"`);
        await queryRunner.query(`ALTER TABLE "temporary_Device" RENAME TO "Device"`);
        await queryRunner.query(`DROP INDEX "IDX_f99a1ddfe854529a82cf0149e6"`);
        await queryRunner.query(`DROP INDEX "IDX_a37dc4854217cbe7bc76d8bed4"`);
        await queryRunner.query(`CREATE TABLE "temporary_booking_callback_urls_callback_url" ("bookingUuid" varchar NOT NULL, "callbackUrlUuid" varchar NOT NULL, CONSTRAINT "FK_f99a1ddfe854529a82cf0149e6b" FOREIGN KEY ("bookingUuid") REFERENCES "Booking" ("uuid") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_a37dc4854217cbe7bc76d8bed40" FOREIGN KEY ("callbackUrlUuid") REFERENCES "CallbackUrl" ("uuid") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("bookingUuid", "callbackUrlUuid"))`);
        await queryRunner.query(`INSERT INTO "temporary_booking_callback_urls_callback_url"("bookingUuid", "callbackUrlUuid") SELECT "bookingUuid", "callbackUrlUuid" FROM "booking_callback_urls_callback_url"`);
        await queryRunner.query(`DROP TABLE "booking_callback_urls_callback_url"`);
        await queryRunner.query(`ALTER TABLE "temporary_booking_callback_urls_callback_url" RENAME TO "booking_callback_urls_callback_url"`);
        await queryRunner.query(`CREATE INDEX "IDX_f99a1ddfe854529a82cf0149e6" ON "booking_callback_urls_callback_url" ("bookingUuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_a37dc4854217cbe7bc76d8bed4" ON "booking_callback_urls_callback_url" ("callbackUrlUuid") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_a37dc4854217cbe7bc76d8bed4"`);
        await queryRunner.query(`DROP INDEX "IDX_f99a1ddfe854529a82cf0149e6"`);
        await queryRunner.query(`ALTER TABLE "booking_callback_urls_callback_url" RENAME TO "temporary_booking_callback_urls_callback_url"`);
        await queryRunner.query(`CREATE TABLE "booking_callback_urls_callback_url" ("bookingUuid" varchar NOT NULL, "callbackUrlUuid" varchar NOT NULL, PRIMARY KEY ("bookingUuid", "callbackUrlUuid"))`);
        await queryRunner.query(`INSERT INTO "booking_callback_urls_callback_url"("bookingUuid", "callbackUrlUuid") SELECT "bookingUuid", "callbackUrlUuid" FROM "temporary_booking_callback_urls_callback_url"`);
        await queryRunner.query(`DROP TABLE "temporary_booking_callback_urls_callback_url"`);
        await queryRunner.query(`CREATE INDEX "IDX_a37dc4854217cbe7bc76d8bed4" ON "booking_callback_urls_callback_url" ("callbackUrlUuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_f99a1ddfe854529a82cf0149e6" ON "booking_callback_urls_callback_url" ("bookingUuid") `);
        await queryRunner.query(`ALTER TABLE "Device" RENAME TO "temporary_Device"`);
        await queryRunner.query(`CREATE TABLE "Device" ("uuid" varchar PRIMARY KEY NOT NULL, "id" varchar NOT NULL, "url" varchar NOT NULL, "type" varchar NOT NULL, "essential" boolean NOT NULL, "selectedDevice" varchar, "bookingUuid" varchar, "reservationUuid" varchar, CONSTRAINT "REL_8d3f92ba672808da01156a27a9" UNIQUE ("reservationUuid"))`);
        await queryRunner.query(`INSERT INTO "Device"("uuid", "id", "url", "type", "essential", "selectedDevice", "bookingUuid", "reservationUuid") SELECT "uuid", "id", "url", "type", "essential", "selectedDevice", "bookingUuid", "reservationUuid" FROM "temporary_Device"`);
        await queryRunner.query(`DROP TABLE "temporary_Device"`);
        await queryRunner.query(`DROP INDEX "IDX_a37dc4854217cbe7bc76d8bed4"`);
        await queryRunner.query(`DROP INDEX "IDX_f99a1ddfe854529a82cf0149e6"`);
        await queryRunner.query(`DROP TABLE "booking_callback_urls_callback_url"`);
        await queryRunner.query(`DROP TABLE "CallbackUrl"`);
        await queryRunner.query(`DROP TABLE "Device"`);
        await queryRunner.query(`DROP TABLE "Reservation"`);
        await queryRunner.query(`DROP TABLE "Booking"`);
    }

}
