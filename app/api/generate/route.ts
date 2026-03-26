import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { generateReelPack } from "@/lib/generate";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { nom_business, secteur, message_cle, ambiance, outil_ia, duree_reel } = body;

    if (!nom_business || !secteur || !message_cle || !ambiance || !outil_ia || !duree_reel) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    const adminSupabase = createAdminClient();
    const { data: profile } = await adminSupabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Profil introuvable" }, { status: 404 });
    }

    const isAbonne = profile.plan === "abonne" && profile.abonnement_actif;

    if (profile.plan === "free" && profile.generations_count >= 1 && !isAbonne) {
      return NextResponse.json({ error: "Paiement requis" }, { status: 402 });
    }

    const result = await generateReelPack(
      { nom_business, secteur, message_cle, ambiance, outil_ia, duree_reel },
      user.id
    );

    // Send PDF email in background (non-blocking)
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/send-pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        generation_id: result.id,
        user_email: user.email,
        user_nom: profile.nom,
      }),
    }).catch((err) => console.error("PDF email error:", err));

    return NextResponse.json(result);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[/api/generate] ERREUR:", msg);
    return NextResponse.json({ error: msg }, { status: 503 });
  }
}
