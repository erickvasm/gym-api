import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from '@modules/exercises/dto/create-exercise.dto';
import { UpdateExerciseDto } from '@modules/exercises/dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  create(createExerciseDto: CreateExerciseDto) {
    createExerciseDto.valueOf();
    return 'This action adds a new exercise';
  }

  findAll() {
    return `This action returns all exercises`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  update(id: number, updateExerciseDto: UpdateExerciseDto) {
    updateExerciseDto.valueOf();
    return `This action updates a #${id} exercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} exercise`;
  }
}
