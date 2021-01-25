import { InputType, Field, ID } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class TeacherWhereUniqueInput implements Prisma.TeacherWhereUniqueInput {
  @Field(_type => ID)
  id: string;
}
