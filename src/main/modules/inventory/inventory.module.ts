import { Module } from '@nestjs/common';
import { InventoryService } from '@modules/inventory/inventory.service';
import { InventoryController } from '@modules/inventory/inventory.controller';
import { PrismaService } from '@/main/db/prisma.service';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService, PrismaService],
})
export class InventoryModule {}
