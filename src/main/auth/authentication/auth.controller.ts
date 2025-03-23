import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
} from '@nestjs/common';
import { AuthJwtService } from '@main/auth/authentication/auth.service';
import { User } from '@prisma/client';
import { Public } from '@main/auth/authentication/auth.public.route';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('auth')
export class AuthJwtController {
  user: { id: string; email: string };

  constructor(private authService: AuthJwtService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, string>, @Res() res: FastifyReply) {
    return this.authService.signIn(signInDto.email, signInDto.password, res);
  }

  @Get('refresh')
  async refreshToken(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    return this.authService.refreshToken(req, res);
  }

  @Get('profile')
  getProfile(@Request() req: User) {
    return {
      name: req.name,
      email: req.email,
      role: req.role,
    };
  }
}
