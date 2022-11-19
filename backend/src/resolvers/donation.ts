import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { User, Donation, Project } from '@generated/type-graphql'
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
    return userLoader.load(dono.donorId);
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
    @Ctx() { req, prisma }: MyContext
  ): Promise<Donation> {
    return prisma.donation.create({
      data: {
      projectId: order.p_id,
      amount: order.amount,
      stripeReceiptUrl: order.s_receipt_url,
      stripeCreatedAt: order.s_created,
      donorId: req.session.userId,
      customerId: order.cust_id,
    }})
  }
}
