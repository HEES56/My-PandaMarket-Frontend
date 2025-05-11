import type { Metadata } from "next";
import "@/shared/globals.css";

export const metadata: Metadata = {
  title: "판다마켓",
  description: "당신을 위한 중고마켓 지금 만나보세요",
  icons: {
    icon: "/mainLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
