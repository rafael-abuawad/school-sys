import { InputType, Field, ID } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class ManagerWhereUniqueInput implements Prisma.ManagerWhereUniqueInput {
  @Field(_type => ID)
  id: string;
}
