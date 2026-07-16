"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { useRouter } from "next/navigation";

import axios from "axios";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "client";
  companyName: string;
  phone?: string;
  address?: string;
  avatar?: string;
  emailVerified: boolean;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;

  refreshUser: () => Promise<void>;

  logout: () => Promise<void>;

  setUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
    const router = useRouter();
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    try {
      const res = await axios.get("/api/auth/me");

      if (res.data.success) {
        setUser(res.data.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await axios.post("/api/auth/logout");

      setUser(null);

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        refreshUser,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used inside AuthProvider"
    );
  }

  return context;
}