import { Module } from '@nestjs/common';
import { AuthJwtController } from '@main/auth/authentication/auth.controller';
import { AuthJwtService } from '@main/auth/authentication/auth.service';
import { UsersModule } from '@modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from '@main/config/config.keys';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret:
          configService.get<string>(ConfigKeys.SECRET) || 'default_secret',
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthJwtController],
  providers: [AuthJwtService],
  exports: [JwtModule, AuthJwtService],
})
export class AuthJwtModule {}
