"use client";

import Link from "next/link";
import { routes } from "../../../lib/constants/routes";
import { logout } from "../../../lib/api/auth";
import { useAuth } from "../auth/AuthProvider";

export default function Navbar() {
  const { user, isAuthReady } = useAuth();

  async function handleLogout() {
    await logout();
  }

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4 sm:gap-7">
          <Link href={routes.home} className="shrink-0 text-xs font-semibold tracking-[0.2em] theme-accent sm:text-sm sm:tracking-[0.3em]">
            INFINITE VERSE
          </Link>

          <div className="flex items-center gap-3 text-xs font-semibold uppercase text-white sm:gap-5 sm:text-sm">
            <Link
              href={routes.home}
              className="transition-colors hover:text-[var(--theme-accent)] focus-visible:text-[var(--theme-accent)]"
            >
              SCRIPTURE
            </Link>
            <Link
              href={user ? routes.favorites : `${routes.login}?next=${routes.favorites}`}
              className="transition-colors hover:text-[var(--theme-accent)] focus-visible:text-[var(--theme-accent)]"
            >
              FAVORITES
            </Link>
          </div>
        </div>

        {isAuthReady && user ? (
          <button
            type="button"
            onClick={handleLogout}
            className="ml-3 shrink-0 rounded-full border theme-accent-border px-3 py-2 text-xs font-semibold text-white transition-colors hover:theme-accent-bg-soft sm:px-4 sm:text-sm"
          >
            LOGOUT
          </button>
        ) : (
          <Link
            href={routes.login}
            className={`ml-3 shrink-0 rounded-full border theme-accent-border px-3 py-2 text-xs font-semibold text-white sm:px-4 sm:text-sm ${
              isAuthReady ? "" : "pointer-events-none opacity-60"
            }`}
            aria-disabled={!isAuthReady}
          >
            LOGIN
          </Link>
        )}
      </nav>
    </header>
  );
}
