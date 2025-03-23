import { Module } from '@nestjs/common';
import { ExerciseService } from '@modules/exercises/exercises.service';
import { ExerciseController } from '@modules/exercises/exercises.controller';
import { PrismaService } from '@/main/db/prisma.service';

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService, PrismaService],
})
export class ExerciseModule {}
