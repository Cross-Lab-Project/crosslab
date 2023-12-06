import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExperimentAdditionalProperties1701792938338 implements MigrationInterface {
  name = 'ExperimentAdditionalProperties1701792938338';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_Experiment" ("uuid" varchar PRIMARY KEY NOT NULL, "status" varchar NOT NULL, "bookingStart" varchar, "bookingEnd" varchar, "bookingID" varchar, "deletedAt" datetime, "additionalAttributes" text NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_Experiment"("uuid", "status", "bookingStart", "bookingEnd", "bookingID", "deletedAt") SELECT "uuid", "status", "bookingStart", "bookingEnd", "bookingID", "deletedAt" FROM "Experiment"`,
    );
    await queryRunner.query(`DROP TABLE "Experiment"`);
    await queryRunner.query(`ALTER TABLE "temporary_Experiment" RENAME TO "Experiment"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Experiment" RENAME TO "temporary_Experiment"`);
    await queryRunner.query(
      `CREATE TABLE "Experiment" ("uuid" varchar PRIMARY KEY NOT NULL, "status" varchar NOT NULL, "bookingStart" varchar, "bookingEnd" varchar, "bookingID" varchar, "deletedAt" datetime)`,
    );
    await queryRunner.query(
      `INSERT INTO "Experiment"("uuid", "status", "bookingStart", "bookingEnd", "bookingID", "deletedAt") SELECT "uuid", "status", "bookingStart", "bookingEnd", "bookingID", "deletedAt" FROM "temporary_Experiment"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_Experiment"`);
  }
}
