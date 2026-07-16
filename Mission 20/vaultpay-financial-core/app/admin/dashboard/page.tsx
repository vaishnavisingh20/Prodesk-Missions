import Link from "next/link";
import {
  DollarSign,
  Users,
  FileText,
  PlusCircle,
  TrendingUp,
} from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";
import { connectDB } from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import User from "@/models/User";
import { formatCurrency } from "@/utils/formatCurrency";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

const user = await getCurrentUser();

if (!user) {
  redirect("/login");
}

if (user.role !== "admin") {
  redirect("/403");
}
export default async function AdminDashboard() {
  await connectDB();

  const [
    totalClients,
    totalInvoices,
    paidInvoices,
    recentInvoices,
  ] = await Promise.all([
    User.countDocuments({
      role: "client",
    }),

    Invoice.countDocuments(),

    Invoice.find({
      status: "paid",
    }),

    Invoice.find()
      .populate(
        "client",
        "name companyName email"
      )
      .sort({
        createdAt: -1,
      })
      .limit(10)
      .lean(),
  ]);

  const totalRevenue = paidInvoices.reduce(
    (sum: number, invoice: any) =>
      sum + invoice.total,
    0
  );

  const pendingInvoices =
    totalInvoices - paidInvoices.length;

  return (
    <AppLayout
      title="Admin Dashboard"
      subtitle="Manage invoices, clients and payments from one secure dashboard."
    >
      <div className="space-y-8">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-300">
              Welcome Admin
            </span>

            <h2 className="mt-4 text-4xl font-bold">
              Financial Overview
            </h2>

            <p className="mt-2 text-slate-400">
              Monitor revenue, clients and invoices in
              real time.
            </p>

          </div>

          <Link
            href="/admin/invoices/new"
            className="flex items-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            <PlusCircle size={20} />
            Create Invoice
          </Link>

        </div>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 backdrop-blur">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400">
                  Revenue
                </p>

                <h2 className="mt-3 text-4xl font-bold">
                  {formatCurrency(totalRevenue)}
                </h2>

              </div>

              <div className="rounded-2xl bg-green-500/20 p-4">

                <DollarSign
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
                  Clients
                </p>

                <h2 className="mt-3 text-4xl font-bold">
                  {totalClients}
                </h2>

              </div>

              <div className="rounded-2xl bg-blue-500/20 p-4">

                <Users
                  size={34}
                  className="text-blue-400"
                />

              </div>

            </div>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 backdrop-blur">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400">
                  Invoices
                </p>

                <h2 className="mt-3 text-4xl font-bold">
                  {totalInvoices}
                </h2>

              </div>

              <div className="rounded-2xl bg-orange-500/20 p-4">

                <FileText
                  size={34}
                  className="text-orange-400"
                />

              </div>

            </div>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 backdrop-blur">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400">
                  Pending
                </p>

                <h2 className="mt-3 text-4xl font-bold">
                  {pendingInvoices}
                </h2>

              </div>

              <div className="rounded-2xl bg-yellow-500/20 p-4">

                <TrendingUp
                  size={34}
                  className="text-yellow-400"
                />

              </div>

            </div>

          </div>

        </section>
                <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur">

          <div className="flex items-center justify-between border-b border-slate-800 px-8 py-6">

            <div>

              <h2 className="text-2xl font-bold">
                Recent Invoices
              </h2>

              <p className="mt-1 text-slate-400">
                Latest invoices created in VaultPay.
              </p>

            </div>

            <Link
              href="/admin/invoices/new"
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              New Invoice
            </Link>

          </div>

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="border-b border-slate-800 bg-slate-950/60">

                <tr>

                  <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Invoice
                  </th>

                  <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Client
                  </th>

                  <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Amount
                  </th>

                  <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Created
                  </th>

                </tr>

              </thead>

              <tbody>

                {recentInvoices.map((invoice: any) => (

                  <tr
                    key={invoice._id.toString()}
                    className="border-b border-slate-800 transition hover:bg-slate-800/40"
                  >

                    <td className="px-8 py-6 font-semibold text-white">
                      {invoice.invoiceNumber}
                    </td>

                    <td className="px-8 py-6">

                      <div>

                        <p className="font-medium text-white">
                          {invoice.client?.companyName ||
                            invoice.client?.name}
                        </p>

                        <p className="text-sm text-slate-400">
                          {invoice.client?.email}
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

                    <td className="px-8 py-6 text-slate-300">
                      {new Date(
                        invoice.createdAt
                      ).toLocaleDateString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {recentInvoices.length === 0 && (

              <div className="py-20 text-center">

                <FileText
                  size={60}
                  className="mx-auto text-slate-700"
                />

                <h3 className="mt-5 text-2xl font-semibold">
                  No invoices found
                </h3>

                <p className="mt-2 text-slate-400">
                  Create your first invoice to get started.
                </p>

                <Link
                  href="/admin/invoices/new"
                  className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Create Invoice
                </Link>

              </div>

            )}

          </div>

        </section>

      </div>

    </AppLayout>

  );

}