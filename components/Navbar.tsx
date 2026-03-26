"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface NavbarProps {
  user?: { email?: string; id: string } | null;
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(8,15,26,0.9)] backdrop-blur-md border-b border-[rgba(0,180,216,0.1)]">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-orbitron font-black text-lg text-[#00B4D8] tracking-[3px] transition-all">
          MIZUCHI
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/generate"
                className="font-mono text-xs text-[#5A7089] hover:text-[#E8EFF6] transition-colors uppercase tracking-widest"
              >
                Générer
              </Link>
              <Link
                href="/dashboard"
                className="font-mono text-xs text-[#5A7089] hover:text-[#E8EFF6] transition-colors uppercase tracking-widest"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="font-mono text-xs text-[#5A7089] hover:text-[#FB923C] transition-colors uppercase tracking-widest"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                href="/pricing"
                className="font-mono text-xs text-[#5A7089] hover:text-[#E8EFF6] transition-colors uppercase tracking-widest"
              >
                Tarifs
              </Link>
              <Link
                href="/auth/login"
                className="font-mono text-xs text-[#5A7089] hover:text-[#E8EFF6] transition-colors uppercase tracking-widest"
              >
                Connexion
              </Link>
              <Link
                href="/auth/signup"
                className="btn-primary px-4 py-2 text-xs rounded"
              >
                Commencer
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
