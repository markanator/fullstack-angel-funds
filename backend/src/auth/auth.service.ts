import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { isEmpty } from 'lodash';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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
}
