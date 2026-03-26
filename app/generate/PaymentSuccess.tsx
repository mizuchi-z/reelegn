"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  latestId?: string;
}

export default function PaymentSuccess({ latestId }: Props) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (latestId) {
      // Latest gen exists — redirect immediately
      router.push(`/result/${latestId}`);
      return;
    }

    // Webhook may still be processing — poll & countdown
    const timer = setInterval(async () => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          router.push("/dashboard");
          return 0;
        }
        return c - 1;
      });

      // Try to find new generation
      try {
        const res = await fetch("/api/latest-generation");
        const data = await res.json();
        if (data.id) {
          clearInterval(timer);
          router.push(`/result/${data.id}`);
        }
      } catch {
        // silent
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [latestId, router]);

  return (
    <div className="min-h-screen bg-[#080F1A] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-5xl mb-6">🎬</div>
        <h1 className="font-orbitron font-black text-2xl text-[#34D399] mb-3">
          PAIEMENT CONFIRMÉ
        </h1>
        <p className="font-sans text-sm text-[#5A7089] mb-6 leading-relaxed">
          Ton pack est en cours de génération. Tu vas être redirigé
          automatiquement dans quelques secondes.
        </p>
        <div className="bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px] p-6 mb-6">
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-[rgba(0,180,216,0.3)] border-t-[#00B4D8] rounded-full animate-spin" />
            <span className="font-mono text-sm text-[#E8EFF6]">
              Génération en cours...
            </span>
          </div>
        </div>
        <p className="font-mono text-xs text-[#5A7089] mb-6">
          Redirection dans {countdown}s...
        </p>
        <Link
          href="/dashboard"
          className="font-mono text-xs text-[#00B4D8] hover:underline"
        >
          → Voir mon dashboard
        </Link>
      </div>
    </div>
  );
}
