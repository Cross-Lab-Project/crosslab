import { MigrationInterface, QueryRunner } from "typeorm";

export class Setup1696327339387 implements MigrationInterface {
    name = 'Setup1696327339387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`platform_model\` (\`iss\` varchar(255) NOT NULL, \`client_id\` varchar(255) NOT NULL, \`authentication_request_url\` varchar(255) NOT NULL, \`access_token_url\` varchar(255) NOT NULL, \`jwks_url\` varchar(255) NOT NULL, PRIMARY KEY (\`iss\`, \`client_id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`platform_model\``);
    }

}
