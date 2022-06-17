import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../http-clients/services/auth.service';

@Injectable()
export class HostGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    let authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException('Authorization header is required');
    }
    try {
      let host = await this.authService.getHostDetails(authorization);
      request['user'] = host;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Error in Authentication');
    }
    return false
  }
}
