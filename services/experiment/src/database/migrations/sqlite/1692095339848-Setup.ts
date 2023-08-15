import { MigrationInterface, QueryRunner } from "typeorm";

export class Setup1692095339848 implements MigrationInterface {
    name = 'Setup1692095339848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Experiment" ("uuid" varchar PRIMARY KEY NOT NULL, "status" varchar NOT NULL, "bookingStart" varchar NOT NULL, "bookingEnd" varchar NOT NULL, "bookingID" varchar, "deletedAt" datetime)`);
        await queryRunner.query(`CREATE TABLE "Role" ("uuid" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text, "experimentUuid" varchar)`);
        await queryRunner.query(`CREATE TABLE "Instance" ("uuid" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "token" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "Device" ("uuid" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "role" varchar NOT NULL, "experimentUuid" varchar, "instanceUuid" varchar, CONSTRAINT "REL_fbe04f9943ff77c7384afb4a24" UNIQUE ("instanceUuid"))`);
        await queryRunner.query(`CREATE TABLE "Peerconnection" ("url" varchar PRIMARY KEY NOT NULL, "experimentUuid" varchar)`);
        await queryRunner.query(`CREATE TABLE "ServiceConfiguration" ("uuid" varchar PRIMARY KEY NOT NULL, "serviceType" varchar NOT NULL, "configuration" text NOT NULL, "experimentUuid" varchar)`);
        await queryRunner.query(`CREATE TABLE "Participant" ("uuid" varchar PRIMARY KEY NOT NULL, "role" varchar NOT NULL, "serviceId" varchar NOT NULL, "config" text NOT NULL, "serviceConfigurationUuid" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_Role" ("uuid" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text, "experimentUuid" varchar, CONSTRAINT "FK_b38fd4254dd804639ca683339d6" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Role"("uuid", "name", "description", "experimentUuid") SELECT "uuid", "name", "description", "experimentUuid" FROM "Role"`);
        await queryRunner.query(`DROP TABLE "Role"`);
        await queryRunner.query(`ALTER TABLE "temporary_Role" RENAME TO "Role"`);
        await queryRunner.query(`CREATE TABLE "temporary_Device" ("uuid" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "role" varchar NOT NULL, "experimentUuid" varchar, "instanceUuid" varchar, CONSTRAINT "REL_fbe04f9943ff77c7384afb4a24" UNIQUE ("instanceUuid"), CONSTRAINT "FK_8507dafa0a52f17a0bf75102d18" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_fbe04f9943ff77c7384afb4a24e" FOREIGN KEY ("instanceUuid") REFERENCES "Instance" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Device"("uuid", "url", "role", "experimentUuid", "instanceUuid") SELECT "uuid", "url", "role", "experimentUuid", "instanceUuid" FROM "Device"`);
        await queryRunner.query(`DROP TABLE "Device"`);
        await queryRunner.query(`ALTER TABLE "temporary_Device" RENAME TO "Device"`);
        await queryRunner.query(`CREATE TABLE "temporary_Peerconnection" ("url" varchar PRIMARY KEY NOT NULL, "experimentUuid" varchar, CONSTRAINT "FK_567f562e05a548fab2546eb98d0" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Peerconnection"("url", "experimentUuid") SELECT "url", "experimentUuid" FROM "Peerconnection"`);
        await queryRunner.query(`DROP TABLE "Peerconnection"`);
        await queryRunner.query(`ALTER TABLE "temporary_Peerconnection" RENAME TO "Peerconnection"`);
        await queryRunner.query(`CREATE TABLE "temporary_ServiceConfiguration" ("uuid" varchar PRIMARY KEY NOT NULL, "serviceType" varchar NOT NULL, "configuration" text NOT NULL, "experimentUuid" varchar, CONSTRAINT "FK_2c1228b4b9d46d3183a3f28ca93" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_ServiceConfiguration"("uuid", "serviceType", "configuration", "experimentUuid") SELECT "uuid", "serviceType", "configuration", "experimentUuid" FROM "ServiceConfiguration"`);
        await queryRunner.query(`DROP TABLE "ServiceConfiguration"`);
        await queryRunner.query(`ALTER TABLE "temporary_ServiceConfiguration" RENAME TO "ServiceConfiguration"`);
        await queryRunner.query(`CREATE TABLE "temporary_Participant" ("uuid" varchar PRIMARY KEY NOT NULL, "role" varchar NOT NULL, "serviceId" varchar NOT NULL, "config" text NOT NULL, "serviceConfigurationUuid" varchar, CONSTRAINT "FK_b64091febbaddc32901e7341f51" FOREIGN KEY ("serviceConfigurationUuid") REFERENCES "ServiceConfiguration" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Participant"("uuid", "role", "serviceId", "config", "serviceConfigurationUuid") SELECT "uuid", "role", "serviceId", "config", "serviceConfigurationUuid" FROM "Participant"`);
        await queryRunner.query(`DROP TABLE "Participant"`);
        await queryRunner.query(`ALTER TABLE "temporary_Participant" RENAME TO "Participant"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Participant" RENAME TO "temporary_Participant"`);
        await queryRunner.query(`CREATE TABLE "Participant" ("uuid" varchar PRIMARY KEY NOT NULL, "role" varchar NOT NULL, "serviceId" varchar NOT NULL, "config" text NOT NULL, "serviceConfigurationUuid" varchar)`);
        await queryRunner.query(`INSERT INTO "Participant"("uuid", "role", "serviceId", "config", "serviceConfigurationUuid") SELECT "uuid", "role", "serviceId", "config", "serviceConfigurationUuid" FROM "temporary_Participant"`);
        await queryRunner.query(`DROP TABLE "temporary_Participant"`);
        await queryRunner.query(`ALTER TABLE "ServiceConfiguration" RENAME TO "temporary_ServiceConfiguration"`);
        await queryRunner.query(`CREATE TABLE "ServiceConfiguration" ("uuid" varchar PRIMARY KEY NOT NULL, "serviceType" varchar NOT NULL, "configuration" text NOT NULL, "experimentUuid" varchar)`);
        await queryRunner.query(`INSERT INTO "ServiceConfiguration"("uuid", "serviceType", "configuration", "experimentUuid") SELECT "uuid", "serviceType", "configuration", "experimentUuid" FROM "temporary_ServiceConfiguration"`);
        await queryRunner.query(`DROP TABLE "temporary_ServiceConfiguration"`);
        await queryRunner.query(`ALTER TABLE "Peerconnection" RENAME TO "temporary_Peerconnection"`);
        await queryRunner.query(`CREATE TABLE "Peerconnection" ("url" varchar PRIMARY KEY NOT NULL, "experimentUuid" varchar)`);
        await queryRunner.query(`INSERT INTO "Peerconnection"("url", "experimentUuid") SELECT "url", "experimentUuid" FROM "temporary_Peerconnection"`);
        await queryRunner.query(`DROP TABLE "temporary_Peerconnection"`);
        await queryRunner.query(`ALTER TABLE "Device" RENAME TO "temporary_Device"`);
        await queryRunner.query(`CREATE TABLE "Device" ("uuid" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "role" varchar NOT NULL, "experimentUuid" varchar, "instanceUuid" varchar, CONSTRAINT "REL_fbe04f9943ff77c7384afb4a24" UNIQUE ("instanceUuid"))`);
        await queryRunner.query(`INSERT INTO "Device"("uuid", "url", "role", "experimentUuid", "instanceUuid") SELECT "uuid", "url", "role", "experimentUuid", "instanceUuid" FROM "temporary_Device"`);
        await queryRunner.query(`DROP TABLE "temporary_Device"`);
        await queryRunner.query(`ALTER TABLE "Role" RENAME TO "temporary_Role"`);
        await queryRunner.query(`CREATE TABLE "Role" ("uuid" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text, "experimentUuid" varchar)`);
        await queryRunner.query(`INSERT INTO "Role"("uuid", "name", "description", "experimentUuid") SELECT "uuid", "name", "description", "experimentUuid" FROM "temporary_Role"`);
        await queryRunner.query(`DROP TABLE "temporary_Role"`);
        await queryRunner.query(`DROP TABLE "Participant"`);
        await queryRunner.query(`DROP TABLE "ServiceConfiguration"`);
        await queryRunner.query(`DROP TABLE "Peerconnection"`);
        await queryRunner.query(`DROP TABLE "Device"`);
        await queryRunner.query(`DROP TABLE "Instance"`);
        await queryRunner.query(`DROP TABLE "Role"`);
        await queryRunner.query(`DROP TABLE "Experiment"`);
    }

}
