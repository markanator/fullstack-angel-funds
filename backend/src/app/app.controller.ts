import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRoles } from '../users/user.roles';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JWTAuthGuard)
  @Get('protected')
  @Roles(UserRoles.ADMIN) // provide metadata to endpoint
  protected(@Request() req): any {
    return req.user;
  }

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JWTAuthGuard)
  @Get()
  hello(): string {
    return this.appService.getHello();
  }
}
