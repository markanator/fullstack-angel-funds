import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
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
import {
  CreateProjectInput,
  ProjectResponse,
  UpdateProjectInput,
} from "../types/ProjectTypes";

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
    // cacheing
    const projects = await getConnection()
      .createQueryBuilder()
      .select("project")
      .from(Project, "project")
      .limit(10)
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
      return {
        errors: [
          {
            field: "Error",
            message: "You are not authorized to update this project! 👀",
          },
        ],
      };
    }
    // MAIN ACTION
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
      // ERROR CATCHING
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
    const res = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Project)
      .where("id = :id and authorId = :authorId", {
        id,
        authorId: req.session.userId,
      })
      .returning("*")
      .execute();
    // await Project.delete({ id, authorId: req.session.userId });

    if ((res?.affected as number) < 1 || res?.raw.length <= 0) {
      return false;
    }

    console.log("### PROJECT DELETED!");
    return true;
  }

  // TODO 1) add vote logic
  // TODO 2) add donate logic
}
