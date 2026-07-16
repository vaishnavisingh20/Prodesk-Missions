import Link from "next/link";
import {
  CheckCircle2,
  ArrowLeft,
  Receipt,
  ShieldCheck,
} from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

const user = await getCurrentUser();

if (!user) {
  redirect("/login");
}

if (user.role !== "client") {
  redirect("/403");
}
interface Props {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function PaymentSuccessPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const sessionId = params.session_id;

  return (
    <AppLayout
      title="Payment Successful"
      subtitle="Your invoice has been paid successfully."
    >
      <div className="mx-auto max-w-2xl">

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-10 text-center backdrop-blur">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20">

            <CheckCircle2
              size={60}
              className="text-green-400"
            />

          </div>

          <h1 className="mt-8 text-4xl font-bold">
            Payment Completed 🎉
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
            Thank you for your payment. Your transaction has
            been securely processed and your invoice status
            has been updated.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-left">

              <div className="mb-4 flex items-center gap-3">

                <ShieldCheck className="text-green-400" />

                <h3 className="font-semibold">
                  Payment Status
                </h3>

              </div>

              <span className="inline-flex rounded-full bg-green-500/20 px-4 py-2 font-semibold text-green-400">
                Successful
              </span>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-left">

              <div className="mb-4 flex items-center gap-3">

                <Receipt className="text-blue-400" />

                <h3 className="font-semibold">
                  Reference ID
                </h3>

              </div>

              <p className="break-all text-sm text-slate-400">
                {sessionId ?? "Unavailable"}
              </p>

            </div>

          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">

            <Link
              href="/client/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </Link>

            <Link
              href="/client/dashboard"
              className="inline-flex rounded-2xl border border-slate-700 px-6 py-4 font-semibold text-white transition hover:bg-slate-800"
            >
              View Invoices
            </Link>

          </div>

        </div>

      </div>

    </AppLayout>
  );
}