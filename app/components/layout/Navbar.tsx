"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { routes } from "../../../lib/constants/routes";
import { logout } from "../../../lib/api/auth";
import { useAuth } from "../auth/AuthProvider";

export default function Navbar() {
  const { user, isAuthReady } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const favoritesHref = user ? routes.favorites : `${routes.login}?next=${routes.favorites}`;

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  async function handleLogout() {
    setIsMenuOpen(false);
    await logout();
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-md">
      <nav aria-label="Primary navigation" className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-7">
          <Link href={routes.home} className="relative z-50 shrink-0 text-xs font-semibold tracking-[0.2em] theme-accent sm:text-sm sm:tracking-[0.3em]">
            INFINITE VERSE
          </Link>

          <div className="hidden items-center gap-5 text-sm font-semibold uppercase text-white sm:flex">
            <Link
              href={routes.home}
              className="transition-colors hover:text-[var(--theme-accent)] focus-visible:text-[var(--theme-accent)]"
            >
              SCRIPTURE
            </Link>
            <Link
              href={favoritesHref}
              className="transition-colors hover:text-[var(--theme-accent)] focus-visible:text-[var(--theme-accent)]"
            >
              FAVORITES
            </Link>
          </div>
        </div>

        <div className="hidden sm:block">
          {isAuthReady && user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer rounded-full border theme-accent-border px-4 py-2 text-sm font-semibold text-white transition-colors hover:theme-accent-bg-soft"
            >
              LOGOUT
            </button>
          ) : (
            <Link
              href={routes.login}
              className={`cursor-pointer rounded-full border theme-accent-border px-4 py-2 text-sm font-semibold text-white ${
                isAuthReady ? "" : "pointer-events-none opacity-60"
              }`}
              aria-disabled={!isAuthReady}
            >
              LOGIN
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="relative z-50 cursor-pointer rounded-lg border theme-accent-border p-2 text-white transition hover:theme-accent-bg-soft sm:hidden"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {isMenuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

      </nav>
    </header>
    {isMenuOpen
      ? createPortal(
          <div id="mobile-menu" className="fixed inset-0 z-40 bg-[#050816] px-4 pb-8 pt-24 sm:hidden">
            <div className="mx-auto flex max-w-sm flex-col gap-2 text-base font-semibold text-white">
              <Link href={routes.home} onClick={closeMenu} className="rounded-xl px-4 py-3 hover:theme-accent-bg-soft">
                SCRIPTURE
              </Link>
              <Link href={favoritesHref} onClick={closeMenu} className="rounded-xl px-4 py-3 hover:theme-accent-bg-soft">
                FAVORITES
              </Link>
              {isAuthReady && user ? (
                <button type="button" onClick={handleLogout} className="cursor-pointer rounded-xl px-4 py-3 text-left hover:theme-accent-bg-soft">
                  LOGOUT
                </button>
              ) : (
                <Link
                  href={routes.login}
                  onClick={closeMenu}
                  aria-disabled={!isAuthReady}
                  className={`rounded-xl px-4 py-3 ${isAuthReady ? "hover:theme-accent-bg-soft" : "pointer-events-none opacity-60"}`}
                >
                  LOGIN
                </Link>
              )}
            </div>
          </div>,
          document.body,
        )
      : null}
    </>
  );
}
