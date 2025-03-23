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
        birth_date: data.birth_date,
        user: { connect: { user_id: data.userId } },
        gym: { connect: { gym_id: data.gymId } },
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
      where: { student_id: id },
      include: { user: true, gym: true },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async update(id: number, data: UpdateStudentDto) {
    const studentExists = await this.prisma.student.findUnique({
      where: { student_id: id },
    });
    if (!studentExists) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return this.prisma.student.update({
      where: { student_id: id },
      data,
    });
  }

  async remove(id: number) {
    const studentExists = await this.prisma.student.findUnique({
      where: { student_id: id },
    });
    if (!studentExists) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return this.prisma.student.delete({ where: { student_id: id } });
  }

  async getStudentGym(studentId: number) {
    return this.prisma.gym.findFirst({
      where: { students: { some: { student_id: studentId } } },
    });
  }
}
