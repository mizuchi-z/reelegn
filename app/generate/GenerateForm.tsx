"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Profile, BriefFormData } from "@/lib/types";

const SECTEURS = [
  { value: "Restauration & Food", label: "🍽️ Restauration & Food" },
  { value: "Immobilier", label: "🏠 Immobilier" },
  { value: "Mode & Streetwear", label: "👟 Mode & Streetwear" },
  { value: "Sport & Fitness", label: "💪 Sport & Fitness" },
  { value: "Bijoux & Luxe", label: "💎 Bijoux & Luxe" },
  { value: "Cosmétiques & Beauté", label: "🧴 Cosmétiques & Beauté" },
  { value: "Automobile", label: "🚗 Automobile" },
  { value: "Commerce local", label: "🏪 Commerce local" },
  { value: "Autre", label: "🎯 Autre" },
];

const AMBIANCES = [
  {
    id: "viral",
    icon: "⚡",
    label: "VIRAL & ÉNERGIQUE",
    desc: "Cuts rapides, énergie, music hype",
  },
  {
    id: "luxe",
    icon: "🎬",
    label: "LUXE & CINÉMATIQUE",
    desc: "Slow motion, lumière dorée, premium",
  },
  {
    id: "lifestyle",
    icon: "🌿",
    label: "LIFESTYLE & AUTHENTIQUE",
    desc: "Naturel, humain, storytelling",
  },
  {
    id: "dramatique",
    icon: "🔥",
    label: "DRAMATIQUE & ÉPIQUE",
    desc: "Atmosphère, intensité, impact",
  },
];

const OUTILS = [
  {
    id: "Higgsfield",
    label: "HIGGSFIELD",
    desc: "Photos → Vidéo, idéal food & produits",
  },
  {
    id: "Kling",
    label: "KLING",
    desc: "Vidéo IA générative, idéal cinématique",
  },
];

const DUREES = [
  { id: "15s", label: "15 secondes", sub: "3–4 clips" },
  { id: "30s", label: "30 secondes", sub: "5–6 clips" },
  { id: "60s", label: "60 secondes", sub: "8–10 clips" },
];

const LOADING_MESSAGES = [
  "Analyse du brief en cours...",
  "Création du script clip par clip...",
  "Génération des prompts Higgsfield/Kling...",
  "Rédaction de la légende Instagram...",
  "Compilation du pack final...",
];

interface Props {
  profile: Profile | null;
  userId: string;
  cancelled?: boolean;
}

