import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGaurd implements CanActivate {
  async canActivate(context: ExecutionContext) {
    // grab req from context
    const request = context.switchToHttp().getRequest();
    // allow req or not
    return request.isAuthenticated();
  }
}
