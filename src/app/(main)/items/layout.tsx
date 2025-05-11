"use client";
import "@/shared/globals.css";

export default function ItemsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pt-24 px-3.5 md:px-6 lg:px-20 xl:px-40 2xl:px-96 pb-56">
      {children}
    </div>
  );
}
