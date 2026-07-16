import { Metadata } from "next";
import { redirect } from "next/navigation";

import LoginForm from "@/components/auth/LoginForm";
import AppLayout from "@/components/layout/AppLayout";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Login | VaultPay Financial Core",
  description: "Secure login to your VaultPay account",
};

export default async function LoginPage() {
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

          {/* Left Side */}

          <div className="hidden flex-col justify-center bg-linear-to-br from-blue-700 via-indigo-700 to-slate-900 p-14 lg:flex">

            <span className="mb-6 w-fit rounded-full bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide">
              WELCOME BACK
            </span>

            <h1 className="text-5xl font-bold leading-tight">
              Manage invoices with confidence.
            </h1>

            <p className="mt-8 text-lg leading-8 text-blue-100">
              Access your secure VaultPay dashboard to create
              invoices, monitor payments, download PDFs and
              manage your financial workflow from one place.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-6">

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <h2 className="text-3xl font-bold">100%</h2>
                <p className="mt-2 text-blue-100">
                  Secure Payments
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <h2 className="text-3xl font-bold">24/7</h2>
                <p className="mt-2 text-blue-100">
                  Dashboard Access
                </p>
              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="flex items-center justify-center p-8 sm:p-12">

            <div className="w-full max-w-md">

              <div className="mb-8 text-center">

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl font-bold">
                  V
                </div>

                <h2 className="text-4xl font-bold">
                  Sign In
                </h2>

                <p className="mt-3 text-slate-400">
                  Login to your VaultPay account.
                </p>

              </div>

              <LoginForm />

            </div>

          </div>

        </div>
      </section>
    </AppLayout>
  );
}