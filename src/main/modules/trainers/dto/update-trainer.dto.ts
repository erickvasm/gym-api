import { PartialType } from '@nestjs/swagger';
import { CreateTrainerDto } from '@modules/trainers/dto/create-trainer.dto';

export class UpdateTrainerDto extends PartialType(CreateTrainerDto) {}
