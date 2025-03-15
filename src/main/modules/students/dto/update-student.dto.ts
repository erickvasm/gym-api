import { PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from '@modules/students/dto/create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
