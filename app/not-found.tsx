import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080F1A] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="font-orbitron font-black text-8xl text-[rgba(0,180,216,0.15)] mb-4">
          404
        </div>
        <h1 className="font-orbitron font-black text-2xl text-[#E8EFF6] mb-3">
          PAGE INTROUVABLE
        </h1>
        <p className="font-sans text-sm text-[#5A7089] mb-8">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <Link href="/" className="btn-primary px-6 py-3 text-sm rounded-md inline-block">
          RETOUR À L&apos;ACCUEIL
        </Link>
      </div>
    </div>
  );
}
