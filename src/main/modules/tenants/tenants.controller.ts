import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TenantsService } from '@main/modules/tenants/tenants.service';
import { CreateTenantDto } from '@main/modules/tenants/dto/create-tenant.dto';
import { Roles } from '@main/auth/roles/roles.decorator';
import { Role } from '@main/auth/roles/role.enum';
import { AuthGuard } from '@main/auth/authentication/auth.guard';
import { RoleGuard } from '@main/auth/roles/roles.guard';

@Controller('tenants')
@UseGuards(AuthGuard, RoleGuard)
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN)
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantsService.create(createTenantDto);
  }
}
