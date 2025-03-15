import { PartialType } from '@nestjs/swagger';
import { CreateInventoryDto } from '@modules/inventory/dto/create-inventory.dto';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {}
