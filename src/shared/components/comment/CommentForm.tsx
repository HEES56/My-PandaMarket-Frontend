"use client";

import { useState } from "react";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  type: "article" | "product";
}

export default function CommentForm({ onSubmit, type }: CommentFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content.trim());
    setContent("");
  };

  const placeholder =
    type === "product"
      ? "개인정보를 공유 및 요청하거나 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
      : "댓글을 입력해주세요.";

  const labelText = type === "product" ? "문의 작성" : "댓글 작성";
  const buttonText = type === "product" ? "문의 등록" : "댓글 등록";

  return (
    <div className="flex flex-col gap-3">
      <p className="text-base font-semibold text-custom-text-black-900">
        {labelText}
      </p>
      <div className="flex flex-col items-end">
        <textarea
          placeholder={placeholder}
          className="w-full h-[104px] px-[24px] py-[16px] bg-custom-input-gray-100 rounded-xl focus:outline-none resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className={`mt-2 px-6 py-2 text-base font-semibold text-white rounded-lg ${
            !content.trim()
              ? "bg-custom-text-gray-50 cursor-not-allowed"
              : "bg-custom-color-blue"
          }`}
          onClick={handleSubmit}
          disabled={!content.trim()}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
