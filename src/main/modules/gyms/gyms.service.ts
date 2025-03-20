import { Injectable } from '@nestjs/common';
import { CreateGymDto } from '@modules/gyms/dto/create-gym.dto';
import { UpdateGymDto } from '@modules/gyms/dto/update-gym.dto';

@Injectable()
export class GymsService {
  create(createGymDto: CreateGymDto) {
    createGymDto.valueOf();
    return 'This action adds a new gym';
  }

  findAll() {
    return `This action returns all gyms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gym`;
  }

  update(id: number, updateGymDto: UpdateGymDto) {
    updateGymDto.valueOf();
    return `This action updates a #${id} gym`;
  }

  remove(id: number) {
    return `This action removes a #${id} gym`;
  }
}
