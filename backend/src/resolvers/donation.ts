import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Donation, Project, User } from "../entity";
import { isAuthed } from "../middleware/isAuthed";
import { CreateDonoInput } from "../types/CreateDonoInput";
import { MyContext } from "../types/MyContext";

@Resolver(Donation)
export class DonationResolver {
  // get donor for a post
  @FieldResolver(() => User)
  async donor(@Root() dono: Donation, @Ctx() { userLoader }: MyContext) {
    // will batch all users into a single call
    // and return them
    return userLoader.load(dono.userId);
  }

  // get project for a donation
  @FieldResolver(() => Project)
  async project(
    @Root() donation: Donation,
    @Ctx() { projectLoader }: MyContext
  ) {
    // will batch all users into a single call
    // and return them
    return projectLoader.load(donation.projectId);
  }

  // create a donation after successfull stripe dono
  @Mutation(() => Donation)
  @UseMiddleware(isAuthed)
  async syncStripeDono(
    @Arg("order") order: CreateDonoInput,
    @Ctx() { req }: MyContext
  ): Promise<Donation> {
    return Donation.create({
      projectId: order.p_id,
      amount: order.amount,
      s_receipt_url: order.s_receipt_url,
      s_created: order.s_created,
      userId: req.session.userId,
      c_id: order.cust_id,
    }).save();
  }
}
