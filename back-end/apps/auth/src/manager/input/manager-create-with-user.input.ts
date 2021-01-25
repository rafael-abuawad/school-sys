import { InputType, Field } from '@nestjs/graphql';
import { ManagerCreateInput } from './manager-create.input';
import { UserCreateInput } from '../../user/input/user-create.input';

@InputType()
export class ManagerCreateWithUserInput {
  @Field(_type => ManagerCreateInput)
  manager: ManagerCreateInput;

  @Field(_type => UserCreateInput)
  user: UserCreateInput;
}
