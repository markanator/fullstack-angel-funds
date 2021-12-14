import { Injectable } from '@nestjs/common';
import { Donation, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DonationsService {
  constructor(private prisma: PrismaService) {}

  async create(
    payload: Omit<Prisma.DonationCreateInput, 'project' | 'donor'>,
    userId: number,
    projectId: number,
  ): Promise<Donation | null> {
    try {
      const fProject = await this.prisma.project.findUnique({ where: { id: projectId } });
      if (!fProject) {
        return null;
      }

      // check FundByDate
      if (new Date(fProject.targetDate).setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0)) {
        return null;
      }

      const newDono = await this.prisma.donation.create({
        data: {
          ...payload,
          donor: {
            connect: {
              id: userId,
            },
          },
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      });

      await this.prisma.project.update({
        where: { id: fProject.id },
        data: {
          ...fProject,
          currentFunds: fProject.currentFunds + newDono.amount,
          totalDonation_sum: fProject.totalDonation_sum + 1,
        },
      });

      return newDono;
    } catch (error) {
      return null;
    }
  }

  async findAll(projectId: number) {
    try {
      const donosForProject = await this.prisma.donation.findMany({
        where: {
          projectId,
        },
        select: {
          id: true,
          amount: true,
          createdAt: true,
          donor: {
            select: {
              id: true,
              fullName: true,
              avatarUrl: true,
            },
          },
        },
      });
      return donosForProject;
    } catch (err) {
      return null;
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.prisma.donation.findUnique({ where: { id } });
      return res;
    } catch (error) {
      return error;
    }
  }
}
