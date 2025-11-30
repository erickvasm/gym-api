import { FastifyRequest } from 'fastify';
import { UserRole } from '@prisma/client';

export interface TokenDto {
  sub: number;
  email: string;
  role: UserRole;
  gymId: number | null;
}

export interface AuthRequest extends FastifyRequest {
  user?: TokenDto;
}
