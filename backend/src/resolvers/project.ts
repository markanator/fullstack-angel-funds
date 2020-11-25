import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Project } from "../entity/Project";
import { User } from "../entity/User";
import { isAuthed } from "../middleware/isAuthed";
import { MyContext } from "../types/MyContext";
import { FieldError } from "./user";

@InputType()
class CreateProjectInput {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  image: string;
  @Field()
  fundTarget: number;
  @Field()
  publishDate: string;
  @Field()
  targetDate: string;
  @Field()
  authorId: number;
}

@InputType()
class UpdateProjectInput {
  @Field()
  title: string;
  @Field()
  description: string;
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
class ProjectResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Project, { nullable: true })
  project?: Project;
}

@Resolver(Project)
export class ProjectResolver {
  // get author for a post
  @FieldResolver(() => User)
  async author(@Root() project: Project, @Ctx() { userLoader }: MyContext) {
    // will batch all users into a single call
    // and return them
    return userLoader.load(project.authorId);
  }

  // GET PROJECTS ARRAY
  @Query(() => [Project])
  async projects() {
    const projects = await getConnection()
      .createQueryBuilder()
      .select("*")
      .from(Project, "project")
      .getMany();

    return projects;
  }

  // GET PROJECT BY ID
  @Mutation(() => Project, { nullable: true })
  getProjectById(
    @Arg("id", () => Int) id: number
  ): Promise<Project | undefined> {
    return Project.findOne(id);
  }

  // CREATE PROJECT
  @Mutation(() => Project)
  @UseMiddleware(isAuthed)
  createProject(
    @Arg("input") input: CreateProjectInput,
    @Ctx() { req }: MyContext
  ): Promise<Project> {
    return Project.create({
      ...input,
      authorId: req.session.userId,
    }).save();
  }

  // UPDATE PROJECT
  @Mutation(() => ProjectResponse)
  @UseMiddleware(isAuthed)
  async updateProject(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: UpdateProjectInput,
    @Ctx() { req }: MyContext
  ): Promise<ProjectResponse> {
    // find project
    const projRes = await Project.findOne({ id });
    // see if they match
    if (req.session.userId !== projRes?.authorId) {
      // console.log("ERROR", projRes);
      return {
        errors: [
          {
            field: "Error",
            message: "You are not authorized to update this project! 👀",
          },
        ],
      };
    }
    try {
      const res = await getConnection()
        .createQueryBuilder()
        .update(Project)
        .set({ ...input, updatedAt: new Date() })
        .where("id = :id", {
          id,
        })
        .returning("*")
        .execute();

      console.log("update worked: ", res.raw);

      return { project: res.raw[0] };
    } catch (err) {
      console.error(err);

      return {
        errors: [
          {
            field: "Error",
            message: "Uh oh! Something went wrong! 👀",
          },
        ],
      };
    }
  }

  // DELETE POST
  @Mutation(() => Boolean)
  @UseMiddleware(isAuthed)
  async deleteProject(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    // TODO error catch

    try {
      await Project.delete({ id, authorId: req.session.userId });

      return true;
    } catch (err) {
      console.error(err);

      return false;
    }
  }

  // TODO 1) add vote logic
  // TODO 2) add donate logic
}
