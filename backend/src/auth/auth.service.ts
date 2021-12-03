import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { isEmpty } from 'lodash';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '.prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(email: string, passToTry: string): Promise<any> {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!isEmpty(foundUser) && bcrypt.compareSync(passToTry, foundUser.password)) {
      const { id, email } = foundUser;
      return { id, email };
    }

    return null;
  }

  async login(user: Partial<User>) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
