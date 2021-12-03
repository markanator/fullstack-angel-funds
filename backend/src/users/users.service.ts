import { Prisma, User } from '.prisma/client';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { UserRoles } from './user.roles';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        donos: true,
        projects: true,
        upvotes: true,
      },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    delete foundUser.password;

    return foundUser;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Partial<User>[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        id: true,
        email: true,
        fullName: true,
        avatarUrl: true,
        createdAt: true,
        _count: true,
      },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    // check for existing user
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (existingUser) {
      throw new ConflictException('Email already in use.');
    }
    // hashpassword
    const hashpassword = await bcrypt.hash(data.password, 12);

    const newUser = await this.prisma.user.create({
      data: {
        ...data,
        password: hashpassword,
        roles: [UserRoles.ADMIN],
      },
    });

    delete newUser.password;

    // return user
    return newUser;
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
    userId: number,
  ): Promise<User> {
    const foundUser = await this.prisma.user.findUnique({ where: where });

    if (!foundUser) {
      return null;
    }
    if (foundUser.id !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.user.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.UserWhereUniqueInput, userId: number): Promise<boolean> {
    const foundUser = await this.prisma.user.findUnique({ where });

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }
    if (foundUser.id !== userId) {
      throw new ForbiddenException();
    }

    const deleted = await this.prisma.user.delete({
      where,
    });

    return !!deleted;
  }
}
