import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthJwtService } from '@main/auth/authentication/auth.service';
import { AuthJwtController } from '@main/auth/authentication/auth.controller';
import { UsersModule } from '@modules/users/users.module';
import { ConfigKeys } from '@main/config/config.keys';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(ConfigKeys.SECRET),
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  controllers: [AuthJwtController],
  providers: [AuthJwtService],
  exports: [JwtModule, AuthJwtService],
})
export class AuthJwtModule {}
