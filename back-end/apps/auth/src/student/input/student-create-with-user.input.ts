import { InputType, Field } from '@nestjs/graphql';
import { StudentCreateInput } from './student-create.input';
import { UserCreateInput } from '../../user/input/user-create.input';

@InputType()
export class StudentCreateWithUserInput {
  @Field(_type => StudentCreateInput)
  student: StudentCreateInput;

  @Field(_type => UserCreateInput)
  user: UserCreateInput;
}
