import { Injectable } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import slugify from 'slugify';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProjectCreateInput, userId: number): Promise<any | null> {
    const titleSlug = slugify(data.title, {
      lower: true,
      strict: true,
    });

    const slugTaken = await this.prisma.project.findFirst({
      where: {
        slug: titleSlug,
      },
    });

    if (slugTaken) {
      return null;
    }

    // check for existing user
    const newProject = await this.prisma.project.create({
      data: {
        ...data,
        slug: titleSlug,
        author: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
          },
        },
      },
    });

    return newProject;
  }

  async findOne(slug: string): Promise<Project | null> {
    const foundProject = await this.prisma.project.findFirst({
      where: {
        slug: {
          equals: slug,
        },
      },
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
          },
        },
        donations: true,
        upvotes: true,
      },
    });
    if (!foundProject) {
      return null;
    }

    return foundProject;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectWhereUniqueInput;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput;
  }): Promise<Project[] | null> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.project.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        _count: true,
        author: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    data: Prisma.ProjectUpdateInput,
    userId: number,
  ): Promise<Project | null> {
    const foundProject = await this.prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!foundProject) {
      return null;
    }
    if (foundProject.author.id !== userId) {
      return null;
    }
    const titleSlug = slugify(data.title as string, {
      lower: true,
      strict: true,
    });

    return this.prisma.project.update({
      where: {
        id: foundProject.id,
      },
      data: {
        ...data,
        slug: titleSlug,
      },
    });
  }

  async remove(id: number, userId: number): Promise<boolean> {
    const foundProject = await this.prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!foundProject) {
      return null;
    }
    if (foundProject.author.id !== userId) {
      return null;
    }

    const deleted = await this.prisma.project.delete({
      where: {
        id,
      },
    });

    return !!deleted;
  }
}
