import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateMembershipDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(2)
  duration: string;

  @IsString()
  @MinLength(1)
  price: string;

  @IsString()
  @MinLength(5)
  description: string;

  @IsNumber()
  gymId: number;
}
