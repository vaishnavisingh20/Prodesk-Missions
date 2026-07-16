"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuthContext } from "@/context/AuthContext";

interface UseAuthOptions {
  redirectTo?: string;
  requiredRole?: "admin" | "client";
}

export function useAuth(options: UseAuthOptions = {}) {
  const {
    user,
    loading,
    isAuthenticated,
    refreshUser,
    logout,
    setUser,
  } = useAuthContext();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      if (options.redirectTo) {
        router.replace(options.redirectTo);
      }
      return;
    }

    if (
      options.requiredRole &&
      user?.role !== options.requiredRole
    ) {
      router.replace("/403");
    }
  }, [
    loading,
    isAuthenticated,
    user,
    router,
    pathname,
    options.redirectTo,
    options.requiredRole,
  ]);

  return {
    user,
    loading,
    isAuthenticated,
    refreshUser,
    logout,
    setUser,

    isAdmin: user?.role === "admin",

    isClient: user?.role === "client",
  };
}