import { InputType, Field, ID } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class ManagerWhereInput implements Prisma.ManagerWhereInput {
  @Field(_type => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  role?: string;
}
