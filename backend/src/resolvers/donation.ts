import * as dotenv from "dotenv";
import Stripe from "stripe";
import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Donation } from "../entity";
import { isAuthed } from "../middleware/isAuthed";
import { MyContext } from "../types/MyContext";
import { MIN_AMOUNT } from "../utils/constants";
import { formatAmountForStripe } from "../utils/stripe-helpers";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

@Resolver(Donation)
export class DonationResolver {
  //* Create a session for checkout
  @Mutation(() => String, { nullable: true })
  @UseMiddleware(isAuthed)
  async createStripeSession(
    @Arg("amount", () => Int) amount: number,
    @Arg("projectID", () => Int) projectID: number,
    @Arg("projectTitle") projectTitle: string,
    @Ctx() { req }: MyContext
  ) {
    if (!(amount >= MIN_AMOUNT)) {
      throw new Error("Invalid amount.");
    }

    const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
      {
        success_url: `${process.env.CORS_ORIGIN}/success?id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CORS_ORIGIN}/cancel`,
        submit_type: "donate",
        payment_method_types: ["card"],
        line_items: [
          {
            amount: formatAmountForStripe(amount, "usd"),
            name: `Donation Pledge for ${projectTitle}`,
            currency: "USD",
            quantity: 1,
          },
        ],
        metadata: {
          projectID,
          userID: req.session.userId,
        },
      }
    );

    return session.id;
  }

  // @Query(()=> new Promise<any>())
  // async fetchStripeSession(@Ctx() { req }: MyContext) {
  //   const session = stripe.checkout.sessions.retrieve(req.params.id, {
  //     expand: ["payment_intent"],
  //   });

  //   return {session};
  // }
}
