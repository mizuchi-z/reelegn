"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/generate";
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (loginError) throw loginError;

      router.push(redirect);
      router.refresh();
    } catch (err: unknown) {
      const e = err as { message?: string };
      if (
        e.message?.includes("Invalid login credentials") ||
        e.message?.includes("invalid_credentials")
      ) {
        setError("Email ou mot de passe incorrect.");
      } else if (e.message?.includes("Email not confirmed")) {
        setError(
          "Confirme ton email d&apos;abord. Vérifie ta boite mail."
        );
      } else {
        setError(e.message || "Une erreur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080F1A] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/">
            <span className="font-orbitron font-black text-2xl text-[#00B4D8] tracking-[3px]">
              MIZUCHI
            </span>
          </Link>
          <p className="font-mono text-xs text-[#5A7089] mt-1 tracking-widest">
            REELGEN
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px] p-8">
          <h1 className="font-orbitron font-black text-xl text-[#E8EFF6] mb-2">
            CONNEXION
          </h1>
          <p className="font-sans text-sm text-[#5A7089] mb-8">
            Accède à tes packs et génère de nouveaux Reels.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs text-[#5A7089] uppercase tracking-widest">
                Email *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="ton@email.com"
                required
                autoComplete="email"
                className="bg-[#111F30] text-[#E8EFF6] border border-[rgba(0,180,216,0.12)] rounded-[6px] px-4 py-3 font-sans text-sm outline-none focus:border-[#00B4D8] focus:shadow-[0_0_10px_rgba(0,180,216,0.15)] placeholder:text-[#5A7089] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs text-[#5A7089] uppercase tracking-widest">
                Mot de passe *
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Ton mot de passe"
                required
                autoComplete="current-password"
                className="bg-[#111F30] text-[#E8EFF6] border border-[rgba(0,180,216,0.12)] rounded-[6px] px-4 py-3 font-sans text-sm outline-none focus:border-[#00B4D8] focus:shadow-[0_0_10px_rgba(0,180,216,0.15)] placeholder:text-[#5A7089] transition-all"
              />
            </div>

            {error && (
              <div className="bg-[rgba(251,146,60,0.1)] border border-[rgba(251,146,60,0.3)] rounded-[6px] px-4 py-3">
                <p className="font-mono text-xs text-[#FB923C]">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-sm rounded-md mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#080F1A] border-t-transparent rounded-full animate-spin" />
                  Connexion...
                </span>
              ) : (
                "[ SE CONNECTER ]"
              )}
            </button>
          </form>

          <p className="font-sans text-sm text-[#5A7089] text-center mt-6">
            Pas encore de compte ?{" "}
            <Link href="/auth/signup" className="text-[#00B4D8] hover:underline">
              Créer un compte gratuit
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080F1A]" />}>
      <LoginForm />
    </Suspense>
  );
}
