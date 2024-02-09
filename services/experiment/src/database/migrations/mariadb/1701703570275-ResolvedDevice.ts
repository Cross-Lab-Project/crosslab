import { MigrationInterface, QueryRunner } from "typeorm";

export class ResolvedDevice1701703570275 implements MigrationInterface {
    name = 'ResolvedDevice1701703570275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Device\` ADD \`resolvedDevice\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`Experiment\` CHANGE \`bookingStart\` \`bookingStart\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`Experiment\` CHANGE \`bookingEnd\` \`bookingEnd\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`ServiceConfiguration\` CHANGE \`configuration\` \`configuration\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ServiceConfiguration\` CHANGE \`configuration\` \`configuration\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Experiment\` CHANGE \`bookingEnd\` \`bookingEnd\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Experiment\` CHANGE \`bookingStart\` \`bookingStart\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Device\` DROP COLUMN \`resolvedDevice\``);
    }

}
