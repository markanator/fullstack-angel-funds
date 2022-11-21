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
import slugify from "slugify";
import { isAuthed } from "../middleware/isAuthed";
import { MyContext } from "../types/MyContext";
import {
  CreateProjectInput,
  ProjectResponse,
  UpdateProjectInput,
} from "../types/ProjectTypes";
import { Project, User, Donation, Reward } from "@generated/type-graphql";

@Resolver(Project)
export class ProjectResolver {
  // get author for a post
  @FieldResolver(() => User)
  async author(@Root() project: Project, @Ctx() { userLoader }: MyContext) {
    // will batch all users into a single call
    return userLoader.load(project.authorId);
  }
  @FieldResolver(() => [Reward], { nullable: true })
  async rewards(
    @Root() project: Project,
    @Ctx() { projectRewardsLoader }: MyContext
  ) {
    console.log("DATA LOADING REWARD FOR PROJECT :: %d", project.id);
    // will batch all users into a single call
    return projectRewardsLoader.load(project.id);
  }
  @FieldResolver(() => [Donation], { nullable: true })
  async donations(
    @Root() project: Project,
    @Ctx() { donationsLoader }: MyContext
  ) {
    // will batch all users into a single call
    console.log("DATA LOADING DONO FOR PROJECT :: %d", project.id);
    return donationsLoader.load(project.id);
  }

  // GET PROJECTS ARRAY
  @Query(() => [Project])
  async projects(@Ctx() { prisma }: MyContext) {
    // TODO FUTURE paginate the response
    return prisma.project.findMany({ take: 10 });
  }

  // GET PROJECT BY UserID
  @Query(() => [Project], { nullable: true })
  getProjectsByUserID(
    @Arg("id", () => Int) id: number,
    @Ctx() { prisma }: MyContext
  ): Promise<Project[] | undefined> {
    return prisma.project.findMany({ where: { authorId: id } });
  }

  // GET PROJECT BY SLUG
  @Query(() => Project, { nullable: true })
  getProjectBySlug(
    @Arg("slug") slug: string,
    @Ctx() { prisma }: MyContext
  ): Promise<Project | null> {
    return prisma.project.findUnique({
      where: { slug },
    });
  }

  // GET AUTHORED PROJECT BY ID
  @Query(() => ProjectResponse)
  @UseMiddleware(isAuthed)
  async getAuthoredProjectById(
    @Arg("id") id: number,
    @Ctx() { req, prisma }: MyContext
  ): Promise<ProjectResponse> {
    // find project
    const projRes = await prisma.project.findFirst({
      where: { id },
    });
    if (!projRes) {
      return {
        errors: [
          {
            field: "Resource",
            message: "Project not found!",
          },
        ],
      };
    }

    // see if they match
    if (req.session.userId !== projRes?.authorId) {
      return {
        errors: [
          {
            field: "Authorization",
            message: "You are not authorized to view this project! 👀",
          },
        ],
      };
    }

    return { project: projRes };
  }

  // CREATE PROJECT
  @Mutation(() => Project)
  @UseMiddleware(isAuthed)
  createProject(
    @Arg("input") input: CreateProjectInput,
    @Ctx() { req, prisma }: MyContext
  ): Promise<Project> {
    const slug = slugify(input.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });
    return prisma.project.create({
      data: {
        ...input,
        slug,
        authorId: req.session.userId,
      },
    });
  }

  // UPDATE PROJECT
  @Mutation(() => ProjectResponse)
  @UseMiddleware(isAuthed)
  async updateProject(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: UpdateProjectInput,
    @Ctx() { req, prisma }: MyContext
  ): Promise<ProjectResponse> {
    // find project
    const projRes = await prisma.project.findFirst({ where: { id } });
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
      const updatedProject = await prisma.project.update({
        where: { id },
        data: {
          ...input,
          updatedAt: new Date(),
        },
      });

      console.log("### update worked");

      return { project: updatedProject };
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
    @Ctx() { req, prisma }: MyContext
  ): Promise<boolean> {
    const deletedProject = await prisma.project.findFirst({
      where: {
        id,
        AND: {
          authorId: req.session.userId,
        },
      },
    });
    if (!deletedProject) {
      return false;
    }
    const deleteRes = await prisma.project
      .delete({ where: { id: deletedProject.id } })
      .then(() => true)
      .catch(() => false);
    console.log("### PROJECT DELETED??", deleteRes);
    return deleteRes;
  }

  // TODO 1) add vote logic
  // TODO 2) add donate logic
}
