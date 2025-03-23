import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GymService } from '@modules/gyms/gyms.service';
import { CreateGymDto } from '@modules/gyms/dto/create-gym.dto';

@Controller('gym')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Post()
  create(@Body() createGymDto: CreateGymDto) {
    return this.gymService.create(createGymDto);
  }

  @Get()
  findAll() {
    return this.gymService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.gymService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.gymService.remove(+id);
  }

  @Get('owner/:id')
  getOwnerGyms(@Param('id') id: number) {
    return this.gymService.getOwnerGyms(+id);
  }
}
