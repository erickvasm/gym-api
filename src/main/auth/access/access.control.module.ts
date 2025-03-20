import { Module } from '@nestjs/common';
import { AccessControlService } from '@main/auth/access/access.control.service';

@Module({
  providers: [AccessControlService],
  exports: [AccessControlService],
})
export class AccessControlModule {}
