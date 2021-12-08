import { Donation, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
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
      return newDono;
    } catch (error) {
      return null;
    }
  }

  findAll(projectId: string) {
    return `This action returns all donations for ${projectId}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} donation`;
  }

  // update(id: number, updateDonationDto: UpdateDonationDto) {
  //   return `This action updates a #${id} donation`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} donation`;
  // }
}
