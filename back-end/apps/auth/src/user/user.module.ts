import { Module } from '@nestjs/common';
import { PrismaService } from '@app/shared';
import { UserResolver } from './user.resolver';

@Module({
  providers: [PrismaService, UserResolver],
})
export class UserModule {}
