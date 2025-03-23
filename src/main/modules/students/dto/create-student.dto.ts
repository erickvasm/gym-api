import { IsDate, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsDate()
  birth_date: Date;

  @IsNumber()
  userId: number;

  @IsNumber()
  gymId: number;
}
