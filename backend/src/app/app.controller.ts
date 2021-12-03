import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JWTAuthGuard)
  @Get('protected')
  protected(@Request() req): any {
    return req.user;
  }
}
