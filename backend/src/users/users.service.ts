import { Prisma, User } from '.prisma/client';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
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
      },
    });

    delete newUser.password;

    // return user
    return newUser;
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const foundUser = await this.prisma.user.findUnique({ where: params.where });

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    const { where, data } = params;
    return this.prisma.user.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const foundUser = await this.prisma.user.findUnique({ where });

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    return this.prisma.user.delete({
      where,
    });
  }
}
