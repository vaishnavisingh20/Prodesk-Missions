"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  User,
  LogOut,
  CreditCard,
} from "lucide-react";

import { useAuthContext } from "@/context/AuthContext";

export default function AppNavbar() {
  const pathname = usePathname();

  const { user, logout } = useAuthContext();

  const isActive = (path: string) =>
    pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >
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

        </Link>

        {/* Navigation */}

        {user && (

          <nav className="hidden items-center gap-2 lg:flex">

            <Link href={user.role === "admin" ? "/admin/dashboard" : "/client/dashboard"}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 transition ${
                isActive(`/${user.role}/dashboard`)
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

        

            {user.role === "admin" && (

              <Link
                href="/admin/invoices/new"
                className={`flex items-center gap-2 rounded-xl px-4 py-2 transition ${
                  pathname ===
                  "/admin/invoices/create"
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`}
              >
                <PlusCircle size={18} />
                Create
              </Link>

            )}

            

          </nav>

        )}

        {/* Right Side */}

        <div className="flex items-center gap-4">

          {!user ? (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-slate-700 px-5 py-2 hover:bg-slate-800"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-blue-600 px-5 py-2 font-semibold hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="hidden text-right md:block">

                <p className="font-semibold">
                  {user.name}
                </p>

                <p className="text-sm capitalize text-slate-400">
                  {user.role}
                </p>

              </div>

              <button
                onClick={logout}
                className="rounded-xl border border-slate-700 p-3 hover:bg-red-500/20 hover:text-red-400"
              >
                <LogOut size={18} />
              </button>
            </>
          )}

        </div>

      </div>

    </header>
  );
}