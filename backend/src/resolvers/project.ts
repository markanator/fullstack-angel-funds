import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Project } from "../entity/Project";
// import { User } from "../entity/User";
import { isAuthed } from "../middleware/isAuthed";
import { MyContext } from "../types/MyContext";

@ObjectType()
class ProjectInput {
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

@Resolver(Project)
export class ProjectResolver {
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
    @Arg("input") input: ProjectInput,
    @Ctx() { req }: MyContext
  ): Promise<Project> {
    return Project.create({
      ...input,
      authorId: req.session.userId,
    }).save();
  }

  // UPDATE PROJECT
  @Mutation(() => Project, { nullable: true })
  @UseMiddleware(isAuthed)
  async updateProject(
    @Arg("id") id: number,
    @Arg("input") input: ProjectInput,
    @Ctx() { req }: MyContext
  ): Promise<Project | undefined> {
    const res = await getConnection()
      .createQueryBuilder()
      .update(Project)
      .set({ ...input })
      .where("id = :id and authorId = :authorId", {
        id,
        authorId: req.session.id,
      })
      .returning("*")
      .execute();

    return res.raw[0];
  }
}
