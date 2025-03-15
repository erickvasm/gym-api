import { PartialType } from '@nestjs/swagger';
import { CreateMembershipDto } from '@modules/memberships/dto/create-membership.dto';

export class UpdateMembershipDto extends PartialType(CreateMembershipDto) {}
