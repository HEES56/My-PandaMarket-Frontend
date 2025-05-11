export default function BestSkeleton() {
  return (
    <div className="flex flex-col w-full gap-[16px] bg-custom-color-card-gray px-[24px] pb-[16px] rounded-xl animate-pulse">
      <div className="w-[102px] h-[28px] bg-gray-200 rounded-b-xl" />

      <div className="flex justify-between items-center gap-4">
        <div className="h-[24px] w-1/2 bg-gray-200 rounded" />
        <div className="w-[64px] h-[50px] bg-gray-200 rounded-md" />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="w-[24px] h-[24px] bg-gray-200 rounded-full" />
          <div className="h-[16px] w-[80px] bg-gray-200 rounded" />
        </div>
        <div className="h-[16px] w-[60px] bg-gray-200 rounded" />
      </div>
    </div>
  );
}
