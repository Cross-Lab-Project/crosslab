import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1722264825241 implements MigrationInterface {
    name = 'Test1722264825241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`lti_message_model\` (\`id\` uuid NOT NULL, \`nonce\` varchar(255) NOT NULL, \`platformId\` uuid NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` ADD \`id\` uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` ADD PRIMARY KEY (\`iss\`, \`client_id\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` ADD \`deployment_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` ADD \`registrated\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` ADD \`registration_token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` ADD \`associated_user_token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` ADD \`instructors_can_impersonate\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` ADD \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` CHANGE \`iss\` \`iss\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` ADD PRIMARY KEY (\`client_id\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` CHANGE \`client_id\` \`client_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` CHANGE \`authentication_request_url\` \`authentication_request_url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` CHANGE \`access_token_url\` \`access_token_url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` CHANGE \`jwks_url\` \`jwks_url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`lti_message_model\` ADD CONSTRAINT \`FK_83b08a7ab0a613dd9291669b1b8\` FOREIGN KEY (\`platformId\`) REFERENCES \`platform_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lti_message_model\` DROP FOREIGN KEY \`FK_83b08a7ab0a613dd9291669b1b8\``);
        await queryRunner.query(`ALTER TABLE \`platform_model\` CHANGE \`jwks_url\` \`jwks_url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` CHANGE \`access_token_url\` \`access_token_url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` CHANGE \`authentication_request_url\` \`authentication_request_url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` ADD PRIMARY KEY (\`client_id\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` CHANGE \`client_id\` \`client_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` ADD PRIMARY KEY (\`iss\`, \`client_id\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` CHANGE \`iss\` \`iss\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` DROP COLUMN \`createdDate\``);
        await queryRunner.query(`ALTER TABLE \`platform_model\` DROP COLUMN \`instructors_can_impersonate\``);
        await queryRunner.query(`ALTER TABLE \`platform_model\` DROP COLUMN \`associated_user_token\``);
        await queryRunner.query(`ALTER TABLE \`platform_model\` DROP COLUMN \`registration_token\``);
        await queryRunner.query(`ALTER TABLE \`platform_model\` DROP COLUMN \`registrated\``);
        await queryRunner.query(`ALTER TABLE \`platform_model\` DROP COLUMN \`deployment_id\``);
        await queryRunner.query(`ALTER TABLE \`platform_model\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` ADD PRIMARY KEY (\`iss\`, \`client_id\`)`);
        await queryRunner.query(`ALTER TABLE \`platform_model\` DROP COLUMN \`id\``);
        await queryRunner.query(`DROP TABLE \`lti_message_model\``);
    }

}
