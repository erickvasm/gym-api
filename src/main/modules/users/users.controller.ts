import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { UpdateUserDto } from '@modules/users/dto/update-user.dto';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { User } from '@prisma/client';
import { Roles } from '@main/auth/roles/roles.decorator';
import { Role } from '@main/auth/roles/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.TRAINER)
  async create(@Body() data: CreateUserDto): Promise<User> {
    return this.usersService.createUser(data);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(Number(id), updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    console.log('Entro al delete');
    return this.usersService.remove(Number(id));
  }

  @Get(':id/gyms')
  async getUserGyms(@Param('id') id: string) {
    return this.usersService.getUserGyms(Number(id));
  }

  @Get(':id/payments')
  async getUserPayments(@Param('id') id: string) {
    return this.usersService.getUserPayments(Number(id));
  }
}
