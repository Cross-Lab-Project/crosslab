import { MigrationInterface, QueryRunner } from "typeorm";

export class Setup1750681460900 implements MigrationInterface {
    name = 'Setup1750681460900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Booking\` (\`uuid\` varchar(36) NOT NULL, \`status\` varchar(255) NOT NULL, \`start\` varchar(255) NOT NULL, \`end\` varchar(255) NOT NULL, \`isLocked\` tinyint NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Reservation\` (\`uuid\` varchar(36) NOT NULL, \`start\` varchar(255) NOT NULL, \`end\` varchar(255) NOT NULL, \`remoteBooking\` varchar(255) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Device\` (\`uuid\` varchar(36) NOT NULL, \`id\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`essential\` tinyint NOT NULL, \`selectedDevice\` varchar(255) NULL, \`bookingUuid\` varchar(36) NULL, \`reservationUuid\` varchar(36) NULL, UNIQUE INDEX \`REL_8d3f92ba672808da01156a27a9\` (\`reservationUuid\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`CallbackUrl\` (\`uuid\` varchar(36) NOT NULL, \`url\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`booking_callback_urls_callback_url\` (\`bookingUuid\` varchar(36) NOT NULL, \`callbackUrlUuid\` varchar(36) NOT NULL, INDEX \`IDX_f99a1ddfe854529a82cf0149e6\` (\`bookingUuid\`), INDEX \`IDX_a37dc4854217cbe7bc76d8bed4\` (\`callbackUrlUuid\`), PRIMARY KEY (\`bookingUuid\`, \`callbackUrlUuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Device\` ADD CONSTRAINT \`FK_e62ffe13b87698e148fdd9116b6\` FOREIGN KEY (\`bookingUuid\`) REFERENCES \`Booking\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Device\` ADD CONSTRAINT \`FK_8d3f92ba672808da01156a27a90\` FOREIGN KEY (\`reservationUuid\`) REFERENCES \`Reservation\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`booking_callback_urls_callback_url\` ADD CONSTRAINT \`FK_f99a1ddfe854529a82cf0149e6b\` FOREIGN KEY (\`bookingUuid\`) REFERENCES \`Booking\`(\`uuid\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`booking_callback_urls_callback_url\` ADD CONSTRAINT \`FK_a37dc4854217cbe7bc76d8bed40\` FOREIGN KEY (\`callbackUrlUuid\`) REFERENCES \`CallbackUrl\`(\`uuid\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking_callback_urls_callback_url\` DROP FOREIGN KEY \`FK_a37dc4854217cbe7bc76d8bed40\``);
        await queryRunner.query(`ALTER TABLE \`booking_callback_urls_callback_url\` DROP FOREIGN KEY \`FK_f99a1ddfe854529a82cf0149e6b\``);
        await queryRunner.query(`ALTER TABLE \`Device\` DROP FOREIGN KEY \`FK_8d3f92ba672808da01156a27a90\``);
        await queryRunner.query(`ALTER TABLE \`Device\` DROP FOREIGN KEY \`FK_e62ffe13b87698e148fdd9116b6\``);
        await queryRunner.query(`DROP INDEX \`IDX_a37dc4854217cbe7bc76d8bed4\` ON \`booking_callback_urls_callback_url\``);
        await queryRunner.query(`DROP INDEX \`IDX_f99a1ddfe854529a82cf0149e6\` ON \`booking_callback_urls_callback_url\``);
        await queryRunner.query(`DROP TABLE \`booking_callback_urls_callback_url\``);
        await queryRunner.query(`DROP TABLE \`CallbackUrl\``);
        await queryRunner.query(`DROP INDEX \`REL_8d3f92ba672808da01156a27a9\` ON \`Device\``);
        await queryRunner.query(`DROP TABLE \`Device\``);
        await queryRunner.query(`DROP TABLE \`Reservation\``);
        await queryRunner.query(`DROP TABLE \`Booking\``);
    }

}
