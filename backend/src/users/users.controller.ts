import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() UserCreateInput) {
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
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() payload) {
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
