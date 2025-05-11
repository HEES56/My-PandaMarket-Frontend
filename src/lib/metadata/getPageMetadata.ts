import { Metadata } from "next";

interface PageMetaOptions {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}

export function getPageMetadata({
  title,
  description = "판다마켓에서 중고 물품을 쉽고 빠르게 거래해보세요.",
  path = "",
  image = "/mainLogo.png",
}: PageMetaOptions): Metadata {
  const fullTitle = `${title} | 판다마켓`;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "판다마켓",
      images: [{ url: image, width: 800, height: 400 }],
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
