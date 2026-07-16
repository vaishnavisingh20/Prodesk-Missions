import Link from "next/link";
import {
  Clock,
  CheckCircle,
  FileText,
  CreditCard,
  ArrowRight,
} from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";
import PayInvoiceButton from "@/components/payment/PayInvoiceButton";
import { connectDB } from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import { getCurrentUser } from "@/lib/auth";
import { formatCurrency } from "@/utils/formatCurrency";
import { redirect } from "next/navigation";

const user = await getCurrentUser();

if (!user) {
  redirect("/login");
}

if (user.role !== "client") {
  redirect("/403");
}
export default async function ClientDashboard() {
  const user = await getCurrentUser();

  if (!user) return null;

  await connectDB();

  const invoices = await Invoice.find({
    client: user._id,
  })
    .sort({
      createdAt: -1,
    })
    .lean();

  const pendingInvoices = invoices.filter(
    (invoice: any) => invoice.status === "pending"
  );

  const paidInvoices = invoices.filter(
    (invoice: any) => invoice.status === "paid"
  );

  const outstandingAmount = pendingInvoices.reduce(
    (sum: number, invoice: any) => sum + invoice.total,
    0
  );

  const totalPaid = paidInvoices.reduce(
    (sum: number, invoice: any) => sum + invoice.total,
    0
  );

  return (
    <AppLayout
      title={`Welcome, ${user.name}`}
      subtitle="Track invoices, payments and downloads from one secure dashboard."
    >
      <div className="space-y-8">

        <section className="grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 backdrop-blur">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400">
                  Outstanding
                </p>

                <h2 className="mt-3 text-4xl font-bold">
                  {formatCurrency(outstandingAmount)}
                </h2>

              </div>

              <div className="rounded-2xl bg-yellow-500/20 p-4">

                <Clock
                  size={34}
                  className="text-yellow-400"
                />

              </div>

            </div>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 backdrop-blur">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400">
                  Paid
                </p>

                <h2 className="mt-3 text-4xl font-bold">
                  {formatCurrency(totalPaid)}
                </h2>

              </div>

              <div className="rounded-2xl bg-green-500/20 p-4">

                <CheckCircle
                  size={34}
                  className="text-green-400"
                />

              </div>

            </div>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 backdrop-blur">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400">
                  Total Invoices
                </p>

                <h2 className="mt-3 text-4xl font-bold">
                  {invoices.length}
                </h2>

              </div>

              <div className="rounded-2xl bg-blue-500/20 p-4">

                <FileText
                  size={34}
                  className="text-blue-400"
                />

              </div>

            </div>

          </div>

        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur">

          <div className="flex items-center justify-between border-b border-slate-800 px-8 py-6">

            <div>

              <h2 className="text-2xl font-bold">
                Invoice History
              </h2>

              <p className="mt-1 text-slate-400">
                View and pay your invoices securely.
              </p>

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="border-b border-slate-800 bg-slate-950/60">

                <tr>

                  <th className="px-8 py-5 text-left text-sm uppercase tracking-wider text-slate-400">
                    Invoice
                  </th>

                  <th className="px-8 py-5 text-left text-sm uppercase tracking-wider text-slate-400">
                    Amount
                  </th>

                  <th className="px-8 py-5 text-left text-sm uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-8 py-5 text-left text-sm uppercase tracking-wider text-slate-400">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>
                              {invoices.map((invoice: any) => (

                <tr
                  key={invoice._id.toString()}
                  className="border-b border-slate-800 transition hover:bg-slate-800/40"
                >

                  <td className="px-8 py-6">

                    <div>

                      <p className="font-semibold text-white">
                        {invoice.invoiceNumber}
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        {new Date(
                          invoice.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                  </td>

                  <td className="px-8 py-6 font-semibold text-green-400">
                    {formatCurrency(invoice.total)}
                  </td>

                  <td className="px-8 py-6">

                    <span
                      className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                        invoice.status === "paid"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {invoice.status}
                    </span>

                  </td>

                  <td className="px-8 py-6">

                    <div className="flex flex-wrap gap-3">

                      {invoice.status === "pending" && (
                        <PayInvoiceButton
                          invoiceId={invoice._id.toString()}
                        />
                      )}

                      <Link
                        href={`/client/invoices/${invoice._id}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 font-medium text-white transition hover:bg-slate-800"
                      >
                        View
                        <ArrowRight size={16} />
                      </Link>

                    </div>

                  </td>

                </tr>

              ))}

              </tbody>

            </table>

            {invoices.length === 0 && (

              <div className="py-20 text-center">

                <CreditCard
                  size={60}
                  className="mx-auto text-slate-700"
                />

                <h3 className="mt-6 text-2xl font-bold">
                  No invoices available
                </h3>

                <p className="mt-2 text-slate-400">
                  Your invoices will appear here after an
                  administrator creates them.
                </p>

              </div>

            )}

          </div>

        </section>

      </div>

    </AppLayout>

  );
}