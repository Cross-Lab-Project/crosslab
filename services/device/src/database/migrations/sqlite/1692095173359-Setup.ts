import {MigrationInterface, QueryRunner} from "typeorm";

export class Setup1692095173359 implements MigrationInterface {
  name = "Setup1692095173359";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Device" ("uuid" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "type" varchar NOT NULL, "owner" varchar, "isPublic" boolean NOT NULL DEFAULT (0), "deletedAt" datetime, "connected" boolean, "announcedAvailability" text, "availabilityRules" text, "experiment" varchar, "token" varchar, "services" text, "devices" text, "instantiateUrl" varchar, "codeUrl" varchar, "instanceOfUuid" varchar)`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_41fd67cfa14290cc8dc11f12df" ON "Device" ("type") `,
    );
    await queryRunner.query(
      `CREATE TABLE "Peerconnection" ("uuid" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "status" varchar NOT NULL, "deviceA" text NOT NULL, "deviceB" text NOT NULL, "deletedAt" datetime)`,
    );
    await queryRunner.query(`DROP INDEX "IDX_41fd67cfa14290cc8dc11f12df"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_Device" ("uuid" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "type" varchar NOT NULL, "owner" varchar, "isPublic" boolean NOT NULL DEFAULT (0), "deletedAt" datetime, "connected" boolean, "announcedAvailability" text, "availabilityRules" text, "experiment" varchar, "token" varchar, "services" text, "devices" text, "instantiateUrl" varchar, "codeUrl" varchar, "instanceOfUuid" varchar, CONSTRAINT "FK_2f318c27d7d5c9441431f910fd4" FOREIGN KEY ("instanceOfUuid") REFERENCES "Device" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_Device"("uuid", "name", "description", "type", "owner", "isPublic", "deletedAt", "connected", "announcedAvailability", "availabilityRules", "experiment", "token", "services", "devices", "instantiateUrl", "codeUrl", "instanceOfUuid") SELECT "uuid", "name", "description", "type", "owner", "isPublic", "deletedAt", "connected", "announcedAvailability", "availabilityRules", "experiment", "token", "services", "devices", "instantiateUrl", "codeUrl", "instanceOfUuid" FROM "Device"`,
    );
    await queryRunner.query(`DROP TABLE "Device"`);
    await queryRunner.query(`ALTER TABLE "temporary_Device" RENAME TO "Device"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_41fd67cfa14290cc8dc11f12df" ON "Device" ("type") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_41fd67cfa14290cc8dc11f12df"`);
    await queryRunner.query(`ALTER TABLE "Device" RENAME TO "temporary_Device"`);
    await queryRunner.query(
      `CREATE TABLE "Device" ("uuid" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "type" varchar NOT NULL, "owner" varchar, "isPublic" boolean NOT NULL DEFAULT (0), "deletedAt" datetime, "connected" boolean, "announcedAvailability" text, "availabilityRules" text, "experiment" varchar, "token" varchar, "services" text, "devices" text, "instantiateUrl" varchar, "codeUrl" varchar, "instanceOfUuid" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "Device"("uuid", "name", "description", "type", "owner", "isPublic", "deletedAt", "connected", "announcedAvailability", "availabilityRules", "experiment", "token", "services", "devices", "instantiateUrl", "codeUrl", "instanceOfUuid") SELECT "uuid", "name", "description", "type", "owner", "isPublic", "deletedAt", "connected", "announcedAvailability", "availabilityRules", "experiment", "token", "services", "devices", "instantiateUrl", "codeUrl", "instanceOfUuid" FROM "temporary_Device"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_Device"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_41fd67cfa14290cc8dc11f12df" ON "Device" ("type") `,
    );
    await queryRunner.query(`DROP TABLE "Peerconnection"`);
    await queryRunner.query(`DROP INDEX "IDX_41fd67cfa14290cc8dc11f12df"`);
    await queryRunner.query(`DROP TABLE "Device"`);
  }
}
