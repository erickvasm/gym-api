import { Module } from '@nestjs/common';
import { AuthJwtController } from '@main/auth/authentication/auth.controller';
import { AuthJwtService } from '@main/auth/authentication/auth.service';
import { UsersModule } from '@modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { envConstants } from '@main/config/env-constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: envConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthJwtController],
  providers: [AuthJwtService],
})
export class AuthJwtModule {}
