"use client";

import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/60 backdrop-blur-xl">

      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-12 lg:grid-cols-4">

          {/* Brand */}

          <div>

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold">
                V
              </div>

              <div>

                <h2 className="text-xl font-bold">
                  VaultPay
                </h2>

                <p className="text-xs text-slate-400">
                  Financial Core
                </p>

              </div>

            </div>

            <p className="leading-7 text-slate-400">
              Modern invoice management and secure payment
              platform designed for businesses of every size.
            </p>

            <div className="mt-6 flex gap-4">

              <a
                href="#"
                className="rounded-xl bg-slate-800 p-3 transition hover:bg-blue-600"
              >
                <Github size={18} />
              </a>

              <a
                href="#"
                className="rounded-xl bg-slate-800 p-3 transition hover:bg-blue-600"
              >
                <Linkedin size={18} />
              </a>

              <a
                href="#"
                className="rounded-xl bg-slate-800 p-3 transition hover:bg-blue-600"
              >
                <Twitter size={18} />
              </a>

              <a
                href="#"
                className="rounded-xl bg-slate-800 p-3 transition hover:bg-blue-600"
              >
                <Mail size={18} />
              </a>

            </div>

          </div>

          {/* Product */}

          <div>

            <h3 className="mb-6 text-lg font-semibold">
              Product
            </h3>

            <ul className="space-y-4 text-slate-400">

              <li>
                <Link
                  href="/"
                  className="hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="hover:text-white"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="hover:text-white"
                >
                  Register
                </Link>
              </li>

            </ul>

          </div>

          {/* Features */}

          <div>

            <h3 className="mb-6 text-lg font-semibold">
              Features
            </h3>

            <ul className="space-y-4 text-slate-400">

              <li>Invoice Management</li>

              <li>Stripe Payments</li>

              <li>PDF Generation</li>

              <li>Email Notifications</li>

              <li>Analytics Dashboard</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-6 text-lg font-semibold">
              Contact
            </h3>

            <ul className="space-y-4 text-slate-400">

              <li>
                support@vaultpay.com
              </li>

              <li>
                +1 (555) 123-4567
              </li>

              <li>
                New York, USA
              </li>

              <li>
                24×7 Customer Support
              </li>

            </ul>

          </div>

        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm text-slate-500 md:flex-row">

          <p>
            © 2026 VaultPay Financial Core. All rights reserved.
          </p>

          <div className="flex gap-6">

            <Link
              href="/"
              className="hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/"
              className="hover:text-white"
            >
              Terms of Service
            </Link>

            <Link
              href="/"
              className="hover:text-white"
            >
              Support
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}