"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import kebabIcon from "@/shared/assets/Img/dropdown-icon/ic_kebab.png";
import CheckIcon from "@/shared/assets/Img/modal-icon/ic_check.png";
import { deleteArticle } from "@/api/article/articleApi";
import { deleteProduct } from "@/api/product/productApi";

interface SelectorProps {
  id: string;
  type: "article" | "product" | "comment";
  onDelete?: () => void;
  onEdit?: () => void;
}

export default function Selector({
  id,
  type,
  onDelete,
  onEdit,
}: SelectorProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      if (type === "article") {
        await deleteArticle({ id });
        router.push("/article");
      } else if (type === "product") {
        await deleteProduct(id);
        router.push("/items");
      } else {
        onDelete?.();
      }
    } catch (error) {
      console.error(error);
      alert("삭제에 실패했습니다.");
    } finally {
      setShowModal(false);
      setIsOpen(false);
      setIsDeleting(false);
    }
  };

  const handleModify = () => {
    if (type === "article") {
      router.push(`/community/${id}/modify`);
    } else if (type === "product") {
      router.push(`/items/${id}/modify`);
    } else {
      onEdit?.();
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <Image src={kebabIcon} alt="옵션" className="w-[24px] object-contain" />
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 w-[102px] md:w-[139px] border border-custom-color-border-gray rounded-xl bg-white z-10">
          <li
            className="px-5 py-3 text-nowrap text-center border-b border-custom-color-border-gray cursor-pointer"
            onClick={handleModify}
          >
            수정하기
          </li>
          <li
            className="px-5 py-3 text-nowrap text-center cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            삭제하기
          </li>
        </ul>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg text-center">
            <Image
              src={CheckIcon}
              alt="삭제 모달 아이콘"
              width={24}
              height={24}
            />
            <p className="text-lg mb-4">정말 삭제하시겠습니까?</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-8 py-3 border border-custom-color-red text-custom-color-red rounded-lg"
                onClick={() => setShowModal(false)}
              >
                취소
              </button>
              <button
                className="px-8 py-3 bg-custom-color-red text-white rounded-lg"
                onClick={handleDelete}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
