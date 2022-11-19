import { Field, InputType, ObjectType } from "type-graphql";
import { FieldError } from "./UserTypes";
import { Project } from '@generated/type-graphql'


@InputType()
export class CreateProjectInput {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  category: string;
  @Field()
  image: string;
  @Field()
  fundTarget: number;
  @Field()
  publishDate: string;
  @Field()
  targetDate: string;
  @Field()
  currentFunds: number;
}

@InputType()
export class UpdateProjectInput {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  category: string;
  @Field()
  image: string;
  @Field()
  fundTarget: number;
  @Field()
  publishDate: string;
  @Field()
  targetDate: string;
}

@ObjectType() //can return
export class ProjectResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Project, { nullable: true })
  project?: Project;
}
