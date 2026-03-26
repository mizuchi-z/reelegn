# ReelGen by Mizuchi

SaaS web app pour générer des packs Reel IA complets (script + prompts Higgsfield/Kling + légende + hashtags).

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Supabase** (auth + PostgreSQL)
- **Claude API** (`claude-sonnet-4-20250514`)
- **Stripe** (one-time + abonnement)
- **Resend** (emails)
- **jsPDF** (génération PDF)

---

## Installation

### 1. Installer Node.js

Télécharge et installe Node.js LTS depuis : https://nodejs.org/

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Copie `.env.local` et remplis toutes les clés :

```bash
# Anthropic — https://console.anthropic.com
ANTHROPIC_API_KEY=sk-ant-...

# Supabase — https://supabase.com (créer un projet)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe — https://dashboard.stripe.com
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PACK_PRICE_ID=price_...
STRIPE_SUB_PRICE_ID=price_...

# Resend — https://resend.com
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@mizuchi-reelgen.fr

# App
NEXT_PUBLIC_URL=http://localhost:3000
```

### 4. Configurer Supabase

1. Crée un projet sur [supabase.com](https://supabase.com)
2. Va dans **SQL Editor** et exécute le contenu de `supabase-schema.sql`
3. Dans **Authentication > Settings** : active "Email confirmations" si souhaité

### 5. Configurer Stripe

1. Crée deux produits dans le [Stripe Dashboard](https://dashboard.stripe.com) :
   - **Pack unique** : one-time payment, €12.00
   - **Abonnement mensuel** : recurring, €39.00/mois
2. Copie les `price_id` dans `.env.local`
3. Configure le webhook Stripe vers `http://localhost:3000/api/stripe/webhook`
   - Écouter : `checkout.session.completed`, `customer.subscription.deleted`, `customer.subscription.updated`
4. Active le **Customer Portal** dans Stripe Dashboard

### 6. Lancer en développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000)

---

## Déploiement sur Vercel

1. Push le projet sur GitHub
2. Connecte le repo sur [vercel.com](https://vercel.com)
3. Ajoute toutes les variables d'environnement dans les Settings Vercel
4. Change `NEXT_PUBLIC_URL` vers ton domaine de prod
5. Mets à jour le webhook Stripe avec l'URL de prod

---

## Structure du projet

```
app/
├── page.tsx                    # Landing page
├── auth/
│   ├── signup/page.tsx         # Inscription
│   ├── login/page.tsx          # Connexion
│   └── callback/route.ts       # Callback OAuth
├── generate/
│   ├── page.tsx                # Page formulaire (Server)
│   └── GenerateForm.tsx        # Formulaire (Client)
├── result/[id]/
│   ├── page.tsx                # Page résultat (Server)
│   └── ResultClient.tsx        # Onglets + PDF (Client)
├── dashboard/
│   ├── page.tsx                # Dashboard (Server)
│   └── SubscribeButton.tsx     # Bouton Stripe (Client)
├── pricing/page.tsx            # Page tarifs
├── mentions-legales/page.tsx   # Mentions légales
├── confidentialite/page.tsx    # RGPD
└── api/
    ├── generate/route.ts       # Claude API
    ├── send-pdf/route.ts       # Email pack
    ├── send-welcome/route.ts   # Email bienvenue
    └── stripe/
        ├── checkout/route.ts   # Stripe Checkout
        ├── webhook/route.ts    # Stripe Webhook
        └── portal/route.ts     # Customer Portal

components/
├── Navbar.tsx
└── ui/
    ├── Button.tsx
    ├── Card.tsx
    ├── Input.tsx
    └── Badge.tsx

lib/
├── supabase/
│   ├── client.ts               # Client browser
│   ├── server.ts               # Client server
│   └── admin.ts                # Client service role
├── types.ts                    # TypeScript types
└── pdf.ts                      # Génération PDF (jsPDF)
```

---

## Logique métier

| Situation | Comportement |
|-----------|-------------|
| Non connecté | Voir la landing, redirect vers /auth/signup au clic |
| Free + 0 générations | Génération directe gratuite |
| Free + ≥1 génération | Paiement Stripe €12 requis |
| Abonné actif | Génération illimitée |
| Abonnement résilié | Traité comme free |

---

## Contact

**Matis Spineu — Mizuchi**
- Instagram : @mizuchi_z
- Email : motionmatis@gmail.com
- Nice, France
