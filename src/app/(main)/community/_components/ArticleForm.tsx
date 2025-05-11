"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import PlusIcon from "@/shared/assets/Img/input-icon/ic_plus.png";
import CloseIcon from "@/shared/assets/Img/button-image/X-round-Icon.png.png";
import { useCreateArticle, useUpdateArticle } from "@/api/article/articleHook";
import { Article } from "@/types/types";
import ImageWrapper from "@/shared/components/ImageWrapper/ImageWrapper";

interface ArticleFormProps {
  category: "create" | "edit";
  initialData?: Article;
}

export default function ArticleForm({
  category,
  initialData,
}: ArticleFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>(
    initialData?.imageUrls || []
  );
  const [newImages, setNewImages] = useState<File[]>([]);

  const createMutation = useCreateArticle((id) =>
    router.push(`/community/${id}`)
  );
  const updateMutation = useUpdateArticle((id) =>
    router.push(`/community/${id}`)
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setNewImages((prev) => [...prev, ...files]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    newImages.forEach((file) => {
      formData.append("images", file);
    });

    existingImageUrls.forEach((url) => {
      formData.append("imageUrls", url);
    });

    if (category === "create") {
      createMutation.mutate(formData);
    } else if (category === "edit" && initialData?.id) {
      updateMutation.mutate({ id: initialData.id, formData });
    }
  };

  const removeExistingImage = (index: number) => {
    setExistingImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-[200px]">
      <section className="flex justify-between">
        <h1 className="text-xl font-bold text-custom-text-black-800">
          {category === "create" ? "게시글 쓰기" : "게시글 수정"}
        </h1>
        <button
          type="submit"
          className="px-6 py-2 bg-custom-color-blue text-white font-semibold rounded-lg"
        >
          {category === "create" ? "등록" : "수정"}
        </button>
      </section>

      <section>
        <label className="text-lg font-bold text-custom-text-black-800">
          *제목
        </label>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-6 py-4 bg-custom-input-gray-100 rounded-xl focus:outline-none"
        />
      </section>

      <section>
        <label className="text-lg font-bold text-custom-text-black-800">
          *내용
        </label>
        <textarea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[240px] px-6 py-4 bg-custom-input-gray-100 rounded-xl resize-none focus:outline-none"
        />
      </section>

      <section>
        <label className="text-lg font-bold text-custom-text-black-800">
          *이미지
        </label>

        <div className="mt-4 flex items-start gap-4 flex-wrap">
          {existingImageUrls.length + newImages.length < 3 && (
            <label className="flex flex-col items-center justify-center w-[120px] h-[120px] bg-custom-input-gray-100 rounded-md cursor-pointer shrink-0">
              <Image src={PlusIcon} alt="이미지 추가" width={32} height={32} />
              <p className="text-xs text-gray-400 mt-1">이미지 등록</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}

          {existingImageUrls.map((url, i) => (
            <div key={`existing-${i}`} className="relative w-24 h-24">
              <ImageWrapper
                src={url}
                alt={`기존이미지-${i}`}
                fill
                className="object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={() => removeExistingImage(i)}
                className="absolute -top-2 -right-2"
              >
                <Image src={CloseIcon} alt="닫기" width={20} height={20} />
              </button>
            </div>
          ))}

          {newImages.map((file, i) => (
            <div key={`new-${i}`} className="relative w-24 h-24">
              <Image
                src={URL.createObjectURL(file)}
                alt={`새이미지-${i}`}
                fill
                className="object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={() => removeNewImage(i)}
                className="absolute -top-2 -right-2"
              >
                <Image src={CloseIcon} alt="닫기" width={20} height={20} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </form>
  );
}
