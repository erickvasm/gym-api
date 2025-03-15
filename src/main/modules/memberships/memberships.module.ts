import { Module } from '@nestjs/common';
import { MembershipsService } from '@modules/memberships/memberships.service';
import { MembershipsController } from '@modules/memberships/memberships.controller';

@Module({
  controllers: [MembershipsController],
  providers: [MembershipsService],
})
export class MembershipsModule {}
