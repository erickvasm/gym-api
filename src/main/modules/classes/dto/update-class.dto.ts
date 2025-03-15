import { PartialType } from '@nestjs/mapped-types';
import { CreateClassDto } from '@modules/classes/dto/create-class.dto';

export class UpdateClassDto extends PartialType(CreateClassDto) {}
