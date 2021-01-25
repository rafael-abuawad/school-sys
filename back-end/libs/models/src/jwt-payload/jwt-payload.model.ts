import { Field, ID, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.model';

@ObjectType()
export class JwtPayload {
  @Field(_type => User)
  user: User;

  @Field()
  accessToken: string;
}
