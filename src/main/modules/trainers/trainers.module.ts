import { Module } from '@nestjs/common';
import { TrainersService } from '@modules/trainers/trainers.service';
import { TrainersController } from '@modules/trainers/trainers.controller';
import { PrismaModule } from '@/main/db/prisma.module';

@Module({
  controllers: [TrainersController],
  providers: [TrainersService],
  imports: [PrismaModule],
  exports: [TrainersService],
})
export class TrainersModule {}
