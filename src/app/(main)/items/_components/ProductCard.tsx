"use client";

import Image from "next/image";
import LikeIcon from "@/shared/assets/Img/button-image/Like_Icon.png";
import { Product } from "@/types/types";
import Link from "next/link";
import { getImageUrl } from "@/lib/utill";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/items/${product.id}`}
      className="flex flex-col w-full max-w-[343px]  border border-custom-color-border-gray bg-white  rounded-lg  "
    >
      <div className="relative w-full aspect-[1/1] bg-gray-100">
        <Image
          src={getImageUrl(product.imageUrls?.[0])}
          alt={product.name}
          width={200}
          height={150}
          unoptimized
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-custom-text-black-900">
          {product.name}
        </h3>
        <p className="text-base text-custom-text-black-800 font-medium">
          {(product.price ?? 0).toLocaleString()}원
        </p>
        <div className="flex items-center gap-2">
          <Image
            src={LikeIcon}
            alt="like icon"
            width={16}
            height={16}
            className="w-4 h-4"
          />
          <span className="text-sm text-custom-text-gray-400">
            {product.favoriteCount ?? 0}
          </span>
        </div>
      </div>
    </Link>
  );
}
