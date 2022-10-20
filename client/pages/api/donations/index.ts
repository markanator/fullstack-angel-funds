import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

import { CURRENCY, MIN_AMOUNT } from "../../../utils/constants";
import { formatAmountForStripe } from "../../../utils/stripe-helpers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-08-01",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const amount: number = req.body.amount;
    const projectTitle = req.body.projectTitle;
    const projectSlug = req.body.projectSlug;
    const projectDesc = req.body.projectDesc;
    const projectImg = req.body.projectImg;
    try {
      // Validate the amount that was passed from the client.
      if (!(amount >= MIN_AMOUNT)) {
        throw new Error("Insufficient amount.");
      }

      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
        submit_type: "donate",
        payment_method_types: ["card"],
        billing_address_collection: "required",
        line_items: [
          {
            // name: `Pledge for ${projectTitle}`,
            // description: projectDesc,
            // images: [projectImg],
            amount: formatAmountForStripe(amount, CURRENCY),
            // currency: CURRENCY,
            quantity: 1,
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
