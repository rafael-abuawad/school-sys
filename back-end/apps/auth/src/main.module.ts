import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ManagerModule } from './manager/manager.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AuthModule,
    UserModule,
    ManagerModule,
    TeacherModule,
    StudentModule,
  ],
})
export class MainModule {}
