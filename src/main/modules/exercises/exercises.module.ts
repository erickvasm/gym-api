import { Module } from '@nestjs/common';
import { ExercisesService } from '@modules/exercises/exercises.service';
import { ExercisesController } from '@modules/exercises/exercises.controller';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService],
})
export class ExercisesModule {}
