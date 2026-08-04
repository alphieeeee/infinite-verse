"use client";

import Link from "next/link";
import { routes } from "../../../lib/constants/routes";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href={routes.home} className="text-sm font-semibold tracking-[0.3em] theme-accent">
          INFINITE VERSE
        </Link>
        <Link href={routes.login} className="rounded-full border theme-accent-border px-4 py-2 text-sm text-white">
          Login
        </Link>
      </nav>
    </header>
  );
}
