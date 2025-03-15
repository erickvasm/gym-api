import { Module } from '@nestjs/common';
import { PaymentsService } from '@modules/payments/payments.service';
import { PaymentsController } from '@modules/payments/payments.controller';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
