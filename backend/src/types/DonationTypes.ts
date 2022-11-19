import { Donation } from "@generated/type-graphql";
import { ObjectType, Field, InputType, Int } from "type-graphql";
import { FieldError } from "./UserTypes";

@InputType()
export class CreateDonoInput {
  @Field()
  projectSlug: string;
  @Field()
  customerEmail: string;
  @Field(() => Int)
  amount: number;
  @Field()
  stripeCreatedAt: string;
  @Field()
  stripeReceiptUrl: string;
}

@ObjectType() //can return
export class DonationResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Donation, { nullable: true })
  data?: Donation;
}
