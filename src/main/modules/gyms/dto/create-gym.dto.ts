import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateGymDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  schedule: string;

  @IsNumber()
  ownerId: number;
}
