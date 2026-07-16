"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, CreditCard, FileText, BarChart3, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 text-white">

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold">
              V
            </div>

            <div>
              <h1 className="text-xl font-bold">
                VaultPay
              </h1>

              <p className="text-xs text-slate-400">
                Financial Core
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
  <Link
    href="/"
    className="hover:text-white"
  >
    Home
  </Link>

  <Link
    href="/login"
    className="hover:text-white"
  >
    Login
  </Link>

  <Link
    href="/register"
    className="hover:text-white"
  >
    Register
  </Link>
</nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg border border-slate-700 px-5 py-2 text-sm hover:bg-slate-800"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>

        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">

        <div>

          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            <ShieldCheck size={16} />
            Secure Invoice Management Platform
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-7xl">
            Simplify
            <span className="block text-blue-500">
              Business Payments
            </span>
            With VaultPay
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
            Create professional invoices, accept secure online payments,
            generate PDFs, manage clients, and monitor your financial
            workflow through one modern dashboard.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/register"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold transition hover:bg-blue-700"
            >
              Start Free
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-slate-700 px-7 py-4 font-semibold hover:bg-slate-800"
            >
              Login
            </Link>

          </div>

          <div className="mt-12 grid grid-cols-3 gap-6">

            <div>
              <h2 className="text-3xl font-bold text-blue-400">
                50K+
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Invoices Generated
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-400">
                $12M+
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Payments Processed
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-400">
                99.9%
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Platform Uptime
              </p>
            </div>

          </div>

        </div>

        {/* Dashboard Preview */}

        <div className="relative">

          <div className="absolute -left-10 top-8 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl"></div>

          <div className="absolute -right-8 bottom-8 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">

            <div className="border-b border-slate-800 px-6 py-5">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-xl font-bold">
                    Dashboard
                  </h3>

                  <p className="text-sm text-slate-400">
                    Financial Overview
                  </p>

                </div>

                <div className="rounded-lg bg-emerald-500/20 px-4 py-2 text-sm text-emerald-400">
                  Active
                </div>

              </div>

            </div>

            <div className="space-y-6 p-6">

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-2xl bg-slate-800 p-5">

                  <CreditCard
                    className="mb-4 text-blue-500"
                    size={34}
                  />

                  <h4 className="text-2xl font-bold">
                    $84,250
                  </h4>

                  <p className="mt-2 text-sm text-slate-400">
                    Revenue
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-800 p-5">

                  <FileText
                    className="mb-4 text-blue-500"
                    size={34}
                  />

                  <h4 className="text-2xl font-bold">
                    216
                  </h4>

                  <p className="mt-2 text-sm text-slate-400">
                    Invoices
                  </p>

                </div>

              </div>

              <div className="rounded-2xl bg-slate-800 p-6">

                <div className="mb-5 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <BarChart3 className="text-blue-500" />

                    <span className="font-semibold">
                      Recent Activity
                    </span>

                  </div>

                  <span className="text-sm text-slate-400">
                    Today
                  </span>

                </div>

                <div className="space-y-4">

                  <div className="flex items-center justify-between rounded-xl bg-slate-900 p-4">

                    <div className="flex items-center gap-3">

                      <CheckCircle2 className="text-green-500" />

                      <div>

                        <p className="font-medium">
                          Invoice Paid
                        </p>

                        <p className="text-sm text-slate-400">
                          INV-00012
                        </p>

                      </div>

                    </div>

                    <span className="font-semibold text-green-400">
                      +$2,450
                    </span>

                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-900 p-4">

                    <div className="flex items-center gap-3">

                      <CheckCircle2 className="text-blue-500" />

                      <div>

                        <p className="font-medium">
                          New Invoice
                        </p>

                        <p className="text-sm text-slate-400">
                          INV-00013
                        </p>

                      </div>

                    </div>

                    <span className="font-semibold text-blue-400">
                      Pending
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
    </main>
  );
}

    {/* Features */}

      <section
        id="features"
        className="border-t border-slate-800 py-24"
      >

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
              FEATURES
            </span>

            <h2 className="mt-6 text-4xl font-bold">
              Everything You Need
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
              VaultPay combines invoicing, secure payments,
              analytics and client management into one modern
              financial platform.
            </p>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:-translate-y-2 hover:border-blue-500">

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">

                <FileText size={32} />

              </div>

              <h3 className="text-2xl font-bold">
                Smart Invoicing
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                Generate professional invoices in seconds with
                automatic calculations, tax support and PDF
                downloads.
              </p>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:-translate-y-2 hover:border-blue-500">

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600">

                <CreditCard size={32} />

              </div>

              <h3 className="text-2xl font-bold">
                Stripe Payments
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                Accept secure online payments with Stripe and
                automatically update invoice status after every
                successful transaction.
              </p>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:-translate-y-2 hover:border-blue-500">

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600">

                <ShieldCheck size={32} />

              </div>

              <h3 className="text-2xl font-bold">
                Enterprise Security
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                JWT authentication, protected routes and role
                based access ensure your financial data stays
                protected.
              </p>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:-translate-y-2 hover:border-blue-500">

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-600">

                <BarChart3 size={32} />

              </div>

              <h3 className="text-2xl font-bold">
                Business Analytics
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                Track revenue, pending invoices, successful
                payments and client activity from one powerful
                dashboard.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-3xl bg-slate-900 p-10 text-center">

              <h2 className="text-5xl font-extrabold text-blue-500">
                50K+
              </h2>

              <p className="mt-4 text-slate-400">
                Invoices Created
              </p>

            </div>

            <div className="rounded-3xl bg-slate-900 p-10 text-center">

              <h2 className="text-5xl font-extrabold text-blue-500">
                10K+
              </h2>

              <p className="mt-4 text-slate-400">
                Businesses
              </p>

            </div>

            <div className="rounded-3xl bg-slate-900 p-10 text-center">

              <h2 className="text-5xl font-extrabold text-blue-500">
                $12M+
              </h2>

              <p className="mt-4 text-slate-400">
                Payments Processed
              </p>

            </div>

            <div className="rounded-3xl bg-slate-900 p-10 text-center">

              <h2 className="text-5xl font-extrabold text-blue-500">
                99.9%
              </h2>

              <p className="mt-4 text-slate-400">
                Platform Uptime
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Workflow */}

      <section
        id="workflow"
        className="border-y border-slate-800 py-24"
      >

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <h2 className="text-4xl font-bold">
              How VaultPay Works
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-slate-400">
              Manage your complete payment lifecycle in just a
              few simple steps.
            </p>

          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-4">

            {[
              {
                step: "01",
                title: "Create Invoice",
                text: "Generate a professional invoice with products, taxes and payment details.",
              },
              {
                step: "02",
                title: "Send to Client",
                text: "Clients receive their invoice instantly and can review every detail online.",
              },
              {
                step: "03",
                title: "Secure Payment",
                text: "Stripe Checkout processes payments securely using trusted infrastructure.",
              },
              {
                step: "04",
                title: "Track Status",
                text: "Invoice status automatically changes to Paid and receipts are generated.",
              },
            ].map((item) => (

              <div
                key={item.step}
                className="rounded-3xl bg-slate-900 p-8"
              >

                <div className="mb-6 text-5xl font-extrabold text-blue-600">
                  {item.step}
                </div>

                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-5 leading-7 text-slate-400">
                  {item.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>
      {/* Testimonials */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
              TESTIMONIALS
            </span>

            <h2 className="mt-6 text-4xl font-bold">
              Trusted by Businesses
            </h2>

            <p className="mt-5 text-slate-400">
              Thousands of companies rely on VaultPay to manage
              invoices and payments every day.
            </p>

          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">

            {[
              {
                name: "John Carter",
                role: "CEO, NovaTech",
                review:
                  "VaultPay completely transformed our billing process. Invoice creation now takes less than a minute.",
              },
              {
                name: "Emily Watson",
                role: "Finance Manager",
                review:
                  "Automatic payment tracking and Stripe integration saved our team countless hours every week.",
              },
              {
                name: "Michael Brown",
                role: "Founder, Pixel Studio",
                review:
                  "Professional interface, secure payments and detailed analytics. Exactly what our business needed.",
              },
            ].map((item) => (

              <div
                key={item.name}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-8"
              >

                <div className="mb-6 flex gap-1 text-yellow-400">

                  ★★★★★

                </div>

                <p className="leading-8 text-slate-300">
                  "{item.review}"
                </p>

                <div className="mt-8">

                  <h3 className="text-xl font-bold">
                    {item.name}
                  </h3>

                  <p className="text-slate-400">
                    {item.role}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Pricing */}

      <section
        id="pricing"
        className="border-y border-slate-800 py-24"
      >

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <h2 className="text-4xl font-bold">
              Flexible Pricing
            </h2>

            <p className="mt-5 text-slate-400">
              Start free and upgrade whenever your business grows.
            </p>

          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10">

              <h3 className="text-2xl font-bold">
                Starter
              </h3>

              <h2 className="mt-6 text-5xl font-bold">
                Free
              </h2>

              <ul className="mt-10 space-y-4 text-slate-300">

                <li>✓ 50 Invoices</li>
                <li>✓ PDF Export</li>
                <li>✓ Client Management</li>
                <li>✓ Email Support</li>

              </ul>

              <button className="mt-10 w-full rounded-xl bg-slate-800 py-4 font-semibold">
                Get Started
              </button>

            </div>

            <div className="relative rounded-3xl border-2 border-blue-600 bg-slate-900 p-10">

              <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold">
                MOST POPULAR
              </span>

              <h3 className="text-2xl font-bold">
                Professional
              </h3>

              <h2 className="mt-6 text-5xl font-bold">
                $29
                <span className="text-lg text-slate-400">
                  /month
                </span>
              </h2>

              <ul className="mt-10 space-y-4 text-slate-300">

                <li>✓ Unlimited Invoices</li>
                <li>✓ Stripe Payments</li>
                <li>✓ Reports & Analytics</li>
                <li>✓ Priority Support</li>
                <li>✓ PDF Downloads</li>

              </ul>

              <button className="mt-10 w-full rounded-xl bg-blue-600 py-4 font-semibold hover:bg-blue-700">
                Choose Plan
              </button>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10">

              <h3 className="text-2xl font-bold">
                Enterprise
              </h3>

              <h2 className="mt-6 text-5xl font-bold">
                Custom
              </h2>

              <ul className="mt-10 space-y-4 text-slate-300">

                <li>✓ Dedicated Support</li>
                <li>✓ Custom Integrations</li>
                <li>✓ Advanced Security</li>
                <li>✓ Unlimited Everything</li>

              </ul>

              <button className="mt-10 w-full rounded-xl bg-slate-800 py-4 font-semibold">
                Contact Sales
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section
        id="contact"
        className="py-24"
      >

        <div className="mx-auto max-w-5xl rounded-[40px] bg-linear-to-r from-blue-600 to-indigo-700 px-10 py-20 text-center">

          <h2 className="text-5xl font-bold">
            Ready to Modernize Your Billing?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            Join thousands of businesses using VaultPay to
            create invoices, receive secure payments and manage
            their financial workflow with confidence.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link
              href="/register"
              className="rounded-xl bg-white px-8 py-4 font-bold text-blue-700"
            >
              Create Free Account
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-white px-8 py-4 font-bold"
            >
              Login
            </Link>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="border-t border-slate-800">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">

          <div>

            <h2 className="text-2xl font-bold">
              VaultPay
            </h2>

            <p className="mt-2 text-slate-400">
              Secure Financial Core for Modern Businesses.
            </p>

          </div>

          <div className="flex gap-8 text-slate-400">

            <a href="#features">Features</a>

            <a href="#workflow">Workflow</a>

            <a href="#pricing">Pricing</a>

            <Link href="/login">
              Login
            </Link>

          </div>

        </div>

        <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">

          © 2026 VaultPay Financial Core. All Rights Reserved.

        </div>

      </footer>