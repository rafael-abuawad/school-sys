import { InputType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class StudentCreateInput implements Prisma.StudentCreateInput {
  @Field(_returns => GraphQLISODateTime)
  birthDay: Date;
}
