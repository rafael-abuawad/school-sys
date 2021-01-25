import { InputType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class StudentWhereInput implements Prisma.StudentWhereInput {
  @Field(_type => ID, { nullable: true })
  id?: string;

  @Field(_returns => GraphQLISODateTime, { nullable: true })
  birthDay?: Date;
}
