import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { User, Donation, Project } from "@generated/type-graphql";
import { isAuthed } from "../middleware/isAuthed";
import { MyContext } from "../types/MyContext";
import { CreateDonoInput, DonationResponse } from "../types/DonationTypes";

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
  @Mutation(() => DonationResponse)
  @UseMiddleware(isAuthed)
  async syncStripeDono(
    @Arg("order") order: CreateDonoInput,
    @Ctx() { req, prisma }: MyContext
  ): Promise<DonationResponse> {
    try {
      const project = await prisma.project.findFirst({
        where: { slug: order.projectSlug },
      });
      if (!project) {
        return {
          errors: [
            {
              field: "project",
              message: "Project not found. Please try again later.",
            },
          ],
        };
      }

      const donoUser = await prisma.user.findFirst({
        where: { email: order.customerEmail },
      });

      const sameDono = await prisma.donation.findUnique({
        where: {
          stripeReceiptUrl: order.stripeReceiptUrl,
        },
      });
      if (sameDono) {
        console.log("### ALREADY SYNCED DONATION");
        return { data: sameDono };
      }

      const [donation, _updatedProject] = await prisma.$transaction([
        prisma.donation.create({
          data: {
            // projectId: project.id,
            // donorId: donoUser?.id || req.session.userId,
            project: {
              connect: {
                id: project.id,
              },
            },
            amount: order.amount,
            donor: {
              connect: {
                id: donoUser?.id || req.session.userId,
              },
            },
            customerId: donoUser?.cust_id || order.customerEmail,
            stripeReceiptUrl: order.stripeReceiptUrl,
            stripeCreatedAt: order.stripeCreatedAt,
          },
        }),
        prisma.project.update({
          where: { id: project.id },
          data: {
            currentFunds: project.currentFunds + order.amount,
            totalDonation_sum: project.totalDonation_sum + 1,
          },
        }),
      ]);

      console.log("### DONATION SYNCED");
      return { data: donation };
    } catch (error) {
      console.log("### ERROR DURING DONATION SYNC");
      console.log(error?.message);
      return {
        errors: [
          {
            field: "error",
            message: "Something went wrong. Please try again later.",
          },
        ],
      };
    }
  }
}
