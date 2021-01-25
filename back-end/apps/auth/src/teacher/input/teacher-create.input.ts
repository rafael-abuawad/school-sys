import { InputType, Field, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class TeacherCreateInput implements Prisma.TeacherCreateInput {
  @Field(_returns => Float)
  salary: number;

  @Field(_returns => GraphQLISODateTime)
  birthDay: Date;
}
