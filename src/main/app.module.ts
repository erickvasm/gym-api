import { Module } from '@nestjs/common';
import { AuthModule } from '@main/auth/auth.module';
import { ExercisesModule } from '@modules/exercises/exercises.module';
import { UsersModule } from '@modules/users/users.module';
import { GymsModule } from '@modules/gyms/gyms.module';
import { ClassesModule } from '@modules/classes/classes.module';
import { TrainersModule } from '@modules/trainers/trainers.module';
import { PaymentsModule } from '@modules/payments/payments.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ExercisesModule,
    GymsModule,
    ClassesModule,
    TrainersModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
