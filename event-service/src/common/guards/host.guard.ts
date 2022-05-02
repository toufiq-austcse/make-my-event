import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class HostGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean>  {
        const request = context.switchToHttp().getRequest<Request>();
        let authorization = request.headers.authorization;
        
  }
}
