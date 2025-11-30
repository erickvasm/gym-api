import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/main/db/prisma.service';
import { CreateExerciseDto } from '@modules/exercises/dto/create-exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateExerciseDto) {
    return this.prisma.exercise.create({
      data: {
        name: data.name,
        description: data.description,
        user: { connect: { id: data.userId } },
        gym: { connect: { id: data.gymId } },
      },
    });
  }

  async findAll() {
    return this.prisma.exercise.findMany({ include: { user: true } });
  }

  async findOne(id: number) {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id: id },
      include: { user: true },
    });
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    return exercise;
  }

  async remove(id: number) {
    const exerciseExists = await this.prisma.exercise.findUnique({
      where: { id: id },
    });
    if (!exerciseExists) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    return this.prisma.exercise.delete({ where: { id: id } });
  }

  async getUserExercises(userId: number) {
    return this.prisma.exercise.findMany({
      where: { userId: userId },
    });
  }
}
