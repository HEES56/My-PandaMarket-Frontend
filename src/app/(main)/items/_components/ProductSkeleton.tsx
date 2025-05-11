export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-6 w-full animate-pulse">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col w-full rounded-lg border border-custom-color-border-gray bg-white overflow-hidden"
        >
          <div className="relative w-full aspect-[1/1] bg-gray-200" />
          <div className="p-4 flex flex-col gap-2">
            <div className="h-5 w-3/4 bg-gray-200 rounded" />
            <div className="h-5 w-1/2 bg-gray-200 rounded" />
            <div className="flex items-center gap-2 mt-1">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="h-4 w-10 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
