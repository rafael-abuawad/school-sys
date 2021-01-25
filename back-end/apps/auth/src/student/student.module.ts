import { Module } from '@nestjs/common';
import { PrismaService } from '@app/shared';
import { StudentResolver } from './student.resolver';

@Module({
  providers: [PrismaService, StudentResolver],
})
export class StudentModule {}
