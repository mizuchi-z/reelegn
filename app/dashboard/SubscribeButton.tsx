"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  type: "subscribe" | "manage";
}

export default function SubscribeButton({ type }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    try {
      if (type === "subscribe") {
        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "subscription" }),
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        }
      } else {
        // Stripe customer portal
        const res = await fetch("/api/stripe/portal", {
          method: "POST",
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        }
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`px-5 py-2.5 text-xs rounded font-orbitron font-bold tracking-wide transition-all disabled:opacity-50 ${
        type === "subscribe"
          ? "btn-primary"
          : "btn-secondary"
      }`}
    >
      {loading
        ? "Chargement..."
        : type === "subscribe"
        ? "PASSER À L'ABONNEMENT €39/MOIS"
        : "GÉRER MON ABONNEMENT"}
    </button>
  );
}
