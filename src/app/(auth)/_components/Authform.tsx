"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import LogoImg from "@/shared/assets/Img/logo-image/mainLogo.png";
import LogoText from "@/shared/assets/Img/logo-image/mainText.png";
import { useLogin, useSignup } from "@/api/auth/AuthHooks";
import { LoginForm, SignupForm, SignupPayload } from "@/types/types";
import Text from "@/shared/components/input/Text";
import Password from "@/shared/components/input/Password";
import Button, { ButtonCategory } from "@/shared/components/button/Button";
import EasyAuth from "./EasyAuth";

interface AuthFormProps {
  category: "login" | "signup";
}

export default function AuthForm({ category }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const isSignup = category === "signup";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupForm>({
    defaultValues: {
      email: "",
      password: "",
      nickname: "",
      passwordConfirmation: "",
    },
  });

  const loginMutation = useLogin(() => setShowModal(true));
  const signupMutation = useSignup(() => setShowModal(true));

  const isPending =
    category === "login" ? loginMutation.isPending : signupMutation.isPending;

  const onSubmit = (data: SignupForm) => {
    if (isSignup && data.password !== data.passwordConfirmation) {
      setModalMessage("비밀번호가 일치하지 않습니다.");
      setShowModal(true);
      return;
    }

    if (category === "login") {
      const loginData: LoginForm = {
        email: data.email,
        password: data.password,
      };
      loginMutation.mutate(loginData, {
        onError: () => {
          setModalMessage("이메일 또는 비밀번호가 잘못되었습니다.");
          setShowModal(true);
        },
      });
    } else {
      const signupData: SignupPayload = {
        email: data.email,
        password: data.password,
        nickname: data.nickname,
      };
      signupMutation.mutate(signupData, {
        onSuccess: () => {
          setModalMessage("회원가입이 완료되었습니다!");
          setShowModal(true);
        },
        onError: () => {
          setModalMessage("이미 사용 중인 이메일입니다.");
          setShowModal(true);
        },
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <header className="flex gap-3 md:gap-5">
        <Link href="/">
          <Image src={LogoImg} alt="로고" className="w-[52px] md:w-[104px]" />
        </Link>
        <Link href="/" className="flex items-center">
          <Image
            src={LogoText}
            alt="텍스트 로고"
            className="w-[133px] md:w-[266px]"
          />
        </Link>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-white py-6 w-[343px] md:w-[640px] gap-6"
      >
        <Text
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "올바른 이메일 형식을 입력해주세요",
            },
          })}
          error={errors.email?.message}
        />

        {isSignup && (
          <Text
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력해주세요"
            {...register("nickname", {
              required: "닉네임을 입력해주세요",
              minLength: {
                value: 1,
                message: "닉네임은 최소 1자 이상 입력해주세요",
              },
              maxLength: {
                value: 10,
                message: "닉네임은 최대 10자 이상 입력해주세요",
              },
            })}
            error={errors.nickname?.message}
          />
        )}

        <Password
          label="비밀번호"
          show={showPassword}
          placeholder="비밀번호를 입력해주세요"
          toggle={() => setShowPassword(!showPassword)}
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            minLength: {
              value: 8,
              message: "비밀번호는 최소 8자 이상 입력해주세요",
            },
          })}
          error={errors.password?.message}
        />

        {isSignup && (
          <Password
            label="비밀번호 확인"
            show={showConfirm}
            placeholder="비밀번호를 한번 더 입력해주세요"
            toggle={() => setShowConfirm(!showConfirm)}
            {...register("passwordConfirmation", {
              required: "비밀번호를 다시 입력해주세요",
              validate: (val) =>
                val === watch("password") || "비밀번호가 일치하지 않습니다",
            })}
            error={errors.passwordConfirmation?.message}
          />
        )}

        <Button
          type="submit"
          disabled={isPending}
          size="py-3"
          category={
            isPending ? ButtonCategory.ROUND_OFF : ButtonCategory.ROUND_ON
          }
        >
          {category === "login" ? "로그인" : "회원가입"}
        </Button>
      </form>

      <EasyAuth type={category} />

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white py-16 px-12 md:px-16 rounded-lg text-center">
            <p className="text-lg font-medium">{modalMessage}</p>
            <Button
              onClick={() => setShowModal(false)}
              category={ButtonCategory.RECTANGLE_ON}
              size="max-w-[165px] mt-6 px-6 py-3"
            >
              확인
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
