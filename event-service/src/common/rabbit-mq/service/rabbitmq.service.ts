import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import * as amqplib from 'amqplib';
@Injectable()
export class RabbitMqService {
  constructor(private ampqConnection: AmqpConnection) {}

  async publish(exchange: string, routingKey: string, message: any, options?: amqplib.Options.Publish) {
    console.log('exchange ',exchange,'routing key ',routingKey);
    
    await this.ampqConnection.publish(exchange, routingKey, message, options);
  }
}
