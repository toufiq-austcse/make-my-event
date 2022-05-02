import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { HostDetailsResponse } from '../dto/host-details.res';
@Injectable()
export class AuthService {
  private AUTH_SERVICE_BASE_URL: string;
  constructor(private httpService: HttpService, private configService: ConfigService) {
    this.AUTH_SERVICE_BASE_URL = this.configService.get('AUTH_SERVICE_BASE_URL');
  }
  async getHostDetails(token: string):Promise<HostDetailsResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.AUTH_SERVICE_BASE_URL}/api/v1/hosts/me`, {
          headers: {
            Authorization: token,
          },
        })
      );
      return response.data.data;
    } catch (error) {
      Logger.log(error.response, 'AuthService');
      throw new Error(error);
    }
  }
}
