import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ExerciseService } from '@modules/exercises/exercises.service';
import { CreateExerciseDto } from '@modules/exercises/dto/create-exercise.dto';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exerciseService.create(createExerciseDto);
  }

  @Get()
  findAll() {
    return this.exerciseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.exerciseService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.exerciseService.remove(+id);
  }

  @Get('user/:id')
  getUserExercises(@Param('id') id: number) {
    return this.exerciseService.getUserExercises(+id);
  }
}
