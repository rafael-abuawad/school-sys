import { InputType, Field, ID } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class StudentWhereUniqueInput implements Prisma.StudentWhereUniqueInput {
  @Field(_type => ID)
  id: string;
}
