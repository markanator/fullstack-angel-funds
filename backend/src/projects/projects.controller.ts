import { Prisma } from '@prisma/client';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { isEmpty } from 'lodash';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRoles } from '../users/user.roles';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JWTAuthGuard)
  @Post()
  @Roles(UserRoles.ADMIN, UserRoles.USER)
  async create(@Request() req, @Body() createProjectDto: Prisma.ProjectCreateInput) {
    if (isEmpty(createProjectDto)) {
      return new BadRequestException('Missing fields');
    }
    const newProject = await this.projectsService.create(createProjectDto, req.user.id);

    if (!newProject) {
      return new ConflictException('Project already exists.');
    }

    return newProject;
  }

  @Get()
  async findAll(@Query() query) {
    return this.projectsService.findAll({
      skip: query?.skip,
      take: query?.take || 10,
      orderBy: { title: 'asc' },
    });
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const foundProject = await this.projectsService.findOne(slug);
    if (!foundProject) {
      return new NotFoundException();
    }
    return foundProject;
  }

  @UseGuards(JWTAuthGuard)
  @Patch(':id')
  @Roles(UserRoles.ADMIN, UserRoles.USER)
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateProjectPayload: Prisma.ProjectUpdateInput,
  ) {
    if (isEmpty(updateProjectPayload)) {
      return new BadRequestException('Missing fields');
    }
    return this.projectsService.update(+id, updateProjectPayload, req.user.id);
  }

  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  @Roles(UserRoles.ADMIN, UserRoles.USER)
  async remove(@Request() req, @Param('id') id: number) {
    const didDelete = await this.projectsService.remove(+id, req.user.id);
    return didDelete ? true : new BadRequestException();
  }
}
