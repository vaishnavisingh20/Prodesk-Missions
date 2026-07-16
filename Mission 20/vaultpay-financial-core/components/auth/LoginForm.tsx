"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  Loader2,
  LogIn,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

import { redirectByRole } from "@/utils/redirectByRole";
import { useAuthContext } from "@/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();

  const { refreshUser } = useAuthContext();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      await refreshUser();

      toast.success("Login successful.");

      router.replace(
        redirectByRole(res.data.data.user.role)
      );

      router.refresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to login."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Email Address
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="email"
            required
            value={email}
            disabled={loading}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="john@example.com"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Password
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="password"
            required
            value={password}
            disabled={loading}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="••••••••"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            className="rounded border-slate-600"
          />
          Remember me
        </label>

        <button
          type="button"
          className="text-blue-400 hover:text-blue-300"
        >
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2
              size={20}
              className="animate-spin"
            />
            Signing In...
          </>
        ) : (
          <>
            <LogIn size={20} />
            Sign In
            <ArrowRight size={18} />
          </>
        )}
      </button>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700" />
        </div>

        <div className="relative flex justify-center">
          <span className="bg-slate-900 px-4 text-sm text-slate-500">
            OR
          </span>
        </div>
      </div>

      <p className="text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-blue-400 transition hover:text-blue-300"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}