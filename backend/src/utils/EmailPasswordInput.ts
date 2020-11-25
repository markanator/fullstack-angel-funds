import { InputType, Field } from "type-graphql";

@InputType() //typ-gql decorator
export class EmailPasswordInput {
  @Field()
  email: string;
  @Field()
  fullName: string;
  @Field()
  password: string;
}
