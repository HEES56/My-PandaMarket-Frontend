"use client";

import { forwardRef } from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Text = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, ...props }, ref) => (
    <div className="flex flex-col gap-2 md:gap-4">
      <h2 className="text-sm md:text-lg font-bold">{label}</h2>
      <input
        {...props}
        ref={ref}
        className="bg-custom-input-gray-100 border-4 border-transparent focus:border-custom-color-blue focus:outline-none rounded-xl py-3.5 px-6 w-full"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
);

Text.displayName = "TextInput";
export default Text;
