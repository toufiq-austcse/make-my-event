import {Module} from '@nestjs/common';
import {IndexModule} from './index/index.module';
import {EventModule} from './event/event.module';

import {ConfigModule} from '@nestjs/config';

import {DatabaseModule} from "@common/database/database.module";
import {HttpClientsModule} from "@common/http-clients/http-clients.module";
import {RabbitMQModule} from "@common/rabbit-mq/rabbit-mq.module";


@Module({
    imports: [
        IndexModule,
        EventModule,
        DatabaseModule,
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        HttpClientsModule,
        RabbitMQModule,
    ],
    controllers: [],
    providers: [],
})
export class ApiModule {
}
