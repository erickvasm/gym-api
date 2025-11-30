import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/main/db/prisma.service';
import { CreateInventoryDto } from '@modules/inventory/dto/create-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateInventoryDto) {
    return this.prisma.inventory.create({
      data: {
        name: data.name,
        type: data.type,
        quantity: data.quantity,
        gym: { connect: { id: data.gymId } },
      },
    });
  }

  async findAll() {
    return this.prisma.inventory.findMany({
      include: { gym: true },
    });
  }

  async findOne(id: number) {
    const inventory = await this.prisma.inventory.findUnique({
      where: { id: id },
      include: { gym: true },
    });
    if (!inventory) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }
    return inventory;
  }

  async remove(id: number) {
    const inventoryExists = await this.prisma.inventory.findUnique({
      where: { id: id },
    });
    if (!inventoryExists) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }
    return this.prisma.inventory.delete({ where: { id: id } });
  }

  async getGymInventory(gymId: number) {
    return this.prisma.inventory.findMany({
      where: { gymId: gymId },
    });
  }
}
