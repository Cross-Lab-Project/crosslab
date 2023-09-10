import { MigrationInterface, QueryRunner } from 'typeorm';

export class Setup1694181937262 implements MigrationInterface {
  name = 'Setup1694181937262';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_model\` (\`uuid\` uuid NOT NULL, \`username\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`isAdmin\` tinyint NOT NULL, \`password\` varchar(255) NULL, \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`lastLogin\` datetime NULL, UNIQUE INDEX \`IDX_180abb555e21d4825693f11b94\` (\`username\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`token_model\` (\`token\` varchar(255) NOT NULL, \`expiresOn\` datetime NULL, \`claims\` text NULL, \`userUuid\` uuid NULL, PRIMARY KEY (\`token\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`token_model\` ADD CONSTRAINT \`FK_2bd73082743f5f721e92a3ee109\` FOREIGN KEY (\`userUuid\`) REFERENCES \`user_model\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`token_model\` DROP FOREIGN KEY \`FK_2bd73082743f5f721e92a3ee109\``,
    );
    await queryRunner.query(`DROP TABLE \`token_model\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_180abb555e21d4825693f11b94\` ON \`user_model\``,
    );
    await queryRunner.query(`DROP TABLE \`user_model\``);
  }
}
