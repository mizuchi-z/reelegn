import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Generation } from "@/lib/types";
import SubscribeButton from "./SubscribeButton";

interface Props {
  searchParams: { sub?: string };
}

export default async function DashboardPage({ searchParams }: Props) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: generations } = await supabase
    .from("generations")
    .select("id, nom_business, secteur, ambiance, outil_ia, duree_reel, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const isAbonne = profile?.plan === "abonne" && profile?.abonnement_actif;
  const prenom = profile?.nom || user.email?.split("@")[0] || "Créateur";

  return (
    <div className="min-h-screen bg-[#080F1A] pt-20 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-orbitron font-black text-2xl text-[#E8EFF6]">
                BONJOUR {prenom.toUpperCase()} 🐉
              </h1>
              <p className="font-mono text-xs text-[#5A7089] mt-1">
                {user.email}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {isAbonne ? (
                <span className="font-mono text-xs text-[#34D399] border border-[rgba(52,211,153,0.3)] bg-[rgba(52,211,153,0.1)] px-3 py-1.5 rounded-[4px] uppercase tracking-widest">
                  ABONNÉ
                </span>
              ) : (
                <span className="font-mono text-xs text-[#5A7089] border border-[rgba(90,112,137,0.3)] bg-[rgba(90,112,137,0.1)] px-3 py-1.5 rounded-[4px] uppercase tracking-widest">
                  FREE
                </span>
              )}
              <Link
                href="/generate"
                className="btn-primary px-5 py-2.5 text-xs rounded"
              >
                + NOUVEAU PACK
              </Link>
            </div>
          </div>

          {searchParams.sub === "success" && (
            <div className="mt-6 bg-[rgba(52,211,153,0.1)] border border-[rgba(52,211,153,0.3)] rounded-[8px] px-5 py-4">
              <p className="font-orbitron font-bold text-sm text-[#34D399]">
                ✓ ABONNEMENT ACTIVÉ
              </p>
              <p className="font-sans text-xs text-[#34D399] mt-1 opacity-80">
                Bienvenue ! Tu as maintenant accès à des générations illimitées.
              </p>
            </div>
          )}
        </div>

        {/* Subscription card */}
        <div className="bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px] p-6 mb-8">
          <h2 className="font-orbitron font-bold text-sm text-[#E8EFF6] mb-4 tracking-[2px]">
            STATUT ABONNEMENT
          </h2>

          {isAbonne ? (
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <p className="font-orbitron font-bold text-base text-[#34D399]">
                  ABONNEMENT ACTIF
                </p>
                <p className="font-sans text-sm text-[#5A7089] mt-1">
                  Générations illimitées · €39/mois
                </p>
              </div>
              <SubscribeButton type="manage" />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <p className="font-sans text-sm text-[#5A7089]">
                  {profile?.generations_count || 0} génération(s) utilisée(s) ·{" "}
                  {(profile?.generations_count || 0) >= 1
                    ? "Pack suivant : €12"
                    : "1 génération gratuite disponible"}
                </p>
              </div>
              <SubscribeButton type="subscribe" />
            </div>
          )}
        </div>

        {/* Generations list */}
        <div>
          <h2 className="font-orbitron font-bold text-sm text-[#E8EFF6] mb-6 tracking-[2px]">
            MES PACKS ({generations?.length || 0})
          </h2>

          {!generations || generations.length === 0 ? (
            <div className="bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px] p-12 text-center">
              <p className="font-orbitron text-sm text-[#5A7089] mb-6">
                Aucun pack généré pour l&apos;instant
              </p>
              <Link
                href="/generate"
                className="btn-primary px-6 py-3 text-sm rounded-md inline-block"
              >
                ⚡ GÉNÉRER MON PREMIER PACK
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {(generations as Partial<Generation>[]).map((gen) => {
                const date = new Date(gen.created_at!).toLocaleDateString(
                  "fr-FR",
                  { day: "numeric", month: "short", year: "numeric" }
                );
                return (
                  <div
                    key={gen.id}
                    className="bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px] p-5 flex flex-col md:flex-row md:items-center gap-4 hover:border-[rgba(0,180,216,0.3)] transition-all"
                  >
                    <div className="flex-1 flex flex-col md:flex-row md:items-center gap-3">
                      <div className="flex-1">
                        <p className="font-orbitron font-bold text-sm text-[#E8EFF6]">
                          {gen.nom_business}
                        </p>
                        <p className="font-sans text-xs text-[#5A7089] mt-0.5">
                          {gen.secteur} · {gen.ambiance}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-xs text-[#00B4D8] border border-[rgba(0,180,216,0.2)] bg-[rgba(0,180,216,0.05)] px-2 py-1 rounded-[4px]">
                          {gen.outil_ia}
                        </span>
                        <span className="font-mono text-xs text-[#5A7089]">
                          {date}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/result/${gen.id}`}
                      className="font-mono text-xs text-[#00B4D8] hover:underline whitespace-nowrap"
                    >
                      Voir →
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
