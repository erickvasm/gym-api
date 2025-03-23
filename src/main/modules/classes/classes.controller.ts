import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ClassesService } from '@modules/classes/classes.service';
import { CreateClassDto } from '@modules/classes/dto/create-class.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Get()
  findAll() {
    return this.classesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.classesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.classesService.remove(+id);
  }

  @Get('gym/:id')
  getGymClasses(@Param('id') id: number) {
    return this.classesService.getGymClasses(+id);
  }

  @Get('instructor/:id')
  getInstructorClasses(@Param('id') id: number) {
    return this.classesService.getInstructorClasses(+id);
  }
}
