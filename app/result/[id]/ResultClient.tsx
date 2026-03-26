"use client";

import { useState } from "react";
import Link from "next/link";
import { Generation } from "@/lib/types";
import { generatePDF } from "@/lib/pdf";

interface Props {
  generation: Generation;
}

type Tab = "script" | "prompts" | "legende" | "hashtags";

export default function ResultClient({ generation }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("script");
  const [copied, setCopied] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const { resultat } = generation;

  const copyToClipboard = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownloadPDF = async () => {
    setPdfLoading(true);
    try {
      const blob = await generatePDF(generation);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `reelgen-${generation.nom_business.replace(/\s+/g, "-").toLowerCase()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF error:", err);
      alert("Erreur lors de la génération du PDF. Essaie de voir le pack en ligne.");
    } finally {
      setPdfLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setEmailLoading(true);
    try {
      await fetch("/api/send-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ generation_id: generation.id }),
      });
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3000);
    } catch {
      // silent
    } finally {
      setEmailLoading(false);
    }
  };

  const date = new Date(generation.created_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const tabs: { id: Tab; label: string }[] = [
    { id: "script", label: "SCRIPT" },
    { id: "prompts", label: "PROMPTS IA" },
    { id: "legende", label: "LÉGENDE" },
    { id: "hashtags", label: "HASHTAGS" },
  ];

  return (
    <div className="min-h-screen bg-[#080F1A]">
      {/* Header */}
      <div className="bg-[#0D1826] border-b border-[rgba(0,180,216,0.12)] px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h1 className="font-orbitron font-black text-2xl text-[#E8EFF6] mb-2">
                TON PACK EST PRÊT 🐉
              </h1>
              <p className="font-sans text-sm text-[#5A7089]">
                {generation.nom_business} · {generation.secteur} ·{" "}
                {generation.ambiance}
              </p>
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <span className="font-mono text-xs text-[#5A7089]">
                  Pack généré le {date}
                </span>
                <span className="font-mono text-xs text-[#00B4D8] border border-[rgba(0,180,216,0.3)] bg-[rgba(0,180,216,0.08)] px-2 py-0.5 rounded-[4px]">
                  {generation.outil_ia}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleDownloadPDF}
                disabled={pdfLoading}
                className="btn-primary px-5 py-2.5 text-xs rounded disabled:opacity-50"
              >
                {pdfLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-[#080F1A] border-t-transparent rounded-full animate-spin" />
                    Génération...
                  </span>
                ) : (
                  "📄 TÉLÉCHARGER LE PDF"
                )}
              </button>
              <button
                onClick={handleResendEmail}
                disabled={emailLoading || emailSent}
                className="btn-secondary px-5 py-2.5 text-xs rounded disabled:opacity-50"
              >
                {emailSent ? "✓ EMAIL ENVOYÉ" : emailLoading ? "Envoi..." : "✉️ RENVOYER PAR EMAIL"}
              </button>
              <Link
                href="/generate"
                className="btn-secondary px-5 py-2.5 text-xs rounded text-center"
              >
                + NOUVEAU PACK
              </Link>
            </div>
          </div>

          {/* Concept */}
          {resultat.concept && (
            <div className="mt-6 bg-[#080F1A] border border-[rgba(0,180,216,0.12)] rounded-[8px] px-5 py-4">
              <p className="font-mono text-xs text-[#5A7089] uppercase tracking-widest mb-1">
                Concept
              </p>
              <p className="font-sans text-sm text-[#E8EFF6]">
                {resultat.concept}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-40 bg-[rgba(8,15,26,0.95)] backdrop-blur-md border-b border-[rgba(0,180,216,0.12)]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-mono text-xs tracking-widest uppercase whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "text-[#00B4D8] border-[#00B4D8]"
                    : "text-[#5A7089] border-transparent hover:text-[#E8EFF6]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* SCRIPT TAB */}
        {activeTab === "script" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-orbitron font-bold text-sm text-[#E8EFF6] tracking-[2px]">
                SCRIPT CLIP PAR CLIP
              </h2>
              <span className="font-mono text-xs text-[#5A7089]">
                {resultat.script?.length || 0} clips · {generation.duree_reel}
              </span>
            </div>

            {resultat.script?.map((clip) => (
              <div
                key={clip.clip}
                className="bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px] p-6 border-l-[3px] border-l-[#00B4D8]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-orbitron font-black text-xl text-[#00B4D8]">
                    CLIP {clip.clip}
                  </span>
                  <span className="font-mono text-xs text-[#5A7089] border border-[rgba(0,180,216,0.12)] px-2 py-1 rounded-[4px]">
                    {clip.duree}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="font-mono text-xs text-[#5A7089] uppercase tracking-widest mb-2">
                      Action
                    </p>
                    <p className="font-sans text-sm text-[#E8EFF6] leading-relaxed">
                      {clip.action}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-[#5A7089] uppercase tracking-widest mb-2">
                      Émotion
                    </p>
                    <p className="font-sans text-sm text-[#E8EFF6] leading-relaxed">
                      {clip.emotion}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-[#5A7089] uppercase tracking-widest mb-2">
                      Transition
                    </p>
                    <p className="font-sans text-sm text-[#E8EFF6] leading-relaxed">
                      {clip.transition}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROMPTS TAB */}
        {activeTab === "prompts" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-orbitron font-bold text-sm text-[#E8EFF6] tracking-[2px]">
                PROMPTS {generation.outil_ia.toUpperCase()}
              </h2>
              <button
                onClick={() => {
                  const all = resultat.prompts
                    ?.map((p) => `CLIP ${p.clip}:\n${p.prompt_en}`)
                    .join("\n\n");
                  copyToClipboard(all || "", "all-prompts");
                }}
                className="btn-secondary px-4 py-2 text-xs rounded"
              >
                {copied === "all-prompts" ? "✓ COPIÉ" : "[ TOUT COPIER ]"}
              </button>
            </div>

            {resultat.prompts?.map((p) => (
              <div
                key={p.clip}
                className="bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px] overflow-hidden"
              >
                <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(0,180,216,0.12)]">
                  <span className="font-orbitron font-bold text-xs text-[#00B4D8] tracking-[2px]">
                    CLIP {p.clip} · {p.outil.toUpperCase()}
                  </span>
                  <button
                    onClick={() => copyToClipboard(p.prompt_en, `prompt-${p.clip}`)}
                    className="font-mono text-xs text-[#5A7089] hover:text-[#00B4D8] transition-colors"
                  >
                    {copied === `prompt-${p.clip}` ? "✓ COPIÉ" : "[ COPIER ]"}
                  </button>
                </div>
                <div className="p-5">
                  <pre className="font-mono text-xs text-[#E8EFF6] bg-[#111F30] rounded-[6px] p-4 border border-[rgba(0,180,216,0.08)] whitespace-pre-wrap break-words leading-relaxed">
                    {p.prompt_en}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LÉGENDE TAB */}
        {activeTab === "legende" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-orbitron font-bold text-sm text-[#E8EFF6] tracking-[2px]">
                LÉGENDE INSTAGRAM
              </h2>
              <button
                onClick={() => copyToClipboard(resultat.legende || "", "legende")}
                className="btn-secondary px-4 py-2 text-xs rounded"
              >
                {copied === "legende" ? "✓ COPIÉ" : "[ COPIER LA LÉGENDE ]"}
              </button>
            </div>
            <div className="bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px] p-8">
              <div className="font-sans text-sm text-[#E8EFF6] leading-loose whitespace-pre-wrap">
                {resultat.legende}
              </div>
            </div>
          </div>
        )}

        {/* HASHTAGS TAB */}
        {activeTab === "hashtags" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-orbitron font-bold text-sm text-[#E8EFF6] tracking-[2px]">
                HASHTAGS ({resultat.hashtags?.length || 0})
              </h2>
              <button
                onClick={() => {
                  const all = resultat.hashtags?.map((h) => `#${h}`).join(" ") || "";
                  copyToClipboard(all, "hashtags");
                }}
                className="btn-secondary px-4 py-2 text-xs rounded"
              >
                {copied === "hashtags" ? "✓ COPIÉ" : "[ COPIER TOUS LES HASHTAGS ]"}
              </button>
            </div>
            <div className="bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px] p-8">
              <div className="flex flex-wrap gap-2">
                {resultat.hashtags?.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => copyToClipboard(`#${tag}`, `tag-${tag}`)}
                    className={`font-mono text-xs px-3 py-1.5 rounded-[4px] border transition-all duration-150 ${
                      copied === `tag-${tag}`
                        ? "text-[#34D399] bg-[rgba(52,211,153,0.15)] border-[rgba(52,211,153,0.3)]"
                        : "text-[#00B4D8] bg-[rgba(0,180,216,0.08)] border-[rgba(0,180,216,0.2)] hover:bg-[rgba(0,180,216,0.15)]"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[rgba(0,180,216,0.1)] py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-sans text-sm text-[#5A7089] mb-1">
            Pack créé avec <span className="text-[#00B4D8]">ReelGen by Mizuchi</span>
          </p>
          <p className="font-mono text-xs text-[#5A7089]">
            Besoin qu&apos;on réalise ça pour vous ? →{" "}
            <span className="text-[#00B4D8]">@mizuchi_z</span> |{" "}
            motionmatis@gmail.com | Nice, France
          </p>
        </div>
      </div>
    </div>
  );
}
