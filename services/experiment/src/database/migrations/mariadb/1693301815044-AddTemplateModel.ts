import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTemplateModel1693301815044 implements MigrationInterface {
  name = 'AddTemplateModel1693301815044';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`Template\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`configuration\` text NOT NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`Template\``);
  }
}
