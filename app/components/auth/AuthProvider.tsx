"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { subscribeToAuthState } from "../../../lib/api/auth";
import type { AuthUser } from "../../../lib/types/auth";

type AuthContextValue = {
  user: AuthUser | null;
  isAuthReady: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    return subscribeToAuthState((currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
    });
  }, []);

  return <AuthContext.Provider value={{ user, isAuthReady }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
