import { Module } from '@nestjs/common';
import { PrismaService } from '@app/shared';
import { ManagerResolver } from './manager.resolver';

@Module({
  providers: [PrismaService, ManagerResolver],
})
export class ManagerModule {}
