import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/main/db/prisma.service';
import { CreateTrainerDto } from '@modules/trainers/dto/create-trainer.dto';
import { UpdateTrainerDto } from '@modules/trainers/dto/update-trainer.dto';
import { Trainer } from '@prisma/client';

@Injectable()
export class TrainersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTrainerDto): Promise<Trainer> {
    return this.prisma.trainer.create({
      data: {
        name: data.name,
        specialty: data.specialty,
        gym: data.gymId ? { connect: { gym_id: data.gymId } } : undefined,
      },
    });
  }

  async findAll(): Promise<Trainer[]> {
    return this.prisma.trainer.findMany();
  }

  async findOne(id: number): Promise<Trainer> {
    const trainer = await this.prisma.trainer.findUnique({
      where: { trainer_id: id },
    });
    if (!trainer) {
      throw new NotFoundException(`Trainer with ID ${id} not found`);
    }
    return trainer;
  }

  async update(id: number, data: UpdateTrainerDto): Promise<Trainer> {
    const trainerExists = await this.prisma.trainer.findUnique({
      where: { trainer_id: id },
    });
    if (!trainerExists) {
      throw new NotFoundException(`Trainer with ID ${id} not found`);
    }

    return this.prisma.trainer.update({
      where: { trainer_id: id },
      data: {
        name: data.name,
        specialty: data.specialty,
        gym: data.gymId ? { connect: { gym_id: data.gymId } } : undefined,
      },
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    const trainerExists = await this.prisma.trainer.findUnique({
      where: { trainer_id: id },
    });
    if (!trainerExists) {
      throw new NotFoundException(`Trainer with ID ${id} not found`);
    }
    await this.prisma.trainer.delete({ where: { trainer_id: id } });
    return { message: `Trainer with ID ${id} deleted successfully` };
  }

  async getTrainerGym(trainerId: number) {
    return this.prisma.gym.findFirst({
      where: { trainers: { some: { trainer_id: trainerId } } },
    });
  }
}
