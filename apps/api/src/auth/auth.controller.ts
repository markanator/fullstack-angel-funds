import { Controller, ForbiddenException, Post, Request, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private prisma: PrismaService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<any> {
    // user that we get from passport-local
    return this.authService.login(req.user);
  }

  @UseGuards(JWTAuthGuard)
  @Post('/me')
  async me(@Request() req): Promise<any> {
    if (!req.user.id) {
      throw new ForbiddenException();
    }
    // eslint-disable-next-line
    const { password, updatedAt, ...rest } = await this.prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    return rest;
  }
}
