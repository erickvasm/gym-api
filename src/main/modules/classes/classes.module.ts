import { Module } from '@nestjs/common';
import { ClassesService } from '@modules/classes/classes.service';
import { ClassesController } from '@modules/classes/classes.controller';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
