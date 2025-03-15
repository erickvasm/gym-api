import { Module } from '@nestjs/common';
import { TrainersService } from '@modules/trainers/trainers.service';
import { TrainersController } from '@modules/trainers/trainers.controller';

@Module({
  controllers: [TrainersController],
  providers: [TrainersService],
})
export class TrainersModule {}
