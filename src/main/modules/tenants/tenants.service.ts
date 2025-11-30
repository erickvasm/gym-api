import { Injectable } from '@nestjs/common';
import { PrismaService } from '@main/db/prisma.service';
import { CreateTenantDto } from '@main/modules/tenants/dto/create-tenant.dto';
import { UsersService } from '@modules/users/users.service';
import { UserRole } from '@prisma/client';
import * as crypto from 'crypto';

@Injectable()
export class TenantsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async create(createTenantDto: CreateTenantDto) {
    const gymCode = `GYM${Math.random().toString().substring(2, 8)}`;
    const temporaryPassword = crypto.randomBytes(4).toString('hex');

    const gym = await this.prisma.gym.create({
      data: {
        ...createTenantDto,
        code: gymCode,
      },
    });

    await this.usersService.create({
      name: `${createTenantDto.name} Admin`,
      email: `admin@${gymCode.toLowerCase()}.com`,
      password: temporaryPassword,
      role: UserRole.GYM_ADMIN,
      gymId: gym.id,
    });

    return {
      gym,
      temporaryPassword,
    };
  }
}
