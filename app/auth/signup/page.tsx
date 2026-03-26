"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (form.password.length < 8) {
      setError("Le mot de passe doit faire au moins 8 caractères.");
      return;
    }

    setLoading(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { nom: form.nom },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        // Create profile
        await supabase.from("profiles").upsert({
          id: data.user.id,
          email: form.email,
          nom: form.nom,
          plan: "free",
          generations_count: 0,
          abonnement_actif: false,
        });

        // Send welcome email
        await fetch("/api/send-welcome", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, nom: form.nom }),
        });
      }

      setSuccess(true);
    } catch (err: unknown) {
      const e = err as { message?: string };
      if (e.message?.includes("already registered")) {
        setError("Cet email est déjà utilisé. Connecte-toi plutôt.");
      } else {
        setError(e.message || "Une erreur est survenue. Réessaie.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#080F1A] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-5xl mb-6">🐉</div>
          <h2 className="font-orbitron font-black text-2xl text-[#00B4D8] mb-4">
            VÉRIFIE TON EMAIL
          </h2>
          <p className="font-sans text-sm text-[#5A7089] mb-8 leading-relaxed">
            Un lien de confirmation a été envoyé à{" "}
            <span className="text-[#E8EFF6]">{form.email}</span>. Clique sur le
            lien pour activer ton compte et accéder à ta génération gratuite.
          </p>
          <Link
            href="/auth/login"
            className="font-mono text-xs text-[#00B4D8] hover:underline"
          >
            → Retour à la connexion
          </Link>
        </div>
      </div>
    );
  }

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
            CRÉER MON COMPTE
          </h1>
          <p className="font-sans text-sm text-[#5A7089] mb-8">
            1 génération gratuite incluse · Aucune carte requise
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs text-[#5A7089] uppercase tracking-widest">
                Prénom *
              </label>
              <input
                type="text"
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                placeholder="Ton prénom"
                required
                className="bg-[#111F30] text-[#E8EFF6] border border-[rgba(0,180,216,0.12)] rounded-[6px] px-4 py-3 font-sans text-sm outline-none focus:border-[#00B4D8] focus:shadow-[0_0_10px_rgba(0,180,216,0.15)] placeholder:text-[#5A7089] transition-all"
              />
            </div>

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
                placeholder="8 caractères minimum"
                required
                className="bg-[#111F30] text-[#E8EFF6] border border-[rgba(0,180,216,0.12)] rounded-[6px] px-4 py-3 font-sans text-sm outline-none focus:border-[#00B4D8] focus:shadow-[0_0_10px_rgba(0,180,216,0.15)] placeholder:text-[#5A7089] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs text-[#5A7089] uppercase tracking-widest">
                Confirmer le mot de passe *
              </label>
              <input
                type="password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                placeholder="Confirme ton mot de passe"
                required
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
                  Création en cours...
                </span>
              ) : (
                "[ CRÉER MON COMPTE GRATUIT ]"
              )}
            </button>
          </form>

          <p className="font-sans text-sm text-[#5A7089] text-center mt-6">
            Déjà un compte ?{" "}
            <Link
              href="/auth/login"
              className="text-[#00B4D8] hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
