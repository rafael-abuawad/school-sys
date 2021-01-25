import {
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Args,
  Parent,
} from '@nestjs/graphql';
import { Teacher as PrismaTeacher } from '@prisma/client';
import { PrismaService } from '@app/shared';
import { Teacher, User } from '@app/models';
import { genSaltSync, hashSync } from 'bcrypt';
import { TeacherCreateWithUserInput } from './input/teacher-create-with-user.input';
import { TeacherWhereUniqueInput } from './input/teacher-where-unique.input';
import { TeacherWhereInput } from './input/teacher-where.input';

@Resolver(_of => Teacher)
export class TeacherResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(_returns => Teacher, { name: 'teacher' })
  teacher(
    @Args('where', { type: () => TeacherWhereUniqueInput })
    where: TeacherWhereUniqueInput,
  ) {
    return this.prisma.teacher.findUnique({ where });
  }

  @Query(_returns => [Teacher], { name: 'teachers' })
  teachers(
    @Args('where', { type: () => TeacherWhereInput, nullable: true })
    where: TeacherWhereInput,
  ) {
    return this.prisma.teacher.findMany({ where });
  }

  @ResolveField(_returns => User)
  user(@Parent() root: PrismaTeacher) {
    return this.prisma.teacher.findUnique({ where: { id: root.id } }).user();
  }

  @Mutation(_returns => Teacher, { name: 'createTeacher' })
  createTeacher(
    @Args('data', { type: () => TeacherCreateWithUserInput })
    { user, teacher }: TeacherCreateWithUserInput,
  ) {
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    const passwordHash = hashSync(user.password, salt);
    const data = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: 'TEACHER',
      passwordHash: passwordHash,
      teacher: {
        create: { ...teacher },
      },
    };
    return this.prisma.user.create({ data }).teacher();
  }
}
