import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/main/db/prisma.service';
import { CreateStudentDto } from '@modules/students/dto/create-student.dto';
import { UpdateStudentDto } from '@modules/students/dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateStudentDto) {
    return this.prisma.student.create({
      data: {
        name: data.name,
        birthDate: data.birthDate,
        user: { connect: { id: data.userId } },
        gym: { connect: { id: data.gymId } },
      },
    });
  }

  async findAll() {
    return this.prisma.student.findMany({
      include: { user: true, gym: true },
    });
  }

  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id: id },
      include: { user: true, gym: true },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async update(id: number, data: UpdateStudentDto) {
    const studentExists = await this.prisma.student.findUnique({
      where: { id: id },
    });
    if (!studentExists) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return this.prisma.student.update({
      where: { id: id },
      data,
    });
  }

  async remove(id: number) {
    const studentExists = await this.prisma.student.findUnique({
      where: { id: id },
    });
    if (!studentExists) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return this.prisma.student.delete({ where: { id: id } });
  }

  async getStudentGym(studentId: number) {
    return this.prisma.gym.findFirst({
      where: { students: { some: { id: studentId } } },
    });
  }
}
