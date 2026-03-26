export interface Profile {
  id: string;
  email: string;
  nom: string | null;
  plan: "free" | "payant" | "abonne";
  generations_count: number;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  abonnement_actif: boolean;
  created_at: string;
}

export interface ClipScript {
  clip: number;
  duree: string;
  action: string;
  emotion: string;
  transition: string;
}

export interface ClipPrompt {
  clip: number;
  outil: string;
  prompt_en: string;
}

export interface GenerationResult {
  titre_reel: string;
  concept: string;
  script: ClipScript[];
  prompts: ClipPrompt[];
  legende: string;
  hashtags: string[];
}

export interface Generation {
  id: string;
  user_id: string;
  nom_business: string;
  secteur: string;
  message_cle: string;
  ambiance: string;
  outil_ia: string;
  duree_reel: string;
  resultat: GenerationResult;
  pdf_url: string | null;
  created_at: string;
}

export interface BriefFormData {
  nom_business: string;
  secteur: string;
  message_cle: string;
  ambiance: string;
  outil_ia: string;
  duree_reel: string;
}
