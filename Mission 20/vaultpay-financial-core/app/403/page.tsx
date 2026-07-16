import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";

export default function UnauthorizedPage() {
  return (
    <AppLayout
      title="403 Unauthorized"
      subtitle="You don't have permission to access this page."
    >
      <div className="mx-auto max-w-3xl">

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-12 text-center backdrop-blur">

          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-red-500/10">

            <ShieldAlert
              size={70}
              className="text-red-400"
            />

          </div>

          <h1 className="mt-8 text-5xl font-bold text-white">
            Access Denied
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-400">
            Your account doesn't have permission to view this
            resource. If you believe this is an error, please
            contact your administrator.
          </p>

          <div className="mt-10 flex justify-center">

            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>

          </div>

        </div>

      </div>
    </AppLayout>
  );
}