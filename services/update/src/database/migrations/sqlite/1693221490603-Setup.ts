import { MigrationInterface, QueryRunner } from 'typeorm';

export class Setup1693221490603 implements MigrationInterface {
  name = 'Setup1693221490603';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "update_information_model" ("device_id" varchar PRIMARY KEY NOT NULL, "latest_version" varchar NOT NULL, "latest_version_link" varchar NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "update_information_model"`);
  }
}
