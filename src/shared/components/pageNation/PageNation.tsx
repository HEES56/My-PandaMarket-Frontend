"use client";

import Image from "next/image";

import left from "@/shared/assets/Img/button-image/btn_right.png";
import right from "@/shared/assets/Img/button-image/btn_left.png";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};
const blockSize = 5;

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const currentBlock = Math.floor((currentPage - 1) / blockSize);
  const startPage = currentBlock * blockSize + 1;
  const endPage = Math.min(startPage + blockSize - 1, totalPages);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="flex w-full   items-center justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isPrevDisabled}
        className=" p-3"
      >
        <Image
          src={left}
          alt="이전 페이지"
          width={40}
          height={40}
          className="w-10"
        />
      </button>

      <div className="flex gap-2">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 rounded-3xl  text-base  font-semibold  p-2 ${
              page === currentPage
                ? "bg-custom-color-blue  text-white "
                : "bg-white  text-custom-text-gray-200 border border-custom-color-border-gray"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
        className="p-3"
      >
        <Image
          src={right}
          alt="다음 페이지"
          width={40}
          height={40}
          className="w-[40px]"
        />
      </button>
    </div>
  );
};

export default Pagination;
