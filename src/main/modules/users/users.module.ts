import { Module } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { UsersController } from '@modules/users/users.controller';
import { GymsModule } from '@modules/gyms/gyms.module';
import { PrismaModule } from '@/main/db/prisma.module';
import { AccessControlModule } from '@main/auth/access/access.control.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [GymsModule, PrismaModule, AccessControlModule],
  exports: [UsersService],
})
export class UsersModule {}
