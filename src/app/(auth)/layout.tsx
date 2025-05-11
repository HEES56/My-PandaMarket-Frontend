import "@/shared/globals.css";
import ClientLayout from "@/shared/components/Layout/ClientLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인/회원가입",
  description: "간편하게 로그인하고 중고 거래를 시작해보세요.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayout>{children}</ClientLayout>;
}
