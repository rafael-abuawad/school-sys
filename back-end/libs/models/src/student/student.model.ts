import { Field, ID, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.model';

@ObjectType()
export class Student {
  @Field(_type => ID)
  id: string;

  @Field(_type => GraphQLISODateTime)
  birthDay: Date;

  @Field(_type => User)
  user: User;
}
