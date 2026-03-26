"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#080F1A] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-6">⚠️</div>
        <h2 className="font-orbitron font-black text-xl text-[#E8EFF6] mb-3">
          QUELQUE CHOSE S&apos;EST MAL PASSÉ
        </h2>
        <p className="font-sans text-sm text-[#5A7089] mb-2">
          {error.message || "Une erreur inattendue est survenue."}
        </p>
        <p className="font-mono text-xs text-[#5A7089] mb-8">
          Contacte @mizuchi_z si le problème persiste.
        </p>
        <button
          onClick={reset}
          className="btn-primary px-6 py-3 text-sm rounded-md"
        >
          RÉESSAYER
        </button>
      </div>
    </div>
  );
}
