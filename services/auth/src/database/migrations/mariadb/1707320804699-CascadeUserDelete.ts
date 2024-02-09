import { MigrationInterface, QueryRunner } from "typeorm";

export class CascadeUserDelete1707320804699 implements MigrationInterface {
    name = 'CascadeUserDelete1707320804699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`token_model\` DROP FOREIGN KEY \`FK_2bd73082743f5f721e92a3ee109\``);
        await queryRunner.query(`ALTER TABLE \`token_model\` ADD CONSTRAINT \`FK_2bd73082743f5f721e92a3ee109\` FOREIGN KEY (\`userUuid\`) REFERENCES \`user_model\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`token_model\` DROP FOREIGN KEY \`FK_2bd73082743f5f721e92a3ee109\``);
        await queryRunner.query(`ALTER TABLE \`token_model\` ADD CONSTRAINT \`FK_2bd73082743f5f721e92a3ee109\` FOREIGN KEY (\`userUuid\`) REFERENCES \`user_model\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
