import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { isEmpty } from 'lodash';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';
import { DonationsService } from './donations.service';

type createBody = Prisma.DonationCreateInput & {
  projectId: number;
};

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @UseGuards(JWTAuthGuard)
  @Post()
  async create(@Request() req, @Body() reqBody: createBody) {
    if (isEmpty(reqBody)) {
      return new BadRequestException('Missing fields');
    }
    const { projectId, ...rest } = reqBody;
    const donoInfo = await this.donationsService.create(rest, req.user.id, projectId);

    if (!donoInfo) {
      return new BadRequestException('Unable to donate.');
    }

    return donoInfo;
  }

  @UseGuards(JWTAuthGuard)
  @Get()
  findAll(@Query() query) {
    return this.donationsService.findAll(query?.project);
  }

  @UseGuards(JWTAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donationsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDonationDto: UpdateDonationDto) {
  //   return this.donationsService.update(+id, updateDonationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.donationsService.remove(+id);
  // }
}
