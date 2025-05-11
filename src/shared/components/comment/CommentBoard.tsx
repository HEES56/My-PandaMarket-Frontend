import Image from "next/image";
import replyImg from "@/shared/assets/Img/base-image/Img_reply_empty.png";
import inquireImg from "@/shared/assets/Img/base-image/none_inquire.png";
import backIcon from "@/shared/assets/Img/button-image/ic_back.png";
import CommentItem from "./CommentItem";
import { Comment } from "@/types/types";
import Link from "next/link";

interface CommentBoardProps {
  comments: Comment[];
  editingId: string | null;
  editContent: string;
  setEditContent: (content: string) => void;
  onEdit: (id: string, content: string) => void;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
  type: "article" | "product";
}

export default function CommentBoard({
  comments,
  editingId,
  editContent,
  setEditContent,
  onEdit,
  onUpdate,
  onDelete,
  onCancel,
  type,
}: CommentBoardProps) {
  const isProduct = type === "product";
  const noCommentsImage = isProduct ? inquireImg : replyImg;
  const noCommentsText = isProduct
    ? ""
    : "아직 댓글이 없어요. \n지금 댓글을 남겨보세요!";

  if (!Array.isArray(comments) || comments.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center">
          <Image src={noCommentsImage} alt="댓글 없음" width={140} />
          <p className="text-base text-center text-custom-text-gray-50">
            {noCommentsText.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
        <section className="flex justify-center mt-6">
          <Link
            href={isProduct ? "/items" : "/community"}
            className="flex items-center px-6 py-2 gap-2 text-nowrap bg-custom-color-blue text-lg text-white font-semibold rounded-4xl"
          >
            <p>목록으로 돌아가기</p>
            <Image
              src={backIcon}
              alt="back Icon"
              width={24}
              className="pt-1 object-contain"
            />
          </Link>
        </section>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isEditing={editingId === comment.id}
          editContent={editContent}
          setEditContent={setEditContent}
          onEdit={() => onEdit(comment.id, comment.content)}
          onUpdate={() => onUpdate(comment.id)}
          onDelete={() => onDelete(comment.id)}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
}
