import {MigrationInterface, QueryRunner} from "typeorm";

export class updateDate1655493667668 implements MigrationInterface {
    name = 'updateDate1655493667668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`reservations\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservations\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
