import { IsDate, IsNumber, IsString, MinLength } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @MinLength(2)
  amount: string;

  @IsDate()
  date: Date;

  @IsString()
  @MinLength(2)
  payment_method: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  membershipId: number;
}
