import { Module } from '@nestjs/common';
import { GymsService } from '@modules/gyms/gyms.service';
import { GymsController } from '@modules/gyms/gyms.controller';
import { MembershipsModule } from '@modules/memberships/memberships.module';
import { ClassesModule } from '@modules/classes/classes.module';

@Module({
  controllers: [GymsController],
  providers: [GymsService],
  imports: [MembershipsModule, ClassesModule],
})
export class GymsModule {}
