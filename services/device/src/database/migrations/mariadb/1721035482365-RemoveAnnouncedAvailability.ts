import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveAnnouncedAvailability1721035482365 implements MigrationInterface {
    name = 'RemoveAnnouncedAvailability1721035482365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Device\` DROP COLUMN \`announcedAvailability\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Device\` ADD \`announcedAvailability\` text NULL`);
    }

}
