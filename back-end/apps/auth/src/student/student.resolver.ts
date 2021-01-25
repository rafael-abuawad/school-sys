import { UseGuards, UnauthorizedException } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Args,
  Parent,
} from '@nestjs/graphql';
import { Student as PrismaStudent } from '@prisma/client';
import {
  PrismaService,
  GqlAuthGuard,
  CurrentUser,
  CurrentUserClass,
} from '@app/shared';
import { Student, User } from '@app/models';
import { genSaltSync, hashSync } from 'bcrypt';
import { StudentCreateWithUserInput } from './input/student-create-with-user.input';
import { StudentWhereUniqueInput } from './input/student-where-unique.input';
import { StudentWhereInput } from './input/student-where.input';

@Resolver(_of => Student)
export class StudentResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(_returns => Student, { name: 'studentProfile' })
  @UseGuards(GqlAuthGuard)
  studentProfile(@CurrentUser() user: CurrentUserClass) {
    if (user.role == 'STUDENT') {
      const where = { id: user.id };
      return this.prisma.user.findUnique({ where }).student();
    }
    throw new UnauthorizedException("You aren't allowed to see this");
  }

  @Query(_returns => Student, { name: 'student' })
  @UseGuards(GqlAuthGuard)
  student(
    @Args('where', { type: () => StudentWhereUniqueInput })
    where: StudentWhereUniqueInput,
    @CurrentUser() user: CurrentUserClass,
  ) {
    if (user.role == 'MANAGER' || user.role == 'TEACHER') {
      return this.prisma.student.findUnique({ where });
    }
    throw new UnauthorizedException("You aren't allowed to see this");
  }

  @Query(_returns => [Student], { name: 'students' })
  @UseGuards(GqlAuthGuard)
  students(
    @Args('where', { type: () => StudentWhereInput, nullable: true })
    where: StudentWhereInput,
    @CurrentUser() user: CurrentUserClass,
  ) {
    if (user.role == 'MANAGER' || user.role == 'TEACHER') {
      return this.prisma.student.findMany({ where });
    }
    throw new UnauthorizedException("You aren't allowed to see this");
  }

  @ResolveField(_returns => User)
  user(@Parent() root: PrismaStudent) {
    return this.prisma.student.findUnique({ where: { id: root.id } }).user();
  }

  @Mutation(_returns => Student, { name: 'createStudent' })
  createStudent(
    @Args('data', { type: () => StudentCreateWithUserInput })
    { user, student }: StudentCreateWithUserInput,
  ) {
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    const passwordHash = hashSync(user.password, salt);
    const data = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: 'STUDENT',
      passwordHash: passwordHash,
      student: {
        create: { ...student },
      },
    };
    return this.prisma.user.create({ data }).student();
  }
}
