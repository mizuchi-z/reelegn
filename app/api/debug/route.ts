import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const results: Record<string, { ok: boolean; detail: string }> = {};

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  results.env_anthropic = {
    ok: !!apiKey && apiKey !== "PLUS_TARD",
    detail: !apiKey ? "MANQUANT" : apiKey === "PLUS_TARD" ? "Valeur placeholder — à remplacer" : `Présent (${apiKey.slice(0, 8)}...)`,
  };

  results.env_supabase_url = {
    ok: !!supabaseUrl && supabaseUrl.includes("supabase"),
    detail: supabaseUrl ? `OK — ${supabaseUrl}` : "MANQUANT",
  };

  results.env_supabase_service = {
    ok: !!supabaseServiceKey && supabaseServiceKey.length > 10,
    detail: supabaseServiceKey ? `Présent (${supabaseServiceKey.slice(0, 12)}...)` : "MANQUANT",
  };

  // Test Supabase admin connection
  try {
    const admin = createAdminClient();
    const { error } = await admin.from("profiles").select("id").limit(1);
    results.supabase_db = {
      ok: !error,
      detail: error ? `Erreur : ${error.message}` : "Connexion OK",
    };
  } catch (e) {
    results.supabase_db = {
      ok: false,
      detail: `Exception : ${e instanceof Error ? e.message : String(e)}`,
    };
  }

  // Test Anthropic API via fetch
  if (results.env_anthropic.ok) {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey!,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 5,
          messages: [{ role: "user", content: "Reply with: OK" }],
        }),
      });
      const body = await res.json();
      results.anthropic_api = {
        ok: res.ok,
        detail: res.ok
          ? `OK — réponse : ${body.content?.[0]?.text ?? "reçue"}`
          : `Erreur ${res.status}: ${body.error?.message ?? JSON.stringify(body)}`,
      };
    } catch (e) {
      results.anthropic_api = {
        ok: false,
        detail: `Exception : ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  } else {
    results.anthropic_api = { ok: false, detail: "Skipped — clé API manquante" };
  }

  const allOk = Object.values(results).every((r) => r.ok);
  return NextResponse.json({ status: allOk ? "OK" : "ERROR", checks: results }, { status: allOk ? 200 : 500 });
}
