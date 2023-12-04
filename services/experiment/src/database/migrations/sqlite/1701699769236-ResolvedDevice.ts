import { MigrationInterface, QueryRunner } from "typeorm";

export class ResolvedDevice1701699769236 implements MigrationInterface {
    name = 'ResolvedDevice1701699769236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_Device" ("uuid" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "role" varchar NOT NULL, "experimentUuid" varchar, "instanceUuid" varchar, "resolvedDevice" varchar, CONSTRAINT "REL_fbe04f9943ff77c7384afb4a24" UNIQUE ("instanceUuid"), CONSTRAINT "FK_fbe04f9943ff77c7384afb4a24e" FOREIGN KEY ("instanceUuid") REFERENCES "Instance" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_8507dafa0a52f17a0bf75102d18" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Device"("uuid", "url", "role", "experimentUuid", "instanceUuid") SELECT "uuid", "url", "role", "experimentUuid", "instanceUuid" FROM "Device"`);
        await queryRunner.query(`DROP TABLE "Device"`);
        await queryRunner.query(`ALTER TABLE "temporary_Device" RENAME TO "Device"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Device" RENAME TO "temporary_Device"`);
        await queryRunner.query(`CREATE TABLE "Device" ("uuid" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "role" varchar NOT NULL, "experimentUuid" varchar, "instanceUuid" varchar, CONSTRAINT "REL_fbe04f9943ff77c7384afb4a24" UNIQUE ("instanceUuid"), CONSTRAINT "FK_fbe04f9943ff77c7384afb4a24e" FOREIGN KEY ("instanceUuid") REFERENCES "Instance" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_8507dafa0a52f17a0bf75102d18" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "Device"("uuid", "url", "role", "experimentUuid", "instanceUuid") SELECT "uuid", "url", "role", "experimentUuid", "instanceUuid" FROM "temporary_Device"`);
        await queryRunner.query(`DROP TABLE "temporary_Device"`);
    }

}
