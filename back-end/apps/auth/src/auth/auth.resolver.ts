import { NotFoundException } from '@nestjs/common';
import { Resolver, Mutation, ID, Args } from '@nestjs/graphql';
import { PrismaService } from '@app/shared';
import { JwtPayload } from '@app/models';
import { compareSync } from 'bcrypt';
import { AuthService } from './auth.service';
import { UserLoginInput } from './input/user-login.input';

@Resolver(_of => JwtPayload)
export class AuthResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(_returns => JwtPayload, { name: 'login' })
  async login(
    @Args('data', { type: () => UserLoginInput }) data: UserLoginInput,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (user) {
      const match = compareSync(data.password, user.passwordHash);
      if (match) {
        return this.authService.login(user);
      } else {
        throw new NotFoundException('Wrong password');
      }
    } else {
      throw new NotFoundException("User wasn't found");
    }
  }
}
