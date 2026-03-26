import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReelGen by Mizuchi — Génère ton Reel IA en 2 minutes",
  description:
    "Entre ton brief. ReelGen crée le script, les prompts Higgsfield & Kling, la légende et les hashtags. Télécharge ton pack PDF. Lance ton Reel.",
  keywords:
    "reel instagram ia, génération vidéo ia, higgsfield, kling, prompts ia, contenu vidéo, mizuchi",
  openGraph: {
    title: "ReelGen by Mizuchi",
    description: "Génère ton pack Reel professionnel en 2 minutes avec l'IA",
    url: "https://mizuchi-reelgen.fr",
    siteName: "ReelGen by Mizuchi",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReelGen by Mizuchi",
    description: "Génère ton pack Reel professionnel en 2 minutes avec l'IA",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
