import { MigrationInterface, QueryRunner } from 'typeorm';

export class InstancesCodeUrl1693217063983 implements MigrationInterface {
  name = 'InstancesCodeUrl1693217063983';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_Instance" ("uuid" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "token" varchar NOT NULL, "codeUrl" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_Instance"("uuid", "url", "token") SELECT "uuid", "url", "token" FROM "Instance"`,
    );
    await queryRunner.query(`DROP TABLE "Instance"`);
    await queryRunner.query(`ALTER TABLE "temporary_Instance" RENAME TO "Instance"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Instance" RENAME TO "temporary_Instance"`);
    await queryRunner.query(
      `CREATE TABLE "Instance" ("uuid" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "token" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "Instance"("uuid", "url", "token") SELECT "uuid", "url", "token" FROM "temporary_Instance"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_Instance"`);
  }
}
