import { Module } from '@nestjs/common';
import { PaymentsService } from '@modules/payments/payments.service';
import { PaymentsController } from '@modules/payments/payments.controller';
import { PrismaService } from '@/main/db/prisma.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PrismaService],
})
export class PaymentsModule {}
