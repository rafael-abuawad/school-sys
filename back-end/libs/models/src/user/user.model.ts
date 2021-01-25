import { Field, ID, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(_type => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  role: string;

  @Field(_type => GraphQLISODateTime)
  createdAt: Date;

  @Field(_type => GraphQLISODateTime)
  updatedAt: Date;

  @Field(_type => GraphQLISODateTime)
  lastLogin: Date;
}
