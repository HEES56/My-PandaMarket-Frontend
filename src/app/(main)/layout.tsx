import "@/shared/globals.css";
import { Metadata } from "next";
import Layout from "@/shared/components/Layout/Layout";

export const metadata: Metadata = {
  title: "자유게시판/중고마켓",
  description: "간편하게 로그인하고 중고 거래를 시작해보세요.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
