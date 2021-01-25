import { InputType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class UserLoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
