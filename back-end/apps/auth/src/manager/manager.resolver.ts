import {
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Args,
  Parent,
} from '@nestjs/graphql';
import { Manager as PrismaManager } from '@prisma/client';
import { PrismaService } from '@app/shared';
import { Manager, User } from '@app/models';
import { genSaltSync, hashSync } from 'bcrypt';
import { ManagerCreateWithUserInput } from './input/manager-create-with-user.input';
import { ManagerWhereUniqueInput } from './input/manager-where-unique.input';
import { ManagerWhereInput } from './input/manager-where.input';

@Resolver(_of => Manager)
export class ManagerResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(_returns => Manager, { name: 'manager' })
  manager(
    @Args('where', { type: () => ManagerWhereUniqueInput })
    where: ManagerWhereUniqueInput,
  ) {
    return this.prisma.manager.findUnique({ where });
  }

  @Query(_returns => [Manager], { name: 'managers' })
  managers(
    @Args('where', { type: () => ManagerWhereInput, nullable: true })
    where: ManagerWhereInput,
  ) {
    return this.prisma.manager.findMany({ where });
  }

  @ResolveField(_returns => User)
  user(@Parent() root: PrismaManager) {
    return this.prisma.manager.findUnique({ where: { id: root.id } }).user();
  }

  @Mutation(_returns => Manager, { name: 'createManager' })
  createManager(
    @Args('data', { type: () => ManagerCreateWithUserInput })
    { user, manager }: ManagerCreateWithUserInput,
  ) {
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    const passwordHash = hashSync(user.password, salt);
    const data = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: 'MANAGER',
      passwordHash: passwordHash,
      manager: {
        create: { ...manager },
      },
    };
    return this.prisma.user.create({ data }).manager();
  }
}
