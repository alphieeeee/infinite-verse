"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { routes } from "../../../lib/constants/routes";
import { useAuth } from "./AuthProvider";

export default function GuestOnly({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isAuthReady } = useAuth();

  useEffect(() => {
    if (isAuthReady && user) {
      router.replace(routes.home);
    }
  }, [isAuthReady, router, user]);

  if (!isAuthReady || user) {
    return <p role="status" className="text-sm font-medium text-white/60">CHECKING ACCOUNT...</p>;
  }

  return children;
}
