import { MigrationInterface, QueryRunner } from 'typeorm';

export class Setup1690372749445 implements MigrationInterface {
    name = 'Setup1690372749445';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`institution_model\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`api\` varchar(255) NOT NULL, \`apiToken\` varchar(255) NOT NULL, \`homepage\` varchar(255) NOT NULL, \`federatedApi\` varchar(255) NOT NULL, \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`institution_model\``);
    }
}
