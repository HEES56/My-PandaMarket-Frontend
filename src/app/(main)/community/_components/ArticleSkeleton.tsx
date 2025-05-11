"use client";

export default function ArticleSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-6 w-full bg-custom-color-list-gray border-b border-custom-color-border-gray pb-6"
        >
          <div className="flex justify-between items-start">
            <div className="h-6 w-1/3 bg-gray-200 rounded-md" />
            <div className="w-[64px] h-[50px] bg-gray-200 rounded-md" />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full" />
              <div className="h-4 w-24 bg-gray-200 rounded-md" />
              <div className="h-4 w-20 bg-gray-200 rounded-md" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 bg-gray-200 rounded-md" />
              <div className="h-4 w-8 bg-gray-200 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
