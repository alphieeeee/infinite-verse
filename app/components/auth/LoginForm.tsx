"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { submitLogin } from "../../../lib/api/auth";
import { routes } from "../../../lib/constants/routes";

function safeRedirectPath(path: string | undefined) {
  return path?.startsWith("/") && !path.startsWith("//") ? path : routes.home;
}

export default function LoginForm({ nextPath }: { nextPath?: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    form.reset();

    try {
      await submitLogin({
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      });
      router.replace(safeRedirectPath(nextPath));
    } catch {
      setError("Invalid username or password.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl backdrop-blur-sm sm:p-8">
      <p className="text-xs font-semibold tracking-[0.2em] theme-accent">WELCOME BACK</p>
      <h1 className="mt-3 text-3xl font-semibold">Log in to your account</h1>
      <p className="mt-2 text-sm text-white/65">Save verses and return to your favorites anytime.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[var(--theme-accent)]"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[var(--theme-accent)]"
          />
        </div>

        {error ? <p role="alert" className="text-sm text-red-300">{error}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-[var(--theme-accent)] px-4 py-3 font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
        >
          {isSubmitting ? "LOGGING IN..." : "LOGIN"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-white/65">
        New to Infinite Verse?{" "}
        <Link href={routes.register} className="font-semibold theme-accent hover:underline">Create an account</Link>
      </p>
    </div>
  );
}