export default function GenerateForm({ profile, userId, cancelled = false }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<BriefFormData>({
    nom_business: "",
    secteur: "",
    message_cle: "",
    ambiance: "",
    outil_ia: "",
    duree_reel: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [error, setError] = useState("");

  const isFree = !profile || profile.plan === "free";
  const needsPayment = isFree && (profile?.generations_count ?? 0) >= 1;
  const isAbonne =
    profile?.plan === "abonne" && profile?.abonnement_actif === true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate
    if (
      !form.nom_business ||
      !form.secteur ||
      !form.message_cle ||
      !form.ambiance ||
      !form.outil_ia ||
      !form.duree_reel
    ) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    // If payment needed → redirect to Stripe
    if (needsPayment && !isAbonne) {
      try {
        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "pack",
            brief_data: form,
            user_id: userId,
          }),
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          setError("Erreur lors de la création du paiement.");
        }
      } catch {
        setError("Erreur réseau. Réessaie.");
      }
      return;
    }

    // Free generation or subscriber
    setLoading(true);
    let msgIdx = 0;
    const interval = setInterval(() => {
      msgIdx = (msgIdx + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(msgIdx);
    }, 2000);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, user_id: userId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de la génération.");
      }

      router.push(`/result/${data.id}`);
    } catch (err: unknown) {
      const e = err as { message?: string };
      setError(e.message || "Erreur lors de la génération. Réessaie.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-[rgba(8,15,26,0.95)] flex flex-col items-center justify-center gap-8">
          <div className="text-5xl">🐉</div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-[rgba(0,180,216,0.3)] border-t-[#00B4D8] rounded-full animate-spin" />
            <p className="font-orbitron text-sm text-[#00B4D8] tracking-[2px] transition-all duration-500">
              {LOADING_MESSAGES[loadingMsg]}
            </p>
          </div>
          <div className="max-w-sm w-full bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px] p-6">
            {LOADING_MESSAGES.map((msg, i) => (
              <div
                key={msg}
                className={`flex items-center gap-3 py-2 transition-all duration-300 ${
                  i <= loadingMsg ? "opacity-100" : "opacity-20"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    i < loadingMsg
                      ? "bg-[#34D399]"
                      : i === loadingMsg
                      ? "bg-[#00B4D8] animate-pulse"
                      : "bg-[#5A7089]"
                  }`}
                />
                <span className="font-mono text-xs text-[#E8EFF6]">{msg}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#080F1A] pt-20 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-orbitron font-black text-2xl text-[#E8EFF6]">
                NOUVEAU PACK REEL
              </h1>
              {needsPayment && !isAbonne && (
                <span className="font-mono text-xs text-[#FB923C] border border-[rgba(251,146,60,0.3)] bg-[rgba(251,146,60,0.1)] px-3 py-1.5 rounded-[4px]">
                  PACK PAYANT — €12
                </span>
              )}
              {isAbonne && (
                <span className="font-mono text-xs text-[#34D399] border border-[rgba(52,211,153,0.3)] bg-[rgba(52,211,153,0.1)] px-3 py-1.5 rounded-[4px]">
                  ABONNÉ ∞
                </span>
              )}
            </div>
            <p className="font-sans text-sm text-[#5A7089]">
              Décris ton business en 2 minutes. On s&apos;occupe du reste.
            </p>
          </div>

          {cancelled && (
            <div className="mb-6 bg-[rgba(251,146,60,0.1)] border border-[rgba(251,146,60,0.3)] rounded-[8px] px-5 py-4">
              <p className="font-mono text-xs text-[#FB923C]">
                Paiement annulé. Ton brief est conservé — tu peux relancer quand tu veux.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* 1. Nom du business */}
            <div className="flex flex-col gap-3">
              <label className="font-mono text-xs text-[#00B4D8] uppercase tracking-widest">
                01. NOM DU BUSINESS *
              </label>
              <input
                type="text"
                value={form.nom_business}
                onChange={(e) =>
                  setForm({ ...form, nom_business: e.target.value })
                }
                placeholder="Ex: Chez Marco, Nike Nice, Agence Riviera..."
                required
                className="bg-[#111F30] text-[#E8EFF6] border border-[rgba(0,180,216,0.12)] rounded-[6px] px-4 py-3 font-sans text-sm outline-none focus:border-[#00B4D8] focus:shadow-[0_0_10px_rgba(0,180,216,0.15)] placeholder:text-[#5A7089] transition-all"
              />
            </div>

            {/* 2. Secteur */}
            <div className="flex flex-col gap-3">
              <label className="font-mono text-xs text-[#00B4D8] uppercase tracking-widest">
                02. TON SECTEUR *
              </label>
              <select
                value={form.secteur}
                onChange={(e) => setForm({ ...form, secteur: e.target.value })}
                required
                className="bg-[#111F30] text-[#E8EFF6] border border-[rgba(0,180,216,0.12)] rounded-[6px] px-4 py-3 font-sans text-sm outline-none focus:border-[#00B4D8] focus:shadow-[0_0_10px_rgba(0,180,216,0.15)] transition-all cursor-pointer"
              >
                <option value="" disabled className="text-[#5A7089]">
                  Sélectionne ton secteur...
                </option>
                {SECTEURS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Message clé */}
            <div className="flex flex-col gap-3">
              <label className="font-mono text-xs text-[#00B4D8] uppercase tracking-widest">
                03. TON MESSAGE CLÉ *
              </label>
              <p className="font-sans text-xs text-[#5A7089]">
                Qu&apos;est-ce que tu veux que les gens ressentent ou fassent ?
              </p>
              <div className="relative">
                <textarea
                  value={form.message_cle}
                  onChange={(e) => {
                    if (e.target.value.length <= 200)
                      setForm({ ...form, message_cle: e.target.value });
                  }}
                  placeholder="Ex: Je veux montrer que nos burgers sont faits maison et qu'il faut venir ce week-end"
                  rows={3}
                  required
                  className="bg-[#111F30] text-[#E8EFF6] border border-[rgba(0,180,216,0.12)] rounded-[6px] px-4 py-3 font-sans text-sm outline-none focus:border-[#00B4D8] focus:shadow-[0_0_10px_rgba(0,180,216,0.15)] placeholder:text-[#5A7089] transition-all w-full resize-none"
                />
                <span
                  className={`absolute bottom-2 right-3 font-mono text-xs ${
                    form.message_cle.length > 180
                      ? "text-[#FB923C]"
                      : "text-[#5A7089]"
                  }`}
                >
                  {form.message_cle.length}/200
                </span>
              </div>
            </div>

            {/* 4. Ambiance */}
            <div className="flex flex-col gap-3">
              <label className="font-mono text-xs text-[#00B4D8] uppercase tracking-widest">
                04. L&apos;AMBIANCE DU REEL *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AMBIANCES.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setForm({ ...form, ambiance: a.label })}
                    className={`text-left p-4 rounded-[8px] border transition-all duration-150 ${
                      form.ambiance === a.label
                        ? "border-[#00B4D8] bg-[rgba(0,180,216,0.08)] shadow-[0_0_15px_rgba(0,180,216,0.15)]"
                        : "border-[rgba(0,180,216,0.12)] bg-[#0D1826] hover:border-[rgba(0,180,216,0.3)]"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{a.icon}</span>
                      <span className="font-orbitron font-bold text-xs text-[#E8EFF6]">
                        {a.label}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-[#5A7089]">{a.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Outil IA */}
            <div className="flex flex-col gap-3">
              <label className="font-mono text-xs text-[#00B4D8] uppercase tracking-widest">
                05. L&apos;OUTIL IA QUE TU VAS UTILISER *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OUTILS.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setForm({ ...form, outil_ia: o.id })}
                    className={`text-left p-4 rounded-[8px] border transition-all duration-150 ${
                      form.outil_ia === o.id
                        ? "border-[#00B4D8] bg-[rgba(0,180,216,0.08)] shadow-[0_0_15px_rgba(0,180,216,0.15)]"
                        : "border-[rgba(0,180,216,0.12)] bg-[#0D1826] hover:border-[rgba(0,180,216,0.3)]"
                    }`}
                  >
                    <span className="font-orbitron font-bold text-sm text-[#E8EFF6] block mb-1">
                      {o.label}
                    </span>
                    <span className="font-sans text-xs text-[#5A7089]">
                      {o.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Durée */}
            <div className="flex flex-col gap-3">
              <label className="font-mono text-xs text-[#00B4D8] uppercase tracking-widest">
                06. DURÉE DU REEL *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {DUREES.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setForm({ ...form, duree_reel: d.id })}
                    className={`text-center p-4 rounded-[8px] border transition-all duration-150 ${
                      form.duree_reel === d.id
                        ? "border-[#00B4D8] bg-[rgba(0,180,216,0.08)] shadow-[0_0_15px_rgba(0,180,216,0.15)]"
                        : "border-[rgba(0,180,216,0.12)] bg-[#0D1826] hover:border-[rgba(0,180,216,0.3)]"
                    }`}
                  >
                    <span className="font-orbitron font-bold text-sm text-[#E8EFF6] block">
                      {d.label}
                    </span>
                    <span className="font-sans text-xs text-[#5A7089]">
                      {d.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-[rgba(251,146,60,0.1)] border border-[rgba(251,146,60,0.3)] rounded-[6px] px-4 py-3">
                <p className="font-mono text-xs text-[#FB923C]">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {needsPayment && !isAbonne
                ? "[ GÉNÉRER CE PACK — €12 ]"
                : isFree
                ? "[ ⚡ GÉNÉRER MON PACK GRATUIT ]"
                : "[ ⚡ GÉNÉRER MON PACK ]"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
