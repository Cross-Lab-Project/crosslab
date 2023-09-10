import { MigrationInterface, QueryRunner } from 'typeorm';

export class InstancesCodeUrl1693217035547 implements MigrationInterface {
  name = 'InstancesCodeUrl1693217035547';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`Instance\` ADD \`codeUrl\` varchar(255) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`Instance\` DROP COLUMN \`codeUrl\``);
  }
}
