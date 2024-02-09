import { MigrationInterface, QueryRunner } from 'typeorm';

export class Setup1690373116167 implements MigrationInterface {
  name = 'Setup1690373116167';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`update_information_model\` (\`device_id\` varchar(255) NOT NULL, \`latest_version\` varchar(255) NOT NULL, \`latest_version_link\` varchar(255) NOT NULL, PRIMARY KEY (\`device_id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`update_information_model\``);
  }
}
