import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { MIN_AMOUNT_CENTS } from "../../../utils/constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});
export const config = {
  api: {
    bodyParser: true,
  },
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);

    const amount: string = body.rewardAmount; // already in cents
    const projectSlug: string = body.projectSlug;
    const rewardTitle: string = body.rewardTitle;
    const rewardDescription: string = body.rewardDescription;
    const rewardImg: string = body.rewardImg ?? undefined;

    try {
      // Validate the amount that was passed from the client.
      if (!amount || !(+amount >= MIN_AMOUNT_CENTS)) {
        throw new Error("Insufficient amount.");
      }

      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
        mode: "payment",
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "required",
        line_items: [
          {
            quantity: 1,
            price_data: {
              unit_amount: +amount,
              currency: "usd",
              product_data: {
                name: `Claiming reward: ${rewardTitle}`,
                description: rewardDescription,
                images: [rewardImg],
              },
            },
          },
        ],
        success_url: `${req.headers.origin}/donations/success?p_id=${projectSlug}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/project/${projectSlug}`,
      });

      res.status(200).json(checkoutSession);
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
