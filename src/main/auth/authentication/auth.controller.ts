import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthJwtService } from '@main/auth/authentication/auth.service';
import { AuthGuard } from '@main/auth/authentication/auth.guard';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthJwtController {
  user: { id: string; email: string };

  constructor(private authService: AuthJwtService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: User) {
    return {
      name: req.name,
      email: req.email,
      role: req.role,
    };
  }
}
