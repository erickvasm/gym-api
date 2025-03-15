import { Module } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { UsersController } from '@modules/users/users.controller';
import { GymsModule } from '@modules/gyms/gyms.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [GymsModule],
})
export class UsersModule {}
