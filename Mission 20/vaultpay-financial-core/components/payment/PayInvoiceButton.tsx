"use client";

import { useState } from "react";
import { Loader2, CreditCard } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

interface Props {
  invoiceId: string;
}

export default function PayInvoiceButton({
  invoiceId,
}: Props) {
  const [loading, setLoading] = useState(false);


  async function handlePayment() {

    if (loading) return;


    try {

      setLoading(true);


      const response =
        await axios.post(
          "/api/payment/create-checkout",
          {
            invoiceId,
          }
        );


      if (!response.data.success) {

        toast.error(
          response.data.message
        );

        setLoading(false);

        return;
      }


      const checkoutUrl =
        response.data.data.url;


      if (!checkoutUrl) {

        toast.error(
          "Unable to start payment"
        );

        setLoading(false);

        return;
      }



      window.location.href =
        checkoutUrl;



    } catch(error:any){

      toast.error(
        error?.response?.data?.message ||
        "Payment failed"
      );


      setLoading(false);

    }

  }



  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
    >

      {
        loading ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />

            Redirecting...

          </>
        ) : (

          <>
            <CreditCard size={18}/>

            Pay Invoice

          </>

        )
      }

    </button>
  );
}