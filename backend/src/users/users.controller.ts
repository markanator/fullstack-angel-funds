import { Prisma } from '.prisma/client';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { isEmpty } from 'lodash';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() UserCreateInput: Prisma.UserCreateInput) {
    if (!UserCreateInput || isEmpty(UserCreateInput)) {
      throw new BadRequestException('Missing fields.');
    }
    return this.usersService.create(UserCreateInput);
  }

  @Get()
  findAll(@Query() query) {
    return this.usersService.findAll({
      skip: query?.skip,
      take: query?.take || 10,
      orderBy: { fullName: 'asc' },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() payload: Partial<Prisma.UserUpdateInput>) {
    if (!payload || isEmpty(payload)) {
      throw new BadRequestException('Missing fields.');
    }
    return this.usersService.update({
      where: {
        id: Number(id),
      },
      data: payload,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove({
      id: Number(id),
    });
  }
}
