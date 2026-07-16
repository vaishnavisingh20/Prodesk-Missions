"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Loader2,
  UserPlus,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) return;

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/auth/register", {
        name: formData.name,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success("Registration successful.");

      router.replace("/login");
      router.refresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Full Name
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              name="name"
              required
              disabled={loading}
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Company
          </label>

          <div className="relative">
            <Building2
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              name="companyName"
              required
              disabled={loading}
              value={formData.companyName}
              onChange={handleChange}
              placeholder="ABC Corporation"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500"
            />
          </div>
        </div>

      </div>

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
            name="email"
            required
            disabled={loading}
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Phone
          </label>

          <div className="relative">
            <Phone
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              name="phone"
              value={formData.phone}
              disabled={loading}
              onChange={handleChange}
              placeholder="+1 123 456 7890"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Address
          </label>

          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-4 top-4 text-slate-500"
            />

            <textarea
              rows={1}
              name="address"
              value={formData.address}
              disabled={loading}
              onChange={handleChange}
              placeholder="Company Address"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500"
            />
          </div>
        </div>

      </div>

      <div className="grid gap-5 md:grid-cols-2">

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
              name="password"
              required
              disabled={loading}
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Confirm Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="password"
              name="confirmPassword"
              required
              disabled={loading}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500"
            />
          </div>
        </div>

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
            Creating Account...
          </>
        ) : (
          <>
            <UserPlus size={20} />
            Create Account
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
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-blue-400 hover:text-blue-300"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}