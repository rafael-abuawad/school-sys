import { UseGuards, UnauthorizedException } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Args,
  Parent,
} from '@nestjs/graphql';
import { Manager as PrismaManager } from '@prisma/client';
import {
  PrismaService,
  GqlAuthGuard,
  CurrentUser,
  CurrentUserClass,
} from '@app/shared';
import { Manager, User } from '@app/models';
import { genSaltSync, hashSync } from 'bcrypt';
import { ManagerCreateWithUserInput } from './input/manager-create-with-user.input';
import { ManagerWhereUniqueInput } from './input/manager-where-unique.input';

@Resolver(_of => Manager)
export class ManagerResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(_returns => Manager, { name: 'managerProfile' })
  @UseGuards(GqlAuthGuard)
  managerProfile(@CurrentUser() user: CurrentUserClass) {
    if (user.role == 'MANAGER') {
      const where = { id: user.id };
      return this.prisma.user.findUnique({ where }).manager();
    }
    throw new UnauthorizedException("You aren't allowed to see this");
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
