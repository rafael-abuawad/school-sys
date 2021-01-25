import { Module } from '@nestjs/common';
import { PrismaService } from '@app/shared';
import { TeacherResolver } from './teacher.resolver';

@Module({
  providers: [PrismaService, TeacherResolver],
})
export class TeacherModule {}
