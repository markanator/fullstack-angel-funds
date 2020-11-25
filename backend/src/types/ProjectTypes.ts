import { Field, InputType, ObjectType } from "type-graphql";
import { Project } from "../entity/Project";
import { FieldError } from "./UserTypes";

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
