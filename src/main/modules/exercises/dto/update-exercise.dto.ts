import { PartialType } from '@nestjs/swagger';
import { CreateExerciseDto } from '@modules/exercises/dto/create-exercise.dto';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {}
