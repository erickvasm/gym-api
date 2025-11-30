import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { UsersController } from '@modules/users/users.controller';
import { PrismaModule } from '@/main/db/prisma.module';
import { AccessControlModule } from '@main/auth/access/access.control.module';
import { AuthJwtModule } from '@/main/auth/authentication/auth.module';

@Module({
  imports: [PrismaModule, AccessControlModule, forwardRef(() => AuthJwtModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
