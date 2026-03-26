import { createAdminClient } from "./supabase/admin";
import { BriefFormData, GenerationResult } from "./types";

const SYSTEM_PROMPT = `Tu es le meilleur expert mondial en création de contenu vidéo IA pour Instagram Reels. Tu maîtrises parfaitement les outils Higgsfield et Kling. Tu crées des packs de contenu pour des business français qui veulent des Reels professionnels générés par IA.

Ton rôle : analyser le brief et générer un pack complet, cohérent, et immédiatement utilisable.

RÈGLES ABSOLUES :
1. Tu réponds UNIQUEMENT avec du JSON valide. Zéro texte avant ou après.
2. Les prompts pour Higgsfield/Kling sont TOUJOURS en anglais, de style cinématique professionnel.
3. Le script et la légende sont TOUJOURS en français.
4. Adapte le ton et le style précisément à l'ambiance demandée.
5. Les prompts doivent être ultra-détaillés et directement utilisables dans l'outil IA.

FORMAT DE RÉPONSE OBLIGATOIRE :
{
  "titre_reel": "Titre accrocheur du reel en français (max 60 chars)",
  "concept": "Concept général du reel en 1 phrase",
  "script": [
    {
      "clip": 1,
      "duree": "X secondes",
      "action": "Description précise de l'action visuelle en français",
      "emotion": "Atmosphère et émotion visée en français",
      "transition": "Type de transition vers le clip suivant en français"
    }
  ],
  "prompts": [
    {
      "clip": 1,
      "outil": "Higgsfield ou Kling",
      "prompt_en": "Ultra-detailed cinematic English prompt ready to paste in the tool. Include: camera movement, lighting, subject, action, mood, style, technical specs (slow motion/etc), aspect ratio 9:16"
    }
  ],
  "legende": "Légende Instagram complète en français. Hook fort en première ligne (accrocher en 2 secondes). Corps naturel. CTA clair. Emojis dosés. Maximum 300 mots.",
  "hashtags": ["hashtag1", "hashtag2", "...exactement 30 hashtags sans le #, mix niche/moyen/large"]
}`;

export async function generateReelPack(
  brief: BriefFormData,
  userId: string
): Promise<{ id: string; resultat: GenerationResult }> {
  const prompt = `${SYSTEM_PROMPT}

Brief :
- Business : ${brief.nom_business}
- Secteur : ${brief.secteur}
- Message clé : ${brief.message_cle}
- Ambiance : ${brief.ambiance}
- Outil IA : ${brief.outil_ia}
- Durée du reel : ${brief.duree_reel}

Génère le pack complet.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Anthropic API ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text: string = data.content[0].text.trim();

  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonStr = codeBlockMatch ? codeBlockMatch[1].trim() : text;
  const resultJson: GenerationResult = JSON.parse(jsonStr);

  const adminSupabase = createAdminClient();

  const { data: generation, error } = await adminSupabase
    .from("generations")
    .insert({
      user_id: userId,
      nom_business: brief.nom_business,
      secteur: brief.secteur,
      message_cle: brief.message_cle,
      ambiance: brief.ambiance,
      outil_ia: brief.outil_ia,
      duree_reel: brief.duree_reel,
      resultat: resultJson,
    })
    .select()
    .single();

  if (error || !generation) throw new Error(`DB error: ${error?.message}`);

  const { data: profile } = await adminSupabase
    .from("profiles")
    .select("generations_count")
    .eq("id", userId)
    .single();

  if (profile) {
    await adminSupabase
      .from("profiles")
      .update({ generations_count: profile.generations_count + 1 })
      .eq("id", userId);
  }

  return { id: generation.id, resultat: resultJson };
}
