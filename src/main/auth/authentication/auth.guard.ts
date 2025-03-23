import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { ConfigService } from '@nestjs/config';
import {
  AuthRequest,
  TokenDto,
} from '@main/auth/authentication/interface/auth.request';
import { IS_PUBLIC_KEY } from '@main/auth/authentication/auth.public.route';
import { Reflector } from '@nestjs/core';
import { ConfigKeys } from '@main/config/config.keys';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthRequest>();
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      request.user = await this.jwtService.verifyAsync<TokenDto>(token, {
        secret: this.configService.get<string>(ConfigKeys.SECRET),
      });
    } catch {
      throw new UnauthorizedException('Token expired');
    }

    return true;
  }

  private extractTokenFromRequest(request: FastifyRequest): string | undefined {
    const authorization = request.headers.authorization;
    if (authorization) {
      const [type, token] = authorization.split(' ');
      return type === 'Bearer' ? token : undefined;
    }
    return request.cookies?.access_token;
  }
}
