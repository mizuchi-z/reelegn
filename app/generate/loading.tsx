export default function Loading() {
  return (
    <div className="min-h-screen bg-[#080F1A] pt-20 px-4">
      <div className="max-w-2xl mx-auto animate-pulse">
        <div className="h-8 bg-[#0D1826] rounded w-64 mb-3" />
        <div className="h-4 bg-[#0D1826] rounded w-96 mb-10" />
        <div className="flex flex-col gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i}>
              <div className="h-3 bg-[#0D1826] rounded w-40 mb-3" />
              <div className="h-12 bg-[#0D1826] rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
