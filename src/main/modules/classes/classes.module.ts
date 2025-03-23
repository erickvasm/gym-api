import { Module } from '@nestjs/common';
import { ClassesService } from '@modules/classes/classes.service';
import { ClassesController } from '@modules/classes/classes.controller';
import { PrismaService } from '@/main/db/prisma.service';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService, PrismaService],
})
export class ClassesModule {}
