import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StudentsService } from '@modules/students/students.service';
import { CreateStudentDto } from '@modules/students/dto/create-student.dto';
import { UpdateStudentDto } from '@modules/students/dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.studentsService.remove(+id);
  }

  @Get(':id/gym')
  getStudentGym(@Param('id') id: number) {
    return this.studentsService.getStudentGym(+id);
  }
}
