import { MigrationInterface, QueryRunner } from 'typeorm';

export class Setup1690370717132 implements MigrationInterface {
    name = 'Setup1690370717132';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`Device\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`type\` varchar(255) NOT NULL, \`owner\` varchar(255) NULL, \`isPublic\` tinyint NOT NULL DEFAULT 0, \`deletedAt\` datetime(6) NULL, \`connected\` tinyint NULL, \`announcedAvailability\` text NULL, \`availabilityRules\` text NULL, \`experiment\` varchar(255) NULL, \`token\` varchar(255) NULL, \`services\` text NULL, \`devices\` text NULL, \`instantiateUrl\` varchar(255) NULL, \`codeUrl\` varchar(255) NULL, \`instanceOfUuid\` varchar(36) NULL, INDEX \`IDX_41fd67cfa14290cc8dc11f12df\` (\`type\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`Peerconnection\` (\`uuid\` varchar(36) NOT NULL, \`type\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`deviceA\` text NOT NULL, \`deviceB\` text NOT NULL, \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Device\` ADD CONSTRAINT \`FK_2f318c27d7d5c9441431f910fd4\` FOREIGN KEY (\`instanceOfUuid\`) REFERENCES \`Device\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Device\` DROP FOREIGN KEY \`FK_2f318c27d7d5c9441431f910fd4\``,
        );
        await queryRunner.query(`DROP TABLE \`Peerconnection\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_41fd67cfa14290cc8dc11f12df\` ON \`Device\``,
        );
        await queryRunner.query(`DROP TABLE \`Device\``);
    }
}
