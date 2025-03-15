import { Module } from '@nestjs/common';
import { InventoryService } from '@modules/inventory/inventory.service';
import { InventoryController } from '@modules/inventory/inventory.controller';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
