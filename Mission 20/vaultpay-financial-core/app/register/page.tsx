import { Metadata } from "next";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/auth/RegisterForm";
import AppLayout from "@/components/layout/AppLayout";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Register | VaultPay Financial Core",
  description: "Create your VaultPay account",
};

export default async function RegisterPage() {
  const user = await getCurrentUser();

  if (user) {
    if (user.role === "admin") {
      redirect("/admin/dashboard");
    }

    redirect("/client/dashboard");
  }

  return (
    <AppLayout>
      <section className="flex min-h-[80vh] items-center justify-center">

        <div className="grid w-full max-w-6xl overflow-hidden rounded-4xl border border-slate-800 bg-slate-900/60 shadow-2xl backdrop-blur-xl lg:grid-cols-2">

          {/* Left Section */}

          <div className="hidden flex-col justify-center bg-linear-to-br from-indigo-700 via-blue-700 to-slate-900 p-14 lg:flex">

            <span className="mb-6 w-fit rounded-full bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide">
              GET STARTED
            </span>

            <h1 className="text-5xl font-bold leading-tight">
              Create your business account today.
            </h1>

            <p className="mt-8 text-lg leading-8 text-blue-100">
              Join VaultPay to create professional invoices,
              receive secure Stripe payments, generate PDFs,
              manage customers and monitor your business
              finances from one powerful dashboard.
            </p>

            <div className="mt-12 space-y-6">

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xl">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold">
                    Unlimited Invoices
                  </h3>

                  <p className="text-sm text-blue-100">
                    Generate invoices in seconds.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xl">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold">
                    Secure Payments
                  </h3>

                  <p className="text-sm text-blue-100">
                    Powered by Stripe Checkout.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xl">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold">
                    PDF & Email Support
                  </h3>

                  <p className="text-sm text-blue-100">
                    Download invoices and email receipts instantly.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Section */}

          <div className="flex items-center justify-center p-8 sm:p-12">

            <div className="w-full max-w-md">

              <div className="mb-8 text-center">

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl font-bold">
                  V
                </div>

                <h2 className="text-4xl font-bold">
                  Create Account
                </h2>

                <p className="mt-3 text-slate-400">
                  Register to start managing invoices securely.
                </p>

              </div>

              <RegisterForm />

            </div>

          </div>

        </div>

      </section>
    </AppLayout>
  );
}