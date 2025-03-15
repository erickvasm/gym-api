import { Module } from '@nestjs/common';
import { StudentsService } from '@modules/students/students.service';
import { StudentsController } from '@modules/students/students.controller';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
