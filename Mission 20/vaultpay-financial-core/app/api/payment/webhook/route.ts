import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { connectDB } from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import { sendEmail } from "@/lib/email";
import User from "@/models/User";

export async function POST(
  request: NextRequest
) {

  const body =
    await request.text();


  const signature =
    request.headers.get(
      "stripe-signature"
    );


  if (!signature) {

    return NextResponse.json(
      {
        success:false,
        message:"Missing signature",
      },
      {
        status:400,
      }
    );

  }


  let event: Stripe.Event;


  try {

    event =
      stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );


  } catch(error:any){

    console.error(
      "Webhook signature error:",
      error.message
    );


    return NextResponse.json(
      {
        success:false,
        message:"Invalid webhook signature",
      },
      {
        status:400,
      }
    );

  }



  try {


    if (
      event.type ===
      "checkout.session.completed"
    ) {


      const session =
        event.data.object as Stripe.Checkout.Session;



      const invoiceId =
        session.metadata?.invoiceId;
console.log("Webhook received");
console.log("Invoice ID:", invoiceId);
console.log("Session:", session.id);


      if (!invoiceId) {

        return NextResponse.json(
          {
            received:true,
          }
        );

      }



      await connectDB();



      await Invoice.findByIdAndUpdate(
  invoiceId,
  {
    status: "paid",

    paidAt: new Date(),

    stripeSessionId: session.id,

    paymentDetails: {
      stripeSessionId: session.id,
      paymentIntent:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id || "",
      paidAt: new Date(),
    },
  },
  {
    new: true,
  }
);
const updated = await Invoice.findById(invoiceId);

console.log("Updated Status:", updated?.status);
      const invoiceData =
  await Invoice.findById(invoiceId)
  .populate(
    "client",
    "name email"
  );

if (!invoiceData) {
  return NextResponse.json({
    received: true,
  });
}

const client =
  invoiceData.client as {
    name: string;
    email: string;
  };
if(invoiceData?.client){

  await sendEmail({

    to:
      client.email,

    subject:
      "VaultPay Payment Receipt",

    html:`

      <h2>
        Payment Successful
      </h2>

      <p>
        Hello ${client.name},
      </p>

      <p>
        Your invoice payment has been
        successfully processed.
      </p>

      <p>
        Invoice:
        ${invoiceData.invoiceNumber}
      </p>

      <p>
        Amount:
        $${invoiceData.total}
      </p>

      <p>
        Thank you for your business.
      </p>

    `,

  });

}

    }



    return NextResponse.json(
      {
        received:true,
      },
      {
        status:200,
      }
    );


  } catch(error){


    console.error(
      "Webhook processing error:",
      error
    );


    return NextResponse.json(
      {
        success:false,
        message:
          "Webhook processing failed",
      },
      {
        status:500,
      }
    );


  }

}