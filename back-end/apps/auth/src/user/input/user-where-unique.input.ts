import { InputType, Field, ID } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class UserWhereUniqueInput implements Prisma.UserWhereUniqueInput {
  @Field(_type => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  email?: string;
}
