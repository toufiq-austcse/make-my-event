import {MigrationInterface, QueryRunner} from "typeorm";

export class event1653070527830 implements MigrationInterface {
    name = 'event1653070527830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`events\` ADD \`short_id\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`events\` ADD UNIQUE INDEX \`IDX_dba2dbf4abefa388cd55b03eb9\` (\`short_id\`)`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`location\` \`location\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`start_at\` \`start_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`end_at\` \`end_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_0285ae0effe011a1255350d7f37\``);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`image_link\` \`image_link\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`event_id\` \`event_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_8619da6cc28f574ab6aaa72389c\``);
        await queryRunner.query(`ALTER TABLE \`reservations\` CHANGE \`status\` \`status\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`reservations\` CHANGE \`ticket_link\` \`ticket_link\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`reservations\` CHANGE \`event_id\` \`event_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`image_link\` \`image_link\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`event_id\` \`event_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_0285ae0effe011a1255350d7f37\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_8619da6cc28f574ab6aaa72389c\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_8619da6cc28f574ab6aaa72389c\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_0285ae0effe011a1255350d7f37\``);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`event_id\` \`event_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`image_link\` \`image_link\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`reservations\` CHANGE \`event_id\` \`event_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`reservations\` CHANGE \`ticket_link\` \`ticket_link\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`reservations\` CHANGE \`status\` \`status\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_8619da6cc28f574ab6aaa72389c\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`event_id\` \`event_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`image_link\` \`image_link\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_0285ae0effe011a1255350d7f37\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`end_at\` \`end_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`start_at\` \`start_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`location\` \`location\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`events\` DROP INDEX \`IDX_dba2dbf4abefa388cd55b03eb9\``);
        await queryRunner.query(`ALTER TABLE \`events\` DROP COLUMN \`short_id\``);
    }

}
