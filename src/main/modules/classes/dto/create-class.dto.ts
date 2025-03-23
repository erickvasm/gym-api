import { IsDateString, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  date: string;

  @IsNumber()
  trainerId: number;

  @IsNumber()
  gymId: number;
}
