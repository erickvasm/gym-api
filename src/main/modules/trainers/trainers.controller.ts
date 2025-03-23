import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TrainersService } from '@modules/trainers/trainers.service';
import { CreateTrainerDto } from '@modules/trainers/dto/create-trainer.dto';
import { UpdateTrainerDto } from '@modules/trainers/dto/update-trainer.dto';
import { Trainer } from '@prisma/client';

@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @Post()
  async create(@Body() createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    return this.trainersService.create(createTrainerDto);
  }

  @Get()
  async findAll(): Promise<Trainer[]> {
    return this.trainersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Trainer> {
    return this.trainersService.findOne(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrainerDto: UpdateTrainerDto,
  ): Promise<Trainer> {
    return this.trainersService.update(Number(id), updateTrainerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.trainersService.remove(Number(id));
  }

  @Get(':id/gym')
  async getTrainerGym(@Param('id') id: string) {
    return this.trainersService.getTrainerGym(Number(id));
  }
}
