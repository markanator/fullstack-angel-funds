import { Prisma } from '@prisma/client';
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
  Request,
  UseGuards,
} from '@nestjs/common';
import { isEmpty } from 'lodash';
import { UsersService } from './users.service';
import { Roles } from '../auth/roles.decorator';
import { UserRoles } from './user.roles';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';

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
  @Roles(UserRoles.ADMIN)
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

  @UseGuards(JWTAuthGuard)
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() payload: Partial<Prisma.UserUpdateInput>,
  ) {
    if (!payload || isEmpty(payload)) {
      throw new BadRequestException('Missing fields.');
    }
    return this.usersService.update({ id: Number(id) }, payload, req.user.id);
  }

  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: number) {
    return this.usersService.remove({ id: Number(id) }, req.user.id);
  }
}
