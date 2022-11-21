import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Reward, User, Project } from "@generated/type-graphql";
import { MyContext } from "../types/MyContext";

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
}
