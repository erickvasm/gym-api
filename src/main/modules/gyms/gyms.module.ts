import { Module } from '@nestjs/common';
import { GymService } from '@modules/gyms/gyms.service';
import { GymController } from '@modules/gyms/gyms.controller';
import { PrismaService } from '@/main/db/prisma.service';

@Module({
  controllers: [GymController],
  providers: [GymService, PrismaService],
})
export class GymModule {}
