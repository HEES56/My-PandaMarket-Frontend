"use client";

import { forwardRef } from "react";
import Image from "next/image";
import VisibilityOn from "@/shared/assets/Img/input-icon/visibility_on.png";
import VisibilityOff from "@/shared/assets/Img/input-icon/visibility_off.png";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  show: boolean;
  toggle: () => void;
}

const Password = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, show, toggle, ...props }, ref) => (
    <div className="relative flex flex-col gap-2 md:gap-4">
      <label className="text-sm md:text-lg font-bold">{label}</label>
      <input
        {...props}
        ref={ref}
        type={show ? "text" : "password"}
        className="bg-custom-input-gray-100 border-4 border-transparent focus:border-custom-color-blue focus:outline-none rounded-xl py-3.5 px-6 w-full"
      />
      <button
        type="button"
        onClick={toggle}
        className={`absolute w-6 right-5 ${
          error ? "bottom-12.5" : "bottom-3.5"
        }`}
      >
        <Image
          src={show ? VisibilityOn : VisibilityOff}
          alt="비밀번호 보기 버튼"
        />
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
);

Password.displayName = "PasswordInput";
export default Password;
