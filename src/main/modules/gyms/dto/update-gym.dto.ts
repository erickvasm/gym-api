import { PartialType } from '@nestjs/swagger';
import { CreateGymDto } from '@modules/gyms/dto/create-gym.dto';

export class UpdateGymDto extends PartialType(CreateGymDto) {}
