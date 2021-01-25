import { Field, ID, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.model';

@ObjectType()
export class Manager {
  @Field(_type => ID)
  id: string;

  @Field()
  role: string;

  @Field(_type => User)
  user: User;
}
