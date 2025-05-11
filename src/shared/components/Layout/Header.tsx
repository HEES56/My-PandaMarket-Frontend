"use client";
import Image from "next/image";
import Link from "next/link";
import LogoImg from "@/shared/assets/Img/logo-image/mainLogo.png";
import LogoText from "@/shared/assets/Img/logo-image/mainText.png";
import UserBaseIcon from "@/shared/assets/Img/user-icon/ic_profile.png";

import { useAuthStore } from "../../../api/auth/AuthStore";
import Button, { ButtonCategory } from "../button/Button";
import { PATH } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import TabNav from "../tabNav/TabNav";

export default function Header() {
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const showTabs =
    pathname.startsWith(PATH.items) || pathname.startsWith(PATH.community);

  const handleLogout = async () => {
    try {
      clearAuth();
      router.push(PATH.login);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 md:px-8 xl:px-96 border-b bg-white border-gray-200 z-50">
        <div className="flex  md:gap-3 w-full ">
          <Link className="flex  md:gap-3 py-2" href={"/"}>
            <Image
              src={LogoImg}
              alt="판다마켓 홈"
              width={40}
              height={40}
              className="w-10 max-sm:w-0"
            />
            <Image
              src={LogoText}
              alt="판다마켓 홈"
              width={103}
              height={35}
              className="w-28 object-contain"
            />
          </Link>
          {showTabs && <TabNav />}
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Image
                src={UserBaseIcon}
                alt="User Icon"
                className="w-8 h-8 rounded-full "
              />
              <p className="text-nowrap mr-6">{user.nickname}님</p>
            </div>
            <div>
              <Button
                onClick={handleLogout}
                size="py-3 px-4"
                category={ButtonCategory.RECTANGLE_ON}
              >
                로그아웃
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Button
              href={PATH.login}
              size="py-3 px-11"
              category={ButtonCategory.RECTANGLE_ON}
            >
              로그인
            </Button>
          </div>
        )}
      </header>
    </>
  );
}
