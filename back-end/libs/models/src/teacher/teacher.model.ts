import {
  Field,
  ID,
  Float,
  GraphQLISODateTime,
  ObjectType,
} from '@nestjs/graphql';
import { User } from '../user/user.model';

@ObjectType()
export class Teacher {
  @Field(_type => ID)
  id: string;

  @Field(_type => GraphQLISODateTime)
  birthDay: Date;

  @Field(_type => Float)
  salary: number;

  @Field(_type => User)
  user: User;
}
