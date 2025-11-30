import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/main/db/prisma.service';
import { CreatePaymentDto } from '@modules/payments/dto/create-payment.dto';
import { UpdatePaymentDto } from '@modules/payments/dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePaymentDto) {
    return this.prisma.payment.create({
      data: {
        amount: data.amount,
        date: data.date,
        paymentMethod: data.paymentMethod,
        user: { connect: { id: data.userId } },
        membership: { connect: { id: data.membershipId } },
        gym: { connect: { id: data.gymId } },
      },
    });
  }

  async findAll() {
    return this.prisma.payment.findMany({
      include: { user: true, membership: true },
    });
  }

  async findOne(id: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: id },
      include: { user: true, membership: true },
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async update(id: number, data: UpdatePaymentDto) {
    const paymentExists = await this.prisma.payment.findUnique({
      where: { id: id },
    });
    if (!paymentExists) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return this.prisma.payment.update({
      where: { id: id },
      data,
    });
  }

  async remove(id: number) {
    const paymentExists = await this.prisma.payment.findUnique({
      where: { id: id },
    });
    if (!paymentExists) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return this.prisma.payment.delete({ where: { id: id } });
  }

  async getUserPayments(userId: number) {
    return this.prisma.payment.findMany({
      where: { userId: userId },
      include: { membership: true },
    });
  }
}
