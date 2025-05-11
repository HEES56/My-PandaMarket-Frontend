"use client";

import Image from "next/image";
import { Product } from "@/types/types";
import { formatDay, getImageUrl } from "@/lib/utill";

import Selector from "@/shared/components/dropDown/Selector";
import userIcon from "@/shared/assets/Img/user-icon/ic_profile.png";
import likeIcon from "@/shared/assets/Img/button-image/Like_Icon.png";
import { useAuthStore } from "@/api/auth/AuthStore";
import { useLikeProduct, useUnlikeProduct } from "@/api/product/productHooks";

interface DetailProductBoardProps {
  product: Product & {
    isLiked?: boolean;
    favoriteCount?: number;
  };
}

export default function DetailProductBoard({
  product,
}: DetailProductBoardProps) {
  const { user } = useAuthStore();

  const likeMutation = useLikeProduct(product.id);
  const unlikeMutation = useUnlikeProduct(product.id);

  const handleLike = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (product.isLiked) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  const handleEdit = () => {
    window.location.href = `/items/${product.id}/modify`;
  };

  const handleDelete = () => {
    window.location.href = "/items";
  };

  return (
    <div className="flex flex-col md:flex-row items-center  gap-6 border-b border-custom-color-border-gray pb-6">
      <div className="flex justify-center items-center w-[343px] xl:w-[486px]  bg-gray-100 rounded-xl overflow-hidden">
        <Image
          src={getImageUrl(product.imageUrls?.[0])}
          alt={product.name}
          width={300}
          height={300}
          className="object-contain"
        />
      </div>

      <div className="flex flex-col flex-1 gap-6">
        <section className="flex justify-between items-start">
          <h2
            className="text-base md:text-xl xl:text-2xl
           font-semibold text-custom-text-black-800"
          >
            {product.name}
          </h2>
          <Selector
            type="product"
            id={product.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>

        <p className="text-2xl md:text-3xl xl:text-5xl font-bold text-custom-text-black-800 border-b border-custom-color-border-gray pb-6">
          {product.price?.toLocaleString()}원
        </p>

        <div className="flex flex-col gap-3.5">
          <h3 className="text-base font-bold text-custom-text-gray-400">
            상품 소개
          </h3>
          <p className="text-sm text-custom-text-gray-400 whitespace-pre-line mt-1">
            {product.description}
          </p>
        </div>

        {product.tags?.length > 0 && (
          <div className="flex flex-col gap-3.5">
            <h3 className="text-base font-bold text-custom-text-gray-400">
              상품 태그
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-sm px-3 py-1 rounded-full bg-custom-input-gray-100 text-custom-text-black-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src={userIcon} alt="작성자" width={40} height={40} />
            <div className="flex flex-col gap-0.5">
              <p className="text-sm text-custom-text-gray-400">
                {product.user?.nickname ?? "익명 판다"}
              </p>
              <p className="text-sm text-custom-text-gray-50">
                {formatDay(product.createdAt)}
              </p>
            </div>
          </div>

          <button
            onClick={handleLike}
            className="flex items-center gap-1 border border-custom-color-border-gray px-4 py-1 rounded-full"
          >
            <Image src={likeIcon} alt="좋아요" width={20} height={20} />
            <p className="text-sm text-custom-text-gray-200">
              {product.favoriteCount ?? 0}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
