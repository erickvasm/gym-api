import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTrainerDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(3)
  specialty: string;

  @IsOptional()
  @IsNumber()
  gymId?: number;
}
