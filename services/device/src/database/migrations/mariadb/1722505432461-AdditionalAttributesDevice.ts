import { MigrationInterface, QueryRunner } from "typeorm";

export class AdditionalAttributesDevice1722505432461 implements MigrationInterface {
    name = 'AdditionalAttributesDevice1722505432461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Device\` ADD \`additionalAttributes\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Device\` DROP COLUMN \`additionalAttributes\``);
    }

}
