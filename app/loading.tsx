export default function Loading() {
  return (
    <div className="min-h-screen bg-[#080F1A] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-[rgba(0,180,216,0.3)] border-t-[#00B4D8] rounded-full animate-spin" />
        <span className="font-mono text-xs text-[#5A7089] tracking-widest uppercase">
          Chargement...
        </span>
      </div>
    </div>
  );
}
