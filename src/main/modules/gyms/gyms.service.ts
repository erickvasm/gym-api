import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/main/db/prisma.service';
import { CreateGymDto } from '@modules/gyms/dto/create-gym.dto';

@Injectable()
export class GymService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateGymDto) {
    return this.prisma.gym.create({
      data: {
        name: data.name,
        address: data.address,
        phone: data.phone,
        schedule: data.schedule,
        owner: { connect: { user_id: data.ownerId } },
      },
    });
  }

  async findAll() {
    return this.prisma.gym.findMany({ include: { owner: true } });
  }

  async findOne(id: number) {
    const gym = await this.prisma.gym.findUnique({
      where: { gym_id: id },
      include: { owner: true },
    });
    if (!gym) {
      throw new NotFoundException(`Gym with ID ${id} not found`);
    }
    return gym;
  }

  async remove(id: number) {
    const gymExists = await this.prisma.gym.findUnique({
      where: { gym_id: id },
    });
    if (!gymExists) {
      throw new NotFoundException(`Gym with ID ${id} not found`);
    }
    return this.prisma.gym.delete({ where: { gym_id: id } });
  }

  async getOwnerGyms(ownerId: number) {
    return this.prisma.gym.findMany({
      where: { owner_id: ownerId },
    });
  }
}
