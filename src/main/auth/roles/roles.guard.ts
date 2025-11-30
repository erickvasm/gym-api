import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '@main/auth/roles/roles.decorator';
import { Role } from '@main/auth/roles/role.enum';
import { AccessControlService } from '@main/auth/access/access.control.service';
import {
  AuthRequest,
  TokenDto,
} from '@main/auth/authentication/interface/auth.request';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accessControlService: AccessControlService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthRequest>();
    const token = request.user as TokenDto;

    for (const role of requiredRoles) {
      const result = this.accessControlService.isAuthorized({
        requiredRole: role,
        currentRole: token.role as Role,
      });

      if (result) {
        return true;
      }
    }

    return false;
  }
}
