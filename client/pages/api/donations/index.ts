import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { MIN_AMOUNT } from "../../../utils/constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const amount = +body.amount;
    const projectTitle = body.projectTitle;
    const projectSlug = body.projectSlug;
    const projectDesc = body.projectDesc;
    const projectImg = body.projectImg;

    try {
      // Validate the amount that was passed from the client.
      if (amount <= MIN_AMOUNT) {
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
              currency: "usd",
              unit_amount: amount,
              product_data: {
                name: `Pledge for ${projectTitle}`,
                description: projectDesc,
                images: [projectImg],
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
