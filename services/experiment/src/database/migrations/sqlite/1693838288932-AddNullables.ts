import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullables1693838288932 implements MigrationInterface {
    name = 'AddNullables1693838288932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_ServiceConfiguration" ("uuid" varchar PRIMARY KEY NOT NULL, "serviceType" varchar NOT NULL, "configuration" text NOT NULL, "experimentUuid" varchar, CONSTRAINT "FK_2c1228b4b9d46d3183a3f28ca93" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_ServiceConfiguration"("uuid", "serviceType", "configuration", "experimentUuid") SELECT "uuid", "serviceType", "configuration", "experimentUuid" FROM "ServiceConfiguration"`);
        await queryRunner.query(`DROP TABLE "ServiceConfiguration"`);
        await queryRunner.query(`ALTER TABLE "temporary_ServiceConfiguration" RENAME TO "ServiceConfiguration"`);
        await queryRunner.query(`CREATE TABLE "temporary_Experiment" ("uuid" varchar PRIMARY KEY NOT NULL, "status" varchar NOT NULL, "bookingStart" varchar, "bookingEnd" varchar, "bookingID" varchar, "deletedAt" datetime)`);
        await queryRunner.query(`INSERT INTO "temporary_Experiment"("uuid", "status", "bookingStart", "bookingEnd", "bookingID", "deletedAt") SELECT "uuid", "status", "bookingStart", "bookingEnd", "bookingID", "deletedAt" FROM "Experiment"`);
        await queryRunner.query(`DROP TABLE "Experiment"`);
        await queryRunner.query(`ALTER TABLE "temporary_Experiment" RENAME TO "Experiment"`);
        await queryRunner.query(`CREATE TABLE "temporary_ServiceConfiguration" ("uuid" varchar PRIMARY KEY NOT NULL, "serviceType" varchar NOT NULL, "configuration" text, "experimentUuid" varchar, CONSTRAINT "FK_2c1228b4b9d46d3183a3f28ca93" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_ServiceConfiguration"("uuid", "serviceType", "configuration", "experimentUuid") SELECT "uuid", "serviceType", "configuration", "experimentUuid" FROM "ServiceConfiguration"`);
        await queryRunner.query(`DROP TABLE "ServiceConfiguration"`);
        await queryRunner.query(`ALTER TABLE "temporary_ServiceConfiguration" RENAME TO "ServiceConfiguration"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ServiceConfiguration" RENAME TO "temporary_ServiceConfiguration"`);
        await queryRunner.query(`CREATE TABLE "ServiceConfiguration" ("uuid" varchar PRIMARY KEY NOT NULL, "serviceType" varchar NOT NULL, "configuration" text NOT NULL, "experimentUuid" varchar, CONSTRAINT "FK_2c1228b4b9d46d3183a3f28ca93" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "ServiceConfiguration"("uuid", "serviceType", "configuration", "experimentUuid") SELECT "uuid", "serviceType", "configuration", "experimentUuid" FROM "temporary_ServiceConfiguration"`);
        await queryRunner.query(`DROP TABLE "temporary_ServiceConfiguration"`);
        await queryRunner.query(`ALTER TABLE "Experiment" RENAME TO "temporary_Experiment"`);
        await queryRunner.query(`CREATE TABLE "Experiment" ("uuid" varchar PRIMARY KEY NOT NULL, "status" varchar NOT NULL, "bookingStart" varchar NOT NULL, "bookingEnd" varchar NOT NULL, "bookingID" varchar, "deletedAt" datetime)`);
        await queryRunner.query(`INSERT INTO "Experiment"("uuid", "status", "bookingStart", "bookingEnd", "bookingID", "deletedAt") SELECT "uuid", "status", "bookingStart", "bookingEnd", "bookingID", "deletedAt" FROM "temporary_Experiment"`);
        await queryRunner.query(`DROP TABLE "temporary_Experiment"`);
        await queryRunner.query(`ALTER TABLE "ServiceConfiguration" RENAME TO "temporary_ServiceConfiguration"`);
        await queryRunner.query(`CREATE TABLE "ServiceConfiguration" ("uuid" varchar PRIMARY KEY NOT NULL, "serviceType" varchar NOT NULL, "configuration" text NOT NULL, "experimentUuid" varchar, CONSTRAINT "FK_2c1228b4b9d46d3183a3f28ca93" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "ServiceConfiguration"("uuid", "serviceType", "configuration", "experimentUuid") SELECT "uuid", "serviceType", "configuration", "experimentUuid" FROM "temporary_ServiceConfiguration"`);
        await queryRunner.query(`DROP TABLE "temporary_ServiceConfiguration"`);
    }

}
