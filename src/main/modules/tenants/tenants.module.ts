import { Module, forwardRef } from '@nestjs/common';
import { TenantsController } from '@main/modules/tenants/tenants.controller';
import { TenantsService } from '@main/modules/tenants/tenants.service';
import { UsersModule } from '@modules/users/users.module';
import { PrismaModule } from '@main/db/prisma.module';
import { AccessControlModule } from '@main/auth/access/access.control.module';
import { AuthJwtModule } from '@main/auth/authentication/auth.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AccessControlModule,
    forwardRef(() => AuthJwtModule),
  ],
  controllers: [TenantsController],
  providers: [TenantsService],
})
export class TenantsModule {}
