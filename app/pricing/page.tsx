import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/Navbar";

export default async function PricingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Navbar user={user} />
      <div className="min-h-screen bg-[#080F1A] pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-[#00B4D8] tracking-[4px] border border-[rgba(0,180,216,0.3)] bg-[rgba(0,180,216,0.08)] px-4 py-2 rounded-[4px] uppercase inline-block mb-6">
              TARIFS
            </span>
            <h1 className="font-orbitron font-black text-4xl md:text-5xl text-[#E8EFF6] mb-4">
              SIMPLE.{" "}
              <span className="text-[#00B4D8]">TRANSPARENT.</span>
            </h1>
            <p className="font-sans text-base text-[#5A7089] max-w-xl mx-auto">
              Commence gratuitement. Paye un pack à la fois ou passe à
              l&apos;abonnement si tu postes régulièrement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* FREE */}
            <div className="bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px] p-8 flex flex-col gap-6">
              <div>
                <span className="font-mono text-xs text-[#5A7089] tracking-widest uppercase">
                  Free
                </span>
                <div className="font-orbitron font-black text-5xl text-[#E8EFF6] mt-3">
                  €0
                </div>
                <p className="font-sans text-xs text-[#5A7089] mt-1">
                  Pour tester ReelGen
                </p>
              </div>
              <ul className="flex flex-col gap-3 flex-1">
                {[
                  ["✓", "1 génération complète", "green"],
                  ["✓", "Script clip par clip", "green"],
                  ["✓", "Prompts Higgsfield / Kling", "green"],
                  ["✓", "Légende Instagram", "green"],
                  ["✓", "30 hashtags", "green"],
                  ["✓", "PDF téléchargeable", "green"],
                  ["✓", "Email avec PDF", "green"],
                  ["—", "Dashboard historique", "muted"],
                  ["—", "Générations supplémentaires", "muted"],
                ].map(([icon, label, color]) => (
                  <li key={label} className="flex items-center gap-3 font-sans text-sm">
                    <span className={color === "green" ? "text-[#34D399]" : "text-[#5A7089]"}>
                      {icon}
                    </span>
                    <span className={color === "muted" ? "text-[#5A7089]" : "text-[#E8EFF6]"}>
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signup"
                className="btn-secondary px-6 py-3 text-sm rounded-md text-center"
              >
                S&apos;INSCRIRE GRATUITEMENT
              </Link>
            </div>

            {/* PACK */}
            <div className="bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px] p-8 flex flex-col gap-6">
              <div>
                <span className="font-mono text-xs text-[#5A7089] tracking-widest uppercase">
                  Pack à l&apos;unité
                </span>
                <div className="flex items-end gap-2 mt-3">
                  <span className="font-orbitron font-black text-5xl text-[#E8EFF6]">
                    €12
                  </span>
                  <span className="font-mono text-sm text-[#5A7089] mb-1">
                    / pack
                  </span>
                </div>
                <p className="font-sans text-xs text-[#5A7089] mt-1">
                  Pour une commande ponctuelle
                </p>
              </div>
              <ul className="flex flex-col gap-3 flex-1">
                {[
                  ["✓", "1 pack complet", "green"],
                  ["✓", "Script clip par clip", "green"],
                  ["✓", "Prompts Higgsfield / Kling", "green"],
                  ["✓", "Légende Instagram", "green"],
                  ["✓", "30 hashtags", "green"],
                  ["✓", "PDF téléchargeable", "green"],
                  ["✓", "Email avec PDF", "green"],
                  ["✓", "Dashboard historique", "green"],
                  ["—", "Générations illimitées", "muted"],
                ].map(([icon, label, color]) => (
                  <li key={label} className="flex items-center gap-3 font-sans text-sm">
                    <span className={color === "green" ? "text-[#34D399]" : "text-[#5A7089]"}>
                      {icon}
                    </span>
                    <span className={color === "muted" ? "text-[#5A7089]" : "text-[#E8EFF6]"}>
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signup"
                className="btn-secondary px-6 py-3 text-sm rounded-md text-center"
              >
                ACHETER UN PACK
              </Link>
            </div>

            {/* MENSUEL */}
            <div className="bg-[#0D1826] border-2 border-[#00B4D8] rounded-[8px] p-8 flex flex-col gap-6 shadow-[0_0_40px_rgba(0,180,216,0.15)] relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="font-mono text-[10px] tracking-[2px] text-[#080F1A] bg-[#00B4D8] px-4 py-1.5 rounded-[4px] uppercase">
                  LE PLUS POPULAIRE
                </span>
              </div>
              <div>
                <span className="font-mono text-xs text-[#00B4D8] tracking-widest uppercase">
                  Mensuel
                </span>
                <div className="flex items-end gap-2 mt-3">
                  <span className="font-orbitron font-black text-5xl text-[#E8EFF6]">
                    €39
                  </span>
                  <span className="font-mono text-sm text-[#5A7089] mb-1">
                    /mois
                  </span>
                </div>
                <p className="font-sans text-xs text-[#5A7089] mt-1">
                  Pour les business actifs
                </p>
              </div>
              <ul className="flex flex-col gap-3 flex-1">
                {[
                  ["✓", "Générations illimitées", "cyan"],
                  ["✓", "Script clip par clip", "cyan"],
                  ["✓", "Prompts Higgsfield / Kling", "cyan"],
                  ["✓", "Légende Instagram", "cyan"],
                  ["✓", "30 hashtags", "cyan"],
                  ["✓", "PDF téléchargeable", "cyan"],
                  ["✓", "Email avec PDF", "cyan"],
                  ["✓", "Dashboard + historique complet", "cyan"],
                  ["✓", "Support prioritaire", "cyan"],
                ].map(([icon, label, color]) => (
                  <li key={label} className="flex items-center gap-3 font-sans text-sm">
                    <span className={color === "cyan" ? "text-[#00B4D8]" : "text-[#34D399]"}>
                      {icon}
                    </span>
                    <span className="text-[#E8EFF6]">{label}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signup"
                className="btn-primary px-6 py-3 text-sm rounded-md text-center"
              >
                S&apos;ABONNER — €39/MOIS
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h2 className="font-orbitron font-bold text-lg text-[#E8EFF6] mb-8 text-center">
              QUESTIONS FRÉQUENTES
            </h2>
            <div className="flex flex-col gap-4">
              {[
                {
                  q: "Qu'est-ce qu'un pack Reel exactement ?",
                  a: "Un pack comprend : le script clip par clip de ton Reel, les prompts prêts à coller dans Higgsfield ou Kling, la légende Instagram et 30 hashtags. Tout est optimisé pour ton secteur et l'ambiance choisie.",
                },
                {
                  q: "Est-ce que je dois avoir Higgsfield ou Kling ?",
                  a: "Oui. ReelGen génère les prompts pour ces outils IA. Tu utilises ensuite ces prompts dans Higgsfield ou Kling pour créer les clips vidéo. Les deux outils ont des plans gratuits.",
                },
                {
                  q: "Puis-je annuler l'abonnement à tout moment ?",
                  a: "Oui, sans engagement. Tu peux annuler depuis ton dashboard à tout moment. L'accès reste actif jusqu'à la fin de la période payée.",
                },
                {
                  q: "Les prompts fonctionnent-ils vraiment ?",
                  a: "Oui. Ils sont générés par Claude (Anthropic) et optimisés pour le format cinématique 9:16 d'Instagram. Ils incluent mouvement de caméra, éclairage, action et style.",
                },
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px] p-6"
                >
                  <p className="font-orbitron font-bold text-sm text-[#E8EFF6] mb-3">
                    {faq.q}
                  </p>
                  <p className="font-sans text-sm text-[#5A7089] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
