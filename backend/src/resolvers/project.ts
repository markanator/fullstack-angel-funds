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
import {Project, User} from '@generated/type-graphql'

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
  async projects(@Ctx() { prisma }: MyContext) {
    // TODO FUTURE paginate the response
    return prisma.project.findMany({ take: 10 })
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
    return prisma.project.findFirst({ where: { slug } });
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
    }});
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
        }
      })

      console.log("update worked: ", updatedProject);

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
  ): Promise<Boolean> {
    const deletedProject = await prisma.project.findFirst({
      where: {
        id,
        AND: {
          authorId: req.session.userId
        }
      }
    })
    if (!deletedProject) {
      return false;
    }
    const deleteRes = await prisma.project.delete({ where: { id: deletedProject.id }}).then(() => true).catch(()=> false)
    console.log("### PROJECT DELETED??", deleteRes);
    return deleteRes;
  }

  // TODO 1) add vote logic
  // TODO 2) add donate logic
}
