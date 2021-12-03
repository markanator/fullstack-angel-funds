import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma.service';
import { UserRoles } from 'src/users/user.roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private prismaClient: PrismaService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    // what is role
    const reqRoles = this.reflector.getAllAndOverride<UserRoles[]>('roles', [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!reqRoles) {
      return true;
    }

    const token = ctx.switchToHttp().getRequest().headers['authorization']?.split(' ')[1];
    if (!token) {
      return false;
    }

    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      const dbUser = await this.prismaClient.user.findUnique({
        where: {
          id: +decoded.sub,
        },
      });

      return reqRoles.some((role) => dbUser.roles?.includes(role));
    } catch (error) {
      console.error(error?.message);
      return false;
    }
  }
}
