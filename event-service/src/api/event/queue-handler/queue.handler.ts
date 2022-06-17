import {RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {ReservationConfirmationEventDto} from "../dto/queue.dto";
import {MailgunService} from "@common/http-clients/services/mailgun.service";

@Injectable()
export class QueueHandler {
    constructor(
        private configService: ConfigService,
        private mailgunService: MailgunService,
    ) {
    }

    @RabbitSubscribe({
        exchange: process.env.RABBIT_MQ_MAKE_MY_EVENT_EXCHANGE,
        routingKey: process.env.RABBIT_MQ_RESERVATION_CONFORMATION_ROUTING_KEY,
        queue: process.env.RABBIT_MQ_RESERVATION_CONFORMATION_QUEUE,
    })
    public async sendConfirmationNotification(msg: ReservationConfirmationEventDto) {
        let body = `Dear ${msg.name}. Your reservation for ${msg.event.name} is confirmed. Reservation Id is: ${msg.reservation_ref_id}`
        this.mailgunService.sendMail({
            to: msg.email,
            body,
            subject: `Reservation Confirmation`


        }).then(res => {
            Logger.log('Reservation confirmation mail is send');
        }).catch(err => {
            console.log('Error in Reservation confirmation mail ', err.message);
        })
    }
}
