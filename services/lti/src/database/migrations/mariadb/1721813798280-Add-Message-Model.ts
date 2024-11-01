import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMessageModel1721813798280 implements MigrationInterface {
    name = 'AddMessageModel1721813798280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`lti_message_model\` (\`id\` uuid NOT NULL, \`nonce\` varchar(255) NOT NULL, \`platformIss\` varchar(255) NULL, \`platformClientId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`lti_message_model\` ADD CONSTRAINT \`FK_15d2f5786f1e855578f5926956b\` FOREIGN KEY (\`platformIss\`, \`platformClientId\`) REFERENCES \`platform_model\`(\`iss\`,\`client_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lti_message_model\` DROP FOREIGN KEY \`FK_15d2f5786f1e855578f5926956b\``);
        await queryRunner.query(`DROP TABLE \`lti_message_model\``);
    }

}
