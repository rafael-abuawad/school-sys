import { Resolver, Mutation, ID, Args } from '@nestjs/graphql';
import { PrismaService } from '@app/shared';
import { User } from '@app/models';
import { UserWhereUniqueInput } from './input/user-where-unique.input';
import { UserUpdateInput } from './input/user-update.input';

@Resolver(_of => User)
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation(_returns => User, { name: 'updateUser' })
  updateUser(
    @Args('where', { type: () => UserWhereUniqueInput })
    where: UserWhereUniqueInput,
    @Args('data', { type: () => UserUpdateInput }) data: UserUpdateInput,
  ) {
    return this.prisma.user.update({ where, data });
  }

  @Mutation(_returns => User, { name: 'deleteUser' })
  deleteUser(
    @Args('where', { type: () => UserWhereUniqueInput })
    where: UserWhereUniqueInput,
  ) {
    return this.prisma.user.delete({ where });
  }
}
