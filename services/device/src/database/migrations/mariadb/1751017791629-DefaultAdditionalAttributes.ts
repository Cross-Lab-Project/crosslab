import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultAdditionalAttributes1751017791629 implements MigrationInterface {
    name = 'DefaultAdditionalAttributes1751017791629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Device\` CHANGE \`additionalAttributes\` \`additionalAttributes\` text NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Device\` CHANGE \`additionalAttributes\` \`additionalAttributes\` text NOT NULL`);
    }

}
