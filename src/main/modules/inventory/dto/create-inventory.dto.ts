import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(2)
  type: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  gymId: number;
}
