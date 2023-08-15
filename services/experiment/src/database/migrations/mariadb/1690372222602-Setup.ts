import { MigrationInterface, QueryRunner } from "typeorm";

export class Setup1690372222602 implements MigrationInterface {
    name = 'Setup1690372222602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Experiment\` (\`uuid\` varchar(36) NOT NULL, \`status\` varchar(255) NOT NULL, \`bookingStart\` varchar(255) NOT NULL, \`bookingEnd\` varchar(255) NOT NULL, \`bookingID\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Role\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`experimentUuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Instance\` (\`uuid\` varchar(36) NOT NULL, \`url\` varchar(255) NOT NULL, \`token\` varchar(255) NOT NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Device\` (\`uuid\` varchar(36) NOT NULL, \`url\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`experimentUuid\` varchar(36) NULL, \`instanceUuid\` varchar(36) NULL, UNIQUE INDEX \`REL_fbe04f9943ff77c7384afb4a24\` (\`instanceUuid\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Peerconnection\` (\`url\` varchar(255) NOT NULL, \`experimentUuid\` varchar(36) NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ServiceConfiguration\` (\`uuid\` varchar(36) NOT NULL, \`serviceType\` varchar(255) NOT NULL, \`configuration\` text NOT NULL, \`experimentUuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Participant\` (\`uuid\` varchar(36) NOT NULL, \`role\` varchar(255) NOT NULL, \`serviceId\` varchar(255) NOT NULL, \`config\` text NOT NULL, \`serviceConfigurationUuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Role\` ADD CONSTRAINT \`FK_b38fd4254dd804639ca683339d6\` FOREIGN KEY (\`experimentUuid\`) REFERENCES \`Experiment\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Device\` ADD CONSTRAINT \`FK_8507dafa0a52f17a0bf75102d18\` FOREIGN KEY (\`experimentUuid\`) REFERENCES \`Experiment\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Device\` ADD CONSTRAINT \`FK_fbe04f9943ff77c7384afb4a24e\` FOREIGN KEY (\`instanceUuid\`) REFERENCES \`Instance\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Peerconnection\` ADD CONSTRAINT \`FK_567f562e05a548fab2546eb98d0\` FOREIGN KEY (\`experimentUuid\`) REFERENCES \`Experiment\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ServiceConfiguration\` ADD CONSTRAINT \`FK_2c1228b4b9d46d3183a3f28ca93\` FOREIGN KEY (\`experimentUuid\`) REFERENCES \`Experiment\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Participant\` ADD CONSTRAINT \`FK_b64091febbaddc32901e7341f51\` FOREIGN KEY (\`serviceConfigurationUuid\`) REFERENCES \`ServiceConfiguration\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Participant\` DROP FOREIGN KEY \`FK_b64091febbaddc32901e7341f51\``);
        await queryRunner.query(`ALTER TABLE \`ServiceConfiguration\` DROP FOREIGN KEY \`FK_2c1228b4b9d46d3183a3f28ca93\``);
        await queryRunner.query(`ALTER TABLE \`Peerconnection\` DROP FOREIGN KEY \`FK_567f562e05a548fab2546eb98d0\``);
        await queryRunner.query(`ALTER TABLE \`Device\` DROP FOREIGN KEY \`FK_fbe04f9943ff77c7384afb4a24e\``);
        await queryRunner.query(`ALTER TABLE \`Device\` DROP FOREIGN KEY \`FK_8507dafa0a52f17a0bf75102d18\``);
        await queryRunner.query(`ALTER TABLE \`Role\` DROP FOREIGN KEY \`FK_b38fd4254dd804639ca683339d6\``);
        await queryRunner.query(`DROP TABLE \`Participant\``);
        await queryRunner.query(`DROP TABLE \`ServiceConfiguration\``);
        await queryRunner.query(`DROP TABLE \`Peerconnection\``);
        await queryRunner.query(`DROP INDEX \`REL_fbe04f9943ff77c7384afb4a24\` ON \`Device\``);
        await queryRunner.query(`DROP TABLE \`Device\``);
        await queryRunner.query(`DROP TABLE \`Instance\``);
        await queryRunner.query(`DROP TABLE \`Role\``);
        await queryRunner.query(`DROP TABLE \`Experiment\``);
    }

}
