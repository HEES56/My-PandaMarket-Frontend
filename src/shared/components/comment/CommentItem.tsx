import Image from "next/image";
import userIcon from "@/shared/assets/Img/user-icon/ic_profile.png";

import Selector from "@/shared/components/dropDown/Selector";
import { fromNow } from "@/lib/utill";
import Button, { ButtonCategory } from "../button/Button";
import { Comment } from "@/types/types";

interface CommentItemProps {
  comment: Comment;
  isEditing: boolean;
  editContent: string;
  setEditContent: (text: string) => void;
  onEdit: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

export default function CommentItem({
  comment,
  isEditing,
  editContent,
  setEditContent,
  onEdit,
  onUpdate,
  onDelete,
  onCancel,
}: CommentItemProps) {
  return (
    <div className="flex flex-col w-full gap-6 bg-custom-color-list-gray border-b border-custom-color-border-gray pb-[12px]">
      <section className="flex justify-between gap-[24px]">
        {isEditing ? (
          <>
            <div className="flex justify-between w-full">
              <textarea
                value={editContent}
                placeholder="수정 내용을 입력해주세요"
                onChange={(e) => setEditContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onUpdate();
                  }
                }}
                className="text-sm font-normal w-full bg-custom-color-list-gray px-2 py-1 focus:outline-none resize-none"
                rows={3}
              />
              <div className="flex h-[45px] gap-1.5 ">
                <Button
                  category={ButtonCategory.RECTANGLE_ON}
                  size="sm py- px-2 "
                  onClick={onUpdate}
                  disabled={!editContent.trim()}
                >
                  수정하기
                </Button>
                <Button
                  category={ButtonCategory.RECTANGLE_OFF}
                  size="sm py-2  px-2"
                  onClick={onCancel}
                >
                  취소하기
                </Button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm font-normal text-custom-text-black-800">
            {comment.content}
          </p>
        )}
        {!isEditing && (
          <Selector
            type="comment"
            id={comment.id}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </section>

      <section className="flex gap-2">
        <Image
          src={userIcon}
          className="w-[32px] object-contain"
          alt="user Icon"
        />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-custom-text-gray-400">
            {comment.user?.nickname ?? "익명 판다"}
          </p>
          <p className="text-xs font-normal text-custom-text-gray-50">
            {fromNow(comment.createdAt)}
          </p>
        </div>
      </section>
    </div>
  );
}
