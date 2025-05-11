import { PATH } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export enum TabActive {
  ON = "on",
  OFF = "off",
}

const TabColorStyle = {
  [TabActive.ON]: "text-custom-gray-800",
  [TabActive.OFF]: "text-custom-gray-500",
};

export interface TabItem {
  label: string;
  href: string;
}

export const TABS: TabItem[] = [
  { label: "자유게시판", href: PATH.community },
  { label: "중고마켓", href: PATH.items },
];

export default function TabNav() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-center ">
      {TABS.map(({ label, href }) => {
        const isActive = pathname === href;
        const tabColor = TabColorStyle[isActive ? TabActive.ON : TabActive.OFF];

        return (
          <Link
            key={href}
            href={href}
            className={`px-3 md:px-4 py-3 text-base md:text-lg text-nowrap ${tabColor} ${
              isActive ? "font-bold " : ""
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
