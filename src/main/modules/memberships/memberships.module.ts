import { Module } from '@nestjs/common';
import { MembershipsService } from '@modules/memberships/memberships.service';
import { MembershipsController } from '@modules/memberships/memberships.controller';
import { PrismaService } from '@/main/db/prisma.service';

@Module({
  controllers: [MembershipsController],
  providers: [MembershipsService, PrismaService],
})
export class MembershipsModule {}
