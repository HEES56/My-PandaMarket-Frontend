"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import DefaultImg from "@/shared/assets/Img/base-image/baseImg.png";
import { getImageUrl } from "@/lib/utill";

interface ImageWrapperProps extends Omit<ImageProps, "src"> {
  src?: string | null;
}

export default function ImageWrapper({
  src,
  alt,
  ...props
}: ImageWrapperProps) {
  const [imgSrc, setImgSrc] = useState(getImageUrl(src));

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(DefaultImg.src)}
      {...props}
    />
  );
}
