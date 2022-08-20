import { MigrationInterface, QueryRunner } from "typeorm";

export class event1660994438439 implements MigrationInterface {
    name = 'event1660994438439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`events\` (\`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`short_id\` varchar(255) NOT NULL, \`name\` text NOT NULL, \`location\` text NULL, \`has_tickets\` tinyint NOT NULL DEFAULT 0, \`total_no_of_seats\` int NOT NULL DEFAULT '0', \`no_of_seats_booked\` int NOT NULL DEFAULT '0', \`description\` text NULL, \`start_at\` datetime NULL, \`end_at\` datetime NULL, \`host_id\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_dba2dbf4abefa388cd55b03eb9\` (\`short_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reservations\` (\`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`ref_id\` varchar(255) NOT NULL, \`status\` text NULL, \`name\` text NOT NULL, \`email\` text NOT NULL, \`phone\` text NOT NULL, \`ticket_link\` text NULL, \`event_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`posts\` (\`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`body\` text NOT NULL, \`image_link\` text NULL, \`event_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_8619da6cc28f574ab6aaa72389c\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_0285ae0effe011a1255350d7f37\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_0285ae0effe011a1255350d7f37\``);
        await queryRunner.query(`ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_8619da6cc28f574ab6aaa72389c\``);
        await queryRunner.query(`DROP TABLE \`posts\``);
        await queryRunner.query(`DROP TABLE \`reservations\``);
        await queryRunner.query(`DROP INDEX \`IDX_dba2dbf4abefa388cd55b03eb9\` ON \`events\``);
        await queryRunner.query(`DROP TABLE \`events\``);
    }

}
