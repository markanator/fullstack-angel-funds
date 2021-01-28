import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateDonoInput {
  @Field(() => Int)
  p_id: number;
  @Field()
  cust_id: string;
  @Field()
  s_created: string;
  @Field()
  s_receipt_url: string;
  @Field(() => Int)
  amount: number;
}
