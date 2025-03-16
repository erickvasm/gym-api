import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '@modules/users/dto/update-user.dto';
import { PrismaService } from '@/main/db/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
