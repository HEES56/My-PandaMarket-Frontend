"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import sortIcon from "@/shared/assets/Img/dropdown-icon/ic_sort.png";
import dropArrow from "@/shared/assets/Img/dropdown-icon/ic_arrow_down.png";

interface ProductSortDropdownProps {
  value: "recent" | "favorites";
  onChange: (value: "recent" | "favorites") => void;
}

const options: { value: "recent" | "favorites"; label: string }[] = [
  { value: "recent", label: "최신순" },
  { value: "favorites", label: "좋아요순" },
];

export default function SortDropDown({
  value,
  onChange,
}: ProductSortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((opt) => opt.value === value)?.label ?? "";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        className="relative group flex justify-center items-center md:justify-between h-[42px] w-[42px] md:w-[130px] border rounded-xl border-custom-button-gray-200 md:px-5 md:py-3 text-nowrap"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Image
          src={sortIcon}
          alt="정렬 아이콘"
          width={24}
          className="block md:hidden w-[24px] object-contain"
        />
        <p className="hidden md:block text-base font-normal">{selectedLabel}</p>
        <Image
          src={dropArrow}
          alt="드롭다운 화살표"
          className="w-[24px] object-contain hidden md:block"
        />
      </button>
      {isOpen && (
        <ul className="absolute md:w-[118px] border border-custom-color-border-gray rounded-xl bg-white right-0 top-14 md:left-0 md:top-14 z-10">
          {options.map(({ value: optionValue, label }) => (
            <li
              key={optionValue}
              className="px-5 py-3 border-b last:border-b-0 border-custom-color-border-gray cursor-pointer hover:bg-custom-gray-50 text-nowrap"
              onClick={(e) => {
                e.stopPropagation();
                onChange(optionValue);
                setIsOpen(false);
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
