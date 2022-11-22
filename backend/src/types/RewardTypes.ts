import { Field, InputType, Int, ObjectType } from "type-graphql";
import { FieldError } from "./UserTypes";
import { Reward } from "@generated/type-graphql";

@InputType()
export class CreateRewardDto {
  @Field(() => Int)
  amount: number;
  @Field()
  title: string;
  @Field({ nullable: true })
  image?: string;
  @Field()
  description: string;
  @Field()
  deliveredByMonth: string;
  @Field()
  deliveredByYear: string;
  @Field(() => Int)
  quantityRemaining: number;
  @Field(() => Int)
  projectId: number;
}

@InputType()
export class UpdateRewardDto {
  @Field()
  title: string;
  @Field({ nullable: true })
  image?: string;
  @Field()
  description: string;
  @Field()
  deliveredByMonth: string;
  @Field()
  deliveredByYear: string;
  @Field(() => Int)
  quantityRemaining: number;
}

@ObjectType() //can return
export class RewardResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Reward, { nullable: true })
  reward?: Reward;
}
