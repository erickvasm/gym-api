import { Module } from '@nestjs/common';
import { AuthJwtModule } from '@main/auth/authentication/auth.module';
import { ExercisesModule } from '@modules/exercises/exercises.module';
import { UsersModule } from '@modules/users/users.module';
import { GymsModule } from '@modules/gyms/gyms.module';
import { ClassesModule } from '@modules/classes/classes.module';
import { TrainersModule } from '@modules/trainers/trainers.module';
import { PaymentsModule } from '@modules/payments/payments.module';
import { AccessControlModule } from '@main/auth/access/access.control.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from '@main/auth/roles/roles.guard';
import { AuthGuard } from '@main/auth/authentication/auth.guard';
import { ConfigModule } from '@nestjs/config';
import config, { validationSchema } from '@main/config/config';

@Module({
  imports: [
    AccessControlModule,
    AuthJwtModule,
    UsersModule,
    ExercisesModule,
    GymsModule,
    ClassesModule,
    TrainersModule,
    PaymentsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema,
    }),
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
})
export class AppModule {}
