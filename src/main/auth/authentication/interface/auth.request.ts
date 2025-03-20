import { FastifyRequest } from 'fastify';
import { Role } from '@main/auth/roles/role.enum';

export interface TokenDto {
  role: Role;
  userId: string;
}

export interface AuthRequest extends FastifyRequest {
  request: { userId: string };
  user?: TokenDto;
}
