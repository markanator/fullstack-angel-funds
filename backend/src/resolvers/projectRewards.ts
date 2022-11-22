import { Project, Reward, User } from "@generated/type-graphql";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { isAuthed } from "../middleware/isAuthed";
import { MyContext } from "../types/MyContext";
import { CreateRewardDto, RewardResponse } from "../types/RewardTypes";

@Resolver(Reward)
export class RewardsResolver {
  // get author for a post
  @FieldResolver(() => User)
  async author(@Root() project: Project, @Ctx() { userLoader }: MyContext) {
    // will batch items into a single call
    return userLoader.load(project.authorId);
  }
  // get project for a donation
  @FieldResolver(() => Project)
  async project(@Root() reward: Reward, @Ctx() { projectLoader }: MyContext) {
    // will batch items into a single call
    return projectLoader.load(reward.projectId);
  }

  @Mutation(() => RewardResponse)
  @UseMiddleware(isAuthed)
  async createProjectReward(
    @Arg("input") input: CreateRewardDto,
    @Ctx() { req, prisma }: MyContext
  ): Promise<RewardResponse> {
    try {
      const projectToEdit = await prisma.project.findFirst({
        where: { id: input.projectId, AND: { authorId: req.session?.userId } },
        include: {
          rewards: true,
        },
      });
      if (!projectToEdit) {
        return {
          errors: [{ field: "Resource", message: "Project not found" }],
        };
      }
      if (projectToEdit.rewards?.length > 0) {
        return {
          errors: [
            { field: "Resource", message: "Project already contains rewards." },
          ],
        };
      }
      const { projectId, ...restOfInput } = input;
      const newReward = await prisma.reward.create({
        data: {
          ...restOfInput,
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      });

      return { reward: newReward };
    } catch (error) {
      return {
        errors: [{ field: "Server Error", message: error?.message }],
      };
    }
  }
}
