import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '@modules/users/dto/update-user.dto';
import { PrismaService } from '@/main/db/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      return await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException('El email ya está en uso');
      }
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        gyms: true,
        payments: true,
        exercises: true,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { user_id: id },
      include: {
        gyms: true,
        payments: true,
        exercises: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userExists = await this.prisma.user.findUnique({
      where: { user_id: id },
    });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.prisma.user.update({
      where: { user_id: id },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    const userExists = await this.prisma.user.findUnique({
      where: { user_id: id },
    });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.prisma.user.delete({ where: { user_id: id } });
    return { message: `User with ID ${id} deleted successfully` };
  }

  async getUserGyms(userId: number) {
    return this.prisma.gym.findMany({
      where: { owner_id: userId },
    });
  }

  async getUserPayments(userId: number) {
    return this.prisma.payment.findMany({
      where: { user_id: userId },
    });
  }
}
