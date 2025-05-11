"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "@/api/auth/AuthStore";
import KakaoIcon from "@/shared/assets/Img/login-icon/kakaoIcon.png";
import GoogleIcon from "@/shared/assets/Img/login-icon/googleIcon.png";
import Image from "next/image";
import Link from "next/link";
import { PATH } from "@/constants";
import { useRouter } from "next/navigation";
import { googleLoginAPI } from "@/api/auth/AuthApi";

interface EasyAuthProps {
  type: "login" | "signup";
}

export default function EasyAuth({ type }: EasyAuthProps) {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const login = useGoogleLogin({
    flow: "auth-code",

    onSuccess: async (res) => {
      const code = res.code;
      if (!code) {
        console.error("code가 없습니다");
        return;
      }

      try {
        const data = await googleLoginAPI(code);
        setAuth(data.user);
        localStorage.setItem("accessToken", data.accessToken);
        router.back();
      } catch (error) {
        console.error("Google 로그인 실패", error);
      }
    },
    onError: () => {
      console.error("Google 로그인 실패");
    },
  });

  return (
    <div className="flex flex-col w-[343px] md:w-[640px] rounded-lg gap-6">
      <section className="flex justify-between items-center w-full rounded-lg bg-custom-color-bg-cool-blue py-4 px-6">
        <p className="text-base font-medium text-custom-text-black-800">
          간편 로그인하기
        </p>
        <div className="flex gap-4">
          <button onClick={() => login()}>
            <Image
              src={GoogleIcon}
              alt="구글 로그인"
              className="w-10 object-contain"
            />
          </button>
          <Image
            src={KakaoIcon}
            alt="카카오 로그인"
            className="w-10 object-contain"
          />
        </div>
      </section>

      <section className="flex justify-center gap-1">
        {type === "login" ? (
          <>
            <p className="text-sm font-medium text-custom-text-black-800">
              판다마켓이 처음이신가요?
            </p>
            <Link
              href={PATH.signup}
              className="text-sm font-medium text-custom-color-blue underline"
            >
              회원가입
            </Link>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-custom-text-black-800">
              이미 회원이신가요?
            </p>
            <Link
              href={PATH.login}
              className="text-sm font-medium text-custom-color-blue underline"
            >
              로그인
            </Link>
          </>
        )}
      </section>
    </div>
  );
}
