import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/main/db/prisma.service';
import { CreateClassDto } from '@modules/classes/dto/create-class.dto';

@Injectable()
export class ClassesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateClassDto) {
    return this.prisma.class.create({
      data: {
        name: data.name,
        description: data.description,
        schedule: new Date(data.date),
        trainerId: data.trainerId,
        gymId: data.gymId,
      },
    });
  }

  async findAll() {
    return this.prisma.class.findMany({
      include: { trainer: true, gym: true },
    });
  }

  async findOne(id: number) {
    const classData = await this.prisma.class.findUnique({
      where: { id: id },
      include: { trainer: true, gym: true },
    });
    if (!classData) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }
    return classData;
  }

  async remove(id: number) {
    const classExists = await this.prisma.class.findUnique({
      where: { id: id },
    });
    if (!classExists) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }
    return this.prisma.class.delete({ where: { id: id } });
  }

  async getGymClasses(gymId: number) {
    return this.prisma.class.findMany({
      where: { gymId: gymId },
      include: { trainer: true },
    });
  }

  async getInstructorClasses(instructorId: number) {
    return this.prisma.class.findMany({
      where: { trainerId: instructorId },
      include: { gym: true },
    });
  }
}
