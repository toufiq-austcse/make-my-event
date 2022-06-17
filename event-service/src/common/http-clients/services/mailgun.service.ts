import {Injectable, Logger} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import * as FormData from 'form-data';
import {firstValueFrom} from "rxjs";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class MailgunService {
    private MAILGUN_BASE_URL: string;
    private MAILGUN_USERNAME: string;
    private MAILGUN_PASSWORD: string;
    private MAILGUN_HOST_MAIL: string;


    constructor(private httpService: HttpService, private configService: ConfigService) {
        this.MAILGUN_BASE_URL = this.configService.get('MAILGUN_BASE_URL');
        this.MAILGUN_USERNAME = this.configService.get('MAILGUN_USERNAME');
        this.MAILGUN_PASSWORD = this.configService.get('MAILGUN_PASSWORD');
        this.MAILGUN_HOST_MAIL = this.configService.get('MAILGUN_HOST_MAIL');
        console.log(this.MAILGUN_BASE_URL,)
    }

    async sendMail(data: {
        to: string,
        subject: string,
        body: string,
    }) {
        try {
            let formData = new FormData();
            formData.append("from", this.MAILGUN_HOST_MAIL);
            formData.append("to", data.to);
            formData.append("subject", data.subject);
            formData.append("text", data.body)
            let res = await firstValueFrom(this.httpService.post(
                `${this.MAILGUN_BASE_URL}/v3/sandbox41fb0497fb11486692c166ba478bcf1e.mailgun.org/messages`,
                formData, {
                    auth: {
                        username: this.MAILGUN_USERNAME,
                        password: this.MAILGUN_PASSWORD
                    }
                }));
            return res.data;
        } catch (e) {
            console.log(e.response)
            throw new Error(e);

        }
    }

}