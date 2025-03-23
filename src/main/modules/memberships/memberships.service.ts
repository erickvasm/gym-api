import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/main/db/prisma.service';
import { CreateMembershipDto } from '@modules/memberships/dto/create-membership.dto';
import { UpdateMembershipDto } from '@modules/memberships/dto/update-membership.dto';

@Injectable()
export class MembershipsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMembershipDto) {
    return this.prisma.membership.create({
      data: {
        name: data.name,
        duration: data.duration,
        price: data.price,
        description: data.description,
        gym: { connect: { gym_id: data.gymId } },
      },
    });
  }

  async findAll() {
    return this.prisma.membership.findMany({
      include: { gym: true, payments: true },
    });
  }

  async findOne(id: number) {
    const membership = await this.prisma.membership.findUnique({
      where: { membership_id: id },
      include: { gym: true, payments: true },
    });
    if (!membership) {
      throw new NotFoundException(`Membership with ID ${id} not found`);
    }
    return membership;
  }

  async update(id: number, data: UpdateMembershipDto) {
    const membershipExists = await this.prisma.membership.findUnique({
      where: { membership_id: id },
    });
    if (!membershipExists) {
      throw new NotFoundException(`Membership with ID ${id} not found`);
    }
    return this.prisma.membership.update({
      where: { membership_id: id },
      data,
    });
  }

  async remove(id: number) {
    const membershipExists = await this.prisma.membership.findUnique({
      where: { membership_id: id },
    });
    if (!membershipExists) {
      throw new NotFoundException(`Membership with ID ${id} not found`);
    }
    return this.prisma.membership.delete({ where: { membership_id: id } });
  }

  async getGymMemberships(gymId: number) {
    return this.prisma.membership.findMany({
      where: { gym_id: gymId },
    });
  }
}
