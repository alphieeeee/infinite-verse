"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { submitRegistration } from "../../../lib/api/auth";
import { routes } from "../../../lib/constants/routes";

export default function RegistrationForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const password = String(formData.get("password") ?? "");
    const confirmation = String(formData.get("confirmPassword") ?? "");
    form.reset();

    if (password !== confirmation) {
      setError("Confirm password does not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await submitRegistration({
        email: String(formData.get("email") ?? ""),
        password,
      });
      router.replace(routes.home);
    } catch {
      setError("Unable to create your account. The email may already be registered.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl backdrop-blur-sm sm:p-8">
      <p className="text-xs font-semibold tracking-[0.2em] theme-accent">JOIN INFINITE VERSE</p>
      <h1 className="mt-3 text-3xl font-semibold">Create your account</h1>
      <p className="mt-2 text-sm text-white/65">Keep the verses that matter to you in one place.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="register-email" className="mb-2 block text-sm font-medium">Email address</label>
          <input id="register-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[var(--theme-accent)]" />
        </div>
        <div>
          <label htmlFor="register-password" className="mb-2 block text-sm font-medium">Password</label>
          <input id="register-password" name="password" type="password" autoComplete="new-password" required minLength={6} aria-describedby="password-hint" className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[var(--theme-accent)]" />
          <p id="password-hint" className="mt-2 text-xs text-white/50">Use at least 6 characters.</p>
        </div>
        <div>
          <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium">Confirm password</label>
          <input id="confirm-password" name="confirmPassword" type="password" autoComplete="new-password" required minLength={6} className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[var(--theme-accent)]" />
        </div>

        {error ? <p role="alert" className="text-sm text-red-300">{error}</p> : null}

        <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-[var(--theme-accent)] px-4 py-3 font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60">
          {isSubmitting ? "CREATING ACCOUNT..." : "REGISTER"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-white/65">
        Already have an account?{" "}
        <Link href={routes.login} className="font-semibold theme-accent hover:underline">Log in</Link>
      </p>
    </div>
  );
}
