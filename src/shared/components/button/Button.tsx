import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";

export enum ButtonCategory {
  RECTANGLE_ON = "rectangleOn",
  RECTANGLE_OFF = "rectangleOff",
  ROUND_ON = "roundOn",
  ROUND_OFF = "roundOff",
  DELETE_MODAL_YES = "deleteModalYes",
  DELETE_MODAL_NO = "deleteModalNo",
}

const ButtonPreset = {
  [ButtonCategory.RECTANGLE_ON]: {
    className:
      "text-sm md:text-base  text-nowrap font-semibold text-white bg-custom-color-blue rounded-lg",
  },
  [ButtonCategory.RECTANGLE_OFF]: {
    className:
      "text-sm md:text-base  text-nowrap font-semibold text-white bg-custom-text-gray-50 rounded-lg",
  },
  [ButtonCategory.ROUND_ON]: {
    className:
      "text-base md:text-xl  text-nowrap font-semibold text-white bg-custom-color-blue rounded-[2.5rem]",
  },
  [ButtonCategory.ROUND_OFF]: {
    className:
      "text-base md:text-xl  text-nowrap text-white  font-semibold text-nowrap bg-custom-text-gray-50 rounded-[2.5rem] border-1 border-custom-gray-800",
  },
  [ButtonCategory.DELETE_MODAL_YES]: {
    className:
      "text-base font-semibold  text-nowrap text-white bg-custom-color-red rounded-lg",
  },
  [ButtonCategory.DELETE_MODAL_NO]: {
    className:
      "text-base font-semibold text-nowrap text-custom-color-red bg-white border border-custom-color-red  rounded-lg",
  },
};

type AnchorProps = {
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type NativeButtonProps = {
  href?: never;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type CommonProps = {
  category: ButtonCategory;
  size?: string;
  children?: ReactNode;
};

export type ButtonProps = CommonProps & (AnchorProps | NativeButtonProps);

export default function Button({
  category,
  size = "py-1 px-4",
  children,
  ...props
}: ButtonProps) {
  const baseStyle = `w-full  justify-center items-center cursor-pointer`;
  const preset = ButtonPreset[category];
  const finalStyle = `${baseStyle} ${preset.className} ${size} `;

  const Content = <>{children}</>;

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;

    return (
      <Link href={href} className={finalStyle} {...linkProps}>
        {Content}
      </Link>
    );
  }
  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={finalStyle} {...buttonProps}>
      {Content}
    </button>
  );
}
