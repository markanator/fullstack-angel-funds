import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { isEmpty } from 'lodash';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRoles } from 'src/users/user.roles';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';
import { DonationsService } from './donations.service';

type createBody = Prisma.DonationCreateInput & {
  projectId: number;
};

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @UseGuards(JWTAuthGuard)
  @Post('/:projectId')
  async createDonationByProjectId(
    @Param('projectId') projectId: string,
    @Request() req,
    @Body() reqBody: createBody,
  ) {
    if (isEmpty(reqBody)) {
      return new BadRequestException('Missing fields');
    }
    const donoInfo = await this.donationsService.create(reqBody, req.user.id, +projectId);

    if (!donoInfo) {
      return new BadRequestException('Unable to donate.');
    }

    return donoInfo;
  }

  @UseGuards(JWTAuthGuard)
  @Get('/:projectId/all')
  findAllDonationsByProjectId(@Param('projectId') projectId: string) {
    return this.donationsService.findAll(+projectId);
  }

  @UseGuards(JWTAuthGuard)
  @Get(':id')
  @Roles(UserRoles.ADMIN)
  findOne(@Param('id') id: string) {
    return this.donationsService.findOne(+id);
  }
}
