export default function Loading() {
  return (
    <div className="min-h-screen bg-[#080F1A] pt-20 px-4">
      <div className="max-w-5xl mx-auto animate-pulse">
        <div className="h-8 bg-[#0D1826] rounded w-72 mb-2" />
        <div className="h-3 bg-[#0D1826] rounded w-48 mb-10" />
        <div className="h-24 bg-[#0D1826] rounded mb-8" />
        <div className="h-6 bg-[#0D1826] rounded w-40 mb-6" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-[#0D1826] rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
