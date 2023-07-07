import { MigrationInterface, QueryRunner } from "typeorm";

export class ExperimentStatusAndInstances1688732725993 implements MigrationInterface {
    name = 'ExperimentStatusAndInstances1688732725993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_Device" ("uuid" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "role" varchar NOT NULL, "instanceUuid" text, "experimentUuid" varchar, CONSTRAINT "FK_8507dafa0a52f17a0bf75102d18" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Device"("uuid", "url", "role", "instanceUuid", "experimentUuid") SELECT "uuid", "url", "role", "additionalProperties", "experimentUuid" FROM "Device"`);
        await queryRunner.query(`DROP TABLE "Device"`);
        await queryRunner.query(`ALTER TABLE "temporary_Device" RENAME TO "Device"`);
        await queryRunner.query(`CREATE TABLE "Instance" ("uuid" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "token" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_Device" ("uuid" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "role" varchar NOT NULL, "instanceUuid" varchar, "experimentUuid" varchar, CONSTRAINT "UQ_4b7d77031fb21a7ebd09431fa01" UNIQUE ("instanceUuid"), CONSTRAINT "FK_8507dafa0a52f17a0bf75102d18" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Device"("uuid", "url", "role", "instanceUuid", "experimentUuid") SELECT "uuid", "url", "role", "instanceUuid", "experimentUuid" FROM "Device"`);
        await queryRunner.query(`DROP TABLE "Device"`);
        await queryRunner.query(`ALTER TABLE "temporary_Device" RENAME TO "Device"`);
        await queryRunner.query(`CREATE TABLE "temporary_Device" ("uuid" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "role" varchar NOT NULL, "instanceUuid" varchar, "experimentUuid" varchar, CONSTRAINT "UQ_4b7d77031fb21a7ebd09431fa01" UNIQUE ("instanceUuid"), CONSTRAINT "FK_8507dafa0a52f17a0bf75102d18" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_fbe04f9943ff77c7384afb4a24e" FOREIGN KEY ("instanceUuid") REFERENCES "Instance" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Device"("uuid", "url", "role", "instanceUuid", "experimentUuid") SELECT "uuid", "url", "role", "instanceUuid", "experimentUuid" FROM "Device"`);
        await queryRunner.query(`DROP TABLE "Device"`);
        await queryRunner.query(`ALTER TABLE "temporary_Device" RENAME TO "Device"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Device" RENAME TO "temporary_Device"`);
        await queryRunner.query(`CREATE TABLE "Device" ("uuid" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "role" varchar NOT NULL, "instanceUuid" varchar, "experimentUuid" varchar, CONSTRAINT "UQ_4b7d77031fb21a7ebd09431fa01" UNIQUE ("instanceUuid"), CONSTRAINT "FK_8507dafa0a52f17a0bf75102d18" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "Device"("uuid", "url", "role", "instanceUuid", "experimentUuid") SELECT "uuid", "url", "role", "instanceUuid", "experimentUuid" FROM "temporary_Device"`);
        await queryRunner.query(`DROP TABLE "temporary_Device"`);
        await queryRunner.query(`ALTER TABLE "Device" RENAME TO "temporary_Device"`);
        await queryRunner.query(`CREATE TABLE "Device" ("uuid" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "role" varchar NOT NULL, "instanceUuid" text, "experimentUuid" varchar, CONSTRAINT "FK_8507dafa0a52f17a0bf75102d18" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "Device"("uuid", "url", "role", "instanceUuid", "experimentUuid") SELECT "uuid", "url", "role", "instanceUuid", "experimentUuid" FROM "temporary_Device"`);
        await queryRunner.query(`DROP TABLE "temporary_Device"`);
        await queryRunner.query(`DROP TABLE "Instance"`);
        await queryRunner.query(`ALTER TABLE "Device" RENAME TO "temporary_Device"`);
        await queryRunner.query(`CREATE TABLE "Device" ("uuid" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "role" varchar NOT NULL, "additionalProperties" text, "experimentUuid" varchar, CONSTRAINT "FK_8507dafa0a52f17a0bf75102d18" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "Device"("uuid", "url", "role", "additionalProperties", "experimentUuid") SELECT "uuid", "url", "role", "instanceUuid", "experimentUuid" FROM "temporary_Device"`);
        await queryRunner.query(`DROP TABLE "temporary_Device"`);
    }

}
