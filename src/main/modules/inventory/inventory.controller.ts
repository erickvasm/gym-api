import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InventoryService } from '@modules/inventory/inventory.service';
import { CreateInventoryDto } from '@modules/inventory/dto/create-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.inventoryService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.inventoryService.remove(+id);
  }

  @Get('gym/:id')
  getGymInventory(@Param('id') id: number) {
    return this.inventoryService.getGymInventory(+id);
  }
}
