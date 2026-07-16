import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Calendar,
  CreditCard,
  Receipt,
} from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";
import { connectDB } from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import { getCurrentUser } from "@/lib/auth";
import { formatCurrency } from "@/utils/formatCurrency";

export const dynamic = "force-dynamic";

interface Props {
  params: {
    id: string;
  };
}

export default async function InvoiceDetailPage({
  params,
}: Props) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "client") {
    redirect("/403");
  }

  await connectDB();

  const invoice = await Invoice.findOne({
    _id: params.id,
    client: user._id,
  }).lean();

  if (!invoice) {
    notFound();
  }

  return (
    <AppLayout
      title={`Invoice ${invoice.invoiceNumber}`}
      subtitle="View invoice details and download your PDF receipt."
    >
      <div className="space-y-8">

        <Link
          href="/client/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-white transition hover:bg-slate-800"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-3xl font-bold">
                Invoice Summary
              </h2>

              <p className="mt-2 text-slate-400">
                Review your invoice before payment.
              </p>
            </div>

            <span
              className={`inline-flex w-fit rounded-full px-5 py-2 text-sm font-semibold ${
                invoice.status === "paid"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {invoice.status}
            </span>

          </div>


          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

              <div className="flex items-center gap-3">
                <CreditCard className="text-blue-400" />

                <span className="text-slate-400">
                  Amount
                </span>
              </div>

              <h3 className="mt-5 text-3xl font-bold">
                {formatCurrency(invoice.total)}
              </h3>

            </div>


            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

              <div className="flex items-center gap-3">
                <Calendar className="text-cyan-400" />

                <span className="text-slate-400">
                  Due Date
                </span>
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                {new Date(invoice.dueDate).toLocaleDateString()}
              </h3>

            </div>


            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

              <div className="flex items-center gap-3">
                <Receipt className="text-green-400" />

                <span className="text-slate-400">
                  Invoice Number
                </span>
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                {invoice.invoiceNumber}
              </h3>

            </div>

          </div>


          <div className="mt-10">

            <h2 className="mb-5 text-2xl font-bold">
              Invoice Items
            </h2>


            <div className="overflow-hidden rounded-2xl border border-slate-800">

              <table className="min-w-full">

                <thead className="bg-slate-950">

                  <tr>

                    <th className="px-6 py-4 text-left text-sm uppercase tracking-wider text-slate-400">
                      Description
                    </th>

                    <th className="px-6 py-4 text-left text-sm uppercase tracking-wider text-slate-400">
                      Qty
                    </th>

                    <th className="px-6 py-4 text-left text-sm uppercase tracking-wider text-slate-400">
                      Unit Price
                    </th>

                    <th className="px-6 py-4 text-left text-sm uppercase tracking-wider text-slate-400">
                      Total
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {invoice.items.map(
                    (item: any, index: number) => (

                      <tr
                        key={index}
                        className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                      >

                        <td className="px-6 py-5 text-white">
                          {item.description}
                        </td>

                        <td className="px-6 py-5 text-slate-300">
                          {item.quantity}
                        </td>

                        <td className="px-6 py-5 text-slate-300">
                          {formatCurrency(item.unitPrice)}
                        </td>

                        <td className="px-6 py-5 font-semibold text-green-400">
                          {formatCurrency(item.total)}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>


          {invoice.notes && (

            <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-950 p-6">

              <h3 className="mb-3 text-xl font-bold">
                Notes
              </h3>

              <p className="leading-7 text-slate-400">
                {invoice.notes}
              </p>

            </div>

          )}


          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-950 p-6">

            <div className="space-y-4">

              <div className="flex items-center justify-between">

                <span className="text-slate-400">
                  Subtotal
                </span>

                <span className="font-semibold">
                  {formatCurrency(invoice.subtotal)}
                </span>

              </div>


              <div className="flex items-center justify-between">

                <span className="text-slate-400">
                  Tax
                </span>

                <span className="font-semibold">
                  {formatCurrency(invoice.tax)}
                </span>

              </div>


              <div className="border-t border-slate-800 pt-4">

                <div className="flex items-center justify-between">

                  <span className="text-xl font-bold">
                    Total
                  </span>

                  <span className="text-3xl font-bold text-blue-400">
                    {formatCurrency(invoice.total)}
                  </span>

                </div>

              </div>

            </div>

          </div>


          <div className="mt-10 flex justify-end">

            <a
              href={`/api/invoices/${invoice._id}/pdf`}
              className="inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
            >

              <Download size={20} />

              Download PDF

            </a>

          </div>


        </section>

      </div>
    </AppLayout>
  );
}