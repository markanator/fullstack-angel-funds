import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedGaurd as AuthenticatedGuard } from 'src/auth/authenticated.gaurd';
import { LocalAuthGaurd as LocalAuthGuard } from 'src/auth/local-auth.gaurd';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(): any {
    return { message: 'logged in!!' };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  protected(@Request() req): any {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
