import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { UpdateUserDto } from '@modules/users/dto/update-user.dto';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { User } from '@prisma/client';
import { Roles } from '@main/auth/roles/roles.decorator';
import { Role } from '@main/auth/roles/role.enum';
import { AuthGuard } from '@main/auth/authentication/auth.guard';
import { RoleGuard } from '@main/auth/roles/roles.guard';

@Controller('users')
@UseGuards(AuthGuard, RoleGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('staff')
  @Roles(Role.GYM_ADMIN)
  async createStaff(@Body() data: CreateUserDto): Promise<User> {
    return this.usersService.create(data);
  }

  @Get()
  @Roles(Role.GYM_ADMIN)
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
  @Roles(Role.GYM_ADMIN)
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.usersService.remove(Number(id));
  }

  @Get(':id/payments')
  async getUserPayments(@Param('id') id: string) {
    return this.usersService.getUserPayments(Number(id));
  }
}
