import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { connectDB } from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import { getCurrentUser } from "@/lib/auth";


export async function POST(
  request: NextRequest
) {

  try {

    const user = await getCurrentUser();


    if (!user) {

      return NextResponse.json(
        {
          success:false,
          message:"Unauthorized",
        },
        {
          status:401,
        }
      );

    }
if (user.role !== "client") {
  return NextResponse.json(
    { success: false, message: "Forbidden" },
    { status: 403 }
  );
}

    const { invoiceId } =
      await request.json();



    await connectDB();



    const invoice =
      await Invoice.findOne({
        _id: invoiceId,
        client:user._id,
      });



    if (!invoice) {

      return NextResponse.json(
        {
          success:false,
          message:"Invoice not found",
        },
        {
          status:404,
        }
      );

    }



    if(invoice.status === "paid"){

      return NextResponse.json(
        {
          success:false,
          message:"Invoice already paid",
        },
        {
          status:400,
        }
      );

    }




    const session =
      await stripe.checkout.sessions.create({

        mode:"payment",


        payment_method_types:[
          "card",
        ],


        line_items:[
          {
            price_data:{
              currency:"usd",

              product_data:{
                name:
                `Invoice ${invoice.invoiceNumber}`,
              },

              unit_amount:
              Math.round(
                invoice.total * 100
              ),
            },

            quantity:1,
          },
        ],



        metadata:{
          invoiceId:
          invoice._id.toString(),

          clientId:
          user._id.toString(),
        },



        success_url:
        `${process.env.NEXT_PUBLIC_APP_URL}/client/payment/success?session_id={CHECKOUT_SESSION_ID}`,


        cancel_url:
        `${process.env.NEXT_PUBLIC_APP_URL}/client/dashboard`,

      });





    return NextResponse.json(
      {
        success:true,

        data:{
          url:session.url,
        },
      },
      {
        status:200,
      }
    );



  } catch(error){

    console.error(
      "STRIPE CHECKOUT ERROR",
      error
    );


    return NextResponse.json(
      {
        success:false,
        message:
        "Unable to create payment session",
      },
      {
        status:500,
      }
    );

  }

}