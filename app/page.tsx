import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/Navbar";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Navbar user={user} />
      <main className="min-h-screen bg-[#080F1A]">
        {/* ── HERO ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-14 overflow-hidden">
          {/* Radial gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,180,216,0.08)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse,rgba(0,180,216,0.04)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-block mb-8">
              <span className="font-mono text-[11px] tracking-[4px] text-[#00B4D8] border border-[rgba(0,180,216,0.3)] bg-[rgba(0,180,216,0.08)] px-4 py-2 rounded-[4px] uppercase">
                [ IA VIDÉO · NICE 🐉 ]
              </span>
            </div>

            {/* H1 */}
            <h1 className="font-orbitron font-black mb-6 leading-tight">
              <span
                className="block text-[#E8EFF6]"
                style={{ fontSize: "clamp(36px, 7vw, 72px)" }}
              >
                GÉNÈRE TON
              </span>
              <span
                className="block text-[#00B4D8]"
                style={{
                  fontSize: "clamp(36px, 7vw, 72px)",
                  textShadow: "0 0 30px rgba(0,180,216,0.4)",
                }}
              >
                REEL EN 2 MIN
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-base md:text-lg text-[#5A7089] max-w-2xl mx-auto mb-10 leading-relaxed">
              Entre ton brief. ReelGen crée le script, les prompts Higgsfield &
              Kling, la légende et les hashtags. Télécharge ton pack PDF. Lance
              ton Reel.
            </p>

            {/* CTA */}
            <div className="flex flex-col items-center gap-4">
              <Link
                href={user ? "/generate" : "/auth/signup"}
                className="btn-primary px-8 py-4 text-sm rounded-md inline-flex items-center gap-2"
              >
                ⚡ GÉNÉRER MON PREMIER PACK GRATUIT
              </Link>
              <p className="font-mono text-xs text-[#5A7089]">
                ✦ 1 génération offerte à l&apos;inscription · Aucune carte requise
              </p>
            </div>

            {/* Tool logos */}
            <div className="mt-12 flex items-center justify-center gap-6">
              <span className="font-mono text-xs text-[#5A7089] tracking-widest uppercase">
                Optimisé pour
              </span>
              <div className="flex items-center gap-4">
                <span className="font-orbitron text-xs font-bold text-[#E8EFF6] border border-[rgba(0,180,216,0.2)] px-3 py-1.5 rounded-[4px] bg-[rgba(0,180,216,0.05)]">
                  HIGGSFIELD
                </span>
                <span className="font-orbitron text-xs font-bold text-[#E8EFF6] border border-[rgba(0,180,216,0.2)] px-3 py-1.5 rounded-[4px] bg-[rgba(0,180,216,0.05)]">
                  KLING
                </span>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="w-px h-12 bg-gradient-to-b from-[rgba(0,180,216,0.5)] to-transparent" />
          </div>
        </section>

        {/* ── COMMENT ÇA MARCHE ── */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-orbitron font-black text-3xl md:text-4xl text-[#E8EFF6] mb-4">
                3 ÉTAPES.{" "}
                <span className="text-[#00B4D8]">UN PACK COMPLET.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  num: "01",
                  title: "BRIEF",
                  desc: "Tu décris ton business et ce que tu veux montrer",
                  icon: "✏️",
                },
                {
                  num: "02",
                  title: "GÉNÉRATION IA",
                  desc: "ReelGen crée script, prompts, légende et hashtags en 15 secondes",
                  icon: "⚡",
                },
                {
                  num: "03",
                  title: "PACK PDF",
                  desc: "Tu reçois ton pack par email. Tu tournes. Tu postes.",
                  icon: "📄",
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px] p-8 flex flex-col gap-4 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00B4D8] to-transparent opacity-50" />
                  <span className="font-orbitron font-black text-4xl text-[rgba(0,180,216,0.15)]">
                    {step.num}
                  </span>
                  <div className="text-2xl">{step.icon}</div>
                  <h3 className="font-orbitron font-bold text-sm text-[#00B4D8] tracking-[2px]">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-[#5A7089] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTEURS ── */}
        <section className="py-24 px-4 bg-[#0D1826]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-orbitron font-black text-3xl md:text-4xl text-[#E8EFF6] mb-4">
                FAIT POUR <span className="text-[#00B4D8]">TON SECTEUR</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: "🍽️",
                  title: "Restos & Food",
                  desc: "Plats qui font saliver, ambiance, service",
                },
                {
                  icon: "🏠",
                  title: "Immobilier",
                  desc: "Visites virtuelles, biens prestige, urgence",
                },
                {
                  icon: "👟",
                  title: "Mode & Streetwear",
                  desc: "Drops, lookbooks, lifestyle",
                },
                {
                  icon: "💪",
                  title: "Sport & Fitness",
                  desc: "Transformations, énergie, résultats",
                },
              ].map((sector) => (
                <div
                  key={sector.title}
                  className="bg-[#080F1A] border border-[rgba(0,180,216,0.12)] rounded-[8px] p-6 flex flex-col gap-3 hover:border-[rgba(0,180,216,0.4)] transition-all duration-150"
                >
                  <span className="text-3xl">{sector.icon}</span>
                  <h3 className="font-orbitron font-bold text-xs text-[#E8EFF6] tracking-[1px]">
                    {sector.title.toUpperCase()}
                  </h3>
                  <p className="font-sans text-xs text-[#5A7089] leading-relaxed">
                    {sector.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section className="py-24 px-4" id="pricing">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-orbitron font-black text-3xl md:text-4xl text-[#E8EFF6] mb-4">
                TARIFS <span className="text-[#00B4D8]">SIMPLES</span>
              </h2>
              <p className="font-sans text-sm text-[#5A7089]">
                Commence gratuitement. Paye seulement si tu aimes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* FREE */}
              <div className="bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px] p-8 flex flex-col gap-6">
                <div>
                  <span className="font-mono text-xs text-[#5A7089] tracking-widest uppercase">
                    Free
                  </span>
                  <div className="font-orbitron font-black text-4xl text-[#E8EFF6] mt-2">
                    €0
                  </div>
                </div>
                <ul className="flex flex-col gap-3 font-sans text-sm text-[#5A7089]">
                  {[
                    "1 génération",
                    "Script + Prompts",
                    "Légende + Hashtags",
                    "PDF téléchargeable",
                    "Email avec PDF",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-[#34D399]">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className="btn-secondary px-6 py-3 text-sm rounded-md text-center mt-auto"
                >
                  S&apos;INSCRIRE
                </Link>
              </div>

              {/* PACK */}
              <div className="bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px] p-8 flex flex-col gap-6">
                <div>
                  <span className="font-mono text-xs text-[#5A7089] tracking-widest uppercase">
                    Pack
                  </span>
                  <div className="font-orbitron font-black text-4xl text-[#E8EFF6] mt-2">
                    €12
                  </div>
                  <span className="font-mono text-xs text-[#5A7089]">
                    par pack
                  </span>
                </div>
                <ul className="flex flex-col gap-3 font-sans text-sm text-[#5A7089]">
                  {[
                    "1 pack complet",
                    "Script + Prompts",
                    "Légende + Hashtags",
                    "PDF téléchargeable",
                    "Email avec PDF",
                    "Accès dashboard",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-[#34D399]">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className="btn-secondary px-6 py-3 text-sm rounded-md text-center mt-auto"
                >
                  ACHETER CE PACK
                </Link>
              </div>

              {/* MENSUEL — featured */}
              <div className="bg-[#0D1826] border border-[#00B4D8] rounded-[8px] p-8 flex flex-col gap-6 shadow-[0_0_30px_rgba(0,180,216,0.15)] relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="font-mono text-[10px] tracking-[2px] text-[#080F1A] bg-[#00B4D8] px-3 py-1 rounded-[4px] uppercase">
                    LE PLUS POPULAIRE
                  </span>
                </div>
                <div>
                  <span className="font-mono text-xs text-[#00B4D8] tracking-widest uppercase">
                    Mensuel
                  </span>
                  <div className="font-orbitron font-black text-4xl text-[#E8EFF6] mt-2">
                    €39
                  </div>
                  <span className="font-mono text-xs text-[#5A7089]">
                    /mois
                  </span>
                </div>
                <ul className="flex flex-col gap-3 font-sans text-sm text-[#5A7089]">
                  {[
                    "Générations illimitées",
                    "Script + Prompts",
                    "Légende + Hashtags",
                    "PDF téléchargeable",
                    "Email avec PDF",
                    "Accès dashboard",
                    "Historique complet",
                    "Support prioritaire",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-[#00B4D8]">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className="btn-primary px-6 py-3 text-sm rounded-md text-center mt-auto"
                >
                  S&apos;ABONNER
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-24 px-4 bg-[#0D1826]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-orbitron font-black text-2xl md:text-3xl text-[#E8EFF6] mb-4">
              PRÊT À LANCER TON{" "}
              <span className="text-[#00B4D8]">PREMIER REEL IA ?</span>
            </h2>
            <p className="font-sans text-sm text-[#5A7089] mb-8">
              Rejoins les business qui utilisent déjà ReelGen pour leurs Reels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/auth/signup"
                className="btn-primary px-8 py-4 text-sm rounded-md"
              >
                ⚡ CRÉER MON COMPTE GRATUIT
              </Link>
              <Link
                href="/auth/login"
                className="font-sans text-sm text-[#5A7089] hover:text-[#E8EFF6] transition-colors"
              >
                Déjà un compte ? → Connexion
              </Link>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="py-12 px-4 border-t border-[rgba(0,180,216,0.1)]">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col items-center md:items-start gap-1">
                <span className="font-orbitron font-black text-lg text-[#00B4D8] tracking-[3px]">
                  MIZUCHI
                </span>
                <span className="font-mono text-xs text-[#5A7089]">
                  Contenu vidéo · Nice
                </span>
              </div>
              <div className="flex flex-wrap gap-6 items-center justify-center">
                <Link
                  href="/mentions-legales"
                  className="font-mono text-xs text-[#5A7089] hover:text-[#E8EFF6] transition-colors"
                >
                  Mentions légales
                </Link>
                <Link
                  href="/confidentialite"
                  className="font-mono text-xs text-[#5A7089] hover:text-[#E8EFF6] transition-colors"
                >
                  Confidentialité
                </Link>
                <a
                  href="mailto:motionmatis@gmail.com"
                  className="font-mono text-xs text-[#5A7089] hover:text-[#E8EFF6] transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-[rgba(0,180,216,0.08)] text-center">
              <p className="font-mono text-xs text-[#5A7089]">
                @mizuchi_z · motionmatis@gmail.com · Nice, France 2026
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
