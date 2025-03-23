import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(5)
  description: string;

  @IsNumber()
  userId: number;
}
