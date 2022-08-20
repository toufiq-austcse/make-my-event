import {Global, Module} from '@nestjs/common';
import {RabbitMQModule as MQModule} from '@golevelup/nestjs-rabbitmq';
import {RabbitMqService} from './service/rabbitmq.service';
import {ConfigService} from '@nestjs/config';

@Global()
@Module({
    imports: [
        MQModule.forRootAsync(MQModule, {
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get('RABBIT_MQ_URL'),
                connectionInitOptions: {wait: true},
                exchanges: [{name: 'dev_event_exchange', type: 'topic'}]
            }),
        }),
    ],
    providers: [RabbitMqService],
    exports: [RabbitMqService],
})
export class RabbitMQModule {
}
