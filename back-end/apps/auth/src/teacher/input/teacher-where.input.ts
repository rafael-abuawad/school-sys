import {
  InputType,
  Field,
  ID,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class TeacherWhereInput implements Prisma.TeacherWhereInput {
  @Field(_type => ID, { nullable: true })
  id?: string;

  @Field(_returns => Float, { nullable: true })
  salary?: number;

  @Field(_returns => GraphQLISODateTime, { nullable: true })
  birthDay?: Date;
}
