import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1690472270724 implements MigrationInterface {
  name = 'Migration1690472270724';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "relation_model" ("subject" varchar NOT NULL, "relation" varchar NOT NULL, "object" varchar NOT NULL, PRIMARY KEY ("subject", "relation", "object"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "relation_model"`);
  }
}
