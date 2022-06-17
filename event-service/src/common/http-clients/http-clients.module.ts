import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import {MailgunService} from "./services/mailgun.service";

@Global()
@Module({
  imports: [HttpModule],
  providers: [AuthService,MailgunService],
  exports: [AuthService,MailgunService],
})
export class HttpClientsModule {}
