import {Global, Module} from '@nestjs/common';
import dataSource from 'ormconfig';
import {DataSource} from 'typeorm';
import {ConfigService} from "@nestjs/config";

@Global()
@Module({
    providers: [
        {
            provide: DataSource,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                let db = await dataSource.initialize();
                const queryRunner = await db.createQueryRunner();
                try {
                    let result = await queryRunner.manager.query(
                        `CREATE DATABASE IF NOT EXISTS ${configService.get('DB_NAME')} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
                    );
                    await console.log(result)
                } catch (e) {
                    console.log('DB Cannot Created ', e)
                }

                return dataSource;
            }
        }

    ],
    exports: [DataSource]
})
export class DatabaseModule {
}
