import { MigrationInterface, QueryRunner } from "typeorm";

export class Provision1701690968631 implements MigrationInterface {
    name = 'Provision1701690968631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`platform_provision_model\` (\`id\` int NOT NULL AUTO_INCREMENT, \`iss\` varchar(255) NULL, \`client_id\` varchar(255) NULL, \`authentication_request_url\` varchar(255) NULL, \`access_token_url\` varchar(255) NULL, \`jwks_url\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`platform_provision_model\``);
    }

}
