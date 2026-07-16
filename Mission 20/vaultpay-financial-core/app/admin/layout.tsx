import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

interface Props {
  children: ReactNode;
}

export default async function AdminLayout({
  children,
}: Props) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!user.isActive) {
    redirect("/login");
  }

  if (user.role !== "admin") {
    redirect("/403");
  }

  return <>{children}</>;
}