import { InputType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class ManagerCreateInput implements Prisma.ManagerCreateInput {
  @Field()
  role: string;
}
