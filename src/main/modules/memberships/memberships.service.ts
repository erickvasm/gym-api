import { Injectable } from '@nestjs/common';
import { CreateMembershipDto } from '@modules/memberships/dto/create-membership.dto';
import { UpdateMembershipDto } from '@modules/memberships/dto/update-membership.dto';

@Injectable()
export class MembershipsService {
  create(createMembershipDto: CreateMembershipDto) {
    return 'This action adds a new membership';
  }

  findAll() {
    return `This action returns all memberships`;
  }

  findOne(id: number) {
    return `This action returns a #${id} membership`;
  }

  update(id: number, updateMembershipDto: UpdateMembershipDto) {
    return `This action updates a #${id} membership`;
  }

  remove(id: number) {
    return `This action removes a #${id} membership`;
  }
}
