import { InputType, Field } from '@nestjs/graphql';
import { TeacherCreateInput } from './teacher-create.input';
import { UserCreateInput } from '../../user/input/user-create.input';

@InputType()
export class TeacherCreateWithUserInput {
  @Field(_type => TeacherCreateInput)
  teacher: TeacherCreateInput;

  @Field(_type => UserCreateInput)
  user: UserCreateInput;
}
