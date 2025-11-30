import {
  Injectable,
  NotFoundException,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from '@main/config/config.keys';
import { SignUpDto } from '@main/auth/authentication/dto/signup.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthJwtService {
  public readonly ACCESS_TOKEN_EXPIRES = '15m';

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(
    email: string,
    password: string,
    @Res() res: FastifyReply,
  ): Promise<void> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email credentials');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid password credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      gymId: user.gymId,
    };
    const access_token = this.jwtService.sign(payload, {
      expiresIn: this.ACCESS_TOKEN_EXPIRES,
    });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    res.setCookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure:
        this.configService.get<string>(ConfigKeys.NODE_ENV) === 'production',
      sameSite: 'strict',
      path: '/',
    });

    res.send({ access_token });
  }

  async signUp(signUpDto: SignUpDto, @Res() res: FastifyReply): Promise<void> {
    const gym = await this.usersService.findGymByCode(signUpDto.gymCode);

    if (!gym) {
      throw new NotFoundException('Invalid gym code');
    }

    const user = await this.usersService.create({
      name: signUpDto.name,
      email: signUpDto.email,
      password: signUpDto.password,
      role: UserRole.STUDENT,
      gymId: gym.id,
    });

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      gymId: user.gymId,
    };

    const access_token = this.jwtService.sign(payload, {
      expiresIn: this.ACCESS_TOKEN_EXPIRES,
    });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    res.setCookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure:
        this.configService.get<string>(ConfigKeys.NODE_ENV) === 'production',
      sameSite: 'strict',
      path: '/',
    });

    res.send({ access_token });
  }

  async refreshToken(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const refresh_token: string | undefined = req.cookies.refresh_token;

    if (!refresh_token) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const payload: Record<string, any> =
        this.verifyRefreshToken(refresh_token);
      const new_access_token: string = this.generateAccessToken(payload);

      return res.send({ access_token: new_access_token });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token: ' + error);
    }
  }

  verifyRefreshToken(token: string): Record<string, any> {
    try {
      return this.jwtService.verify<Record<string, any>>(token);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  generateAccessToken(payload: Record<string, any>) {
    try {
      const cleanPayload = { ...payload };
      delete cleanPayload.exp;
      delete cleanPayload.iat;

      return this.jwtService.sign(cleanPayload, {
        expiresIn: this.ACCESS_TOKEN_EXPIRES,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token: ' + error);
    }
  }
}
