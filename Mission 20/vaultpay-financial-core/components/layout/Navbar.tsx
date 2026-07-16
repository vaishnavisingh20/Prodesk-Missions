"use client";

import Link from "next/link";
import {
  LogOut,
  LayoutDashboard,
  FileText,
} from "lucide-react";

import { useAuthContext } from "@/context/AuthContext";

export default function Navbar() {

  const {
    user,
    logout,
  } = useAuthContext();


  return (

    <nav className="border-b bg-white px-6 py-4 shadow-sm">

      <div className="mx-auto flex max-w-7xl items-center justify-between">


        <Link
          href="/"
          className="text-xl font-bold text-blue-600"
        >
          VaultPay
        </Link>



        <div className="flex items-center gap-6">


          {user && (

            <>


              <div className="hidden text-right sm:block">

                <p className="font-medium">
                  {user.name}
                </p>

                <p className="text-sm capitalize text-gray-500">
                  {user.role}
                </p>

              </div>



              {user.role === "admin" ? (

                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                >

                  <LayoutDashboard size={18}/>

                  Dashboard

                </Link>

              ) : (

                <Link
                  href="/client/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                >

                  <FileText size={18}/>

                  Invoices

                </Link>

              )}



              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >

                <LogOut size={18}/>

                Logout

              </button>


            </>

          )}


        </div>

      </div>

    </nav>

  );
}