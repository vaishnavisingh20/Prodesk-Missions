"use client";

import { ReactNode } from "react";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AppLayout({
  children,
  title,
  subtitle,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 text-white">

      {/* Background Blur Effects */}

      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute right-0 top-32 h-112 w-md rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="absolute bottom-0 left-1/2 h-120 w-120 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      </div>

      <AppNavbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">

        {(title || subtitle) && (

          <div className="mb-10">

            {title && (

              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                {title}
              </h1>

            )}

            {subtitle && (

              <p className="mt-3 max-w-3xl text-lg text-slate-400">
                {subtitle}
              </p>

            )}

          </div>

        )}

        {children}

      </main>

      <Footer />

    </div>
  );
}