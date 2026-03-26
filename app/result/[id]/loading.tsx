export default function Loading() {
  return (
    <div className="min-h-screen bg-[#080F1A]">
      <div className="bg-[#0D1826] border-b border-[rgba(0,180,216,0.12)] px-4 py-8 animate-pulse">
        <div className="max-w-4xl mx-auto">
          <div className="h-8 bg-[#080F1A] rounded w-64 mb-3" />
          <div className="h-4 bg-[#080F1A] rounded w-48 mb-6" />
          <div className="flex gap-3">
            <div className="h-10 bg-[#080F1A] rounded w-48" />
            <div className="h-10 bg-[#080F1A] rounded w-48" />
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-[#0D1826] rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
