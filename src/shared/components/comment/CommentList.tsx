"use client";

import { useState, useEffect, useCallback } from "react";

import CommentBoard from "./CommentBoard";
import {
  getComments,
  postComment,
  updateComment,
  deleteComment,
} from "@/api/comment/commentApi";
import CommentForm from "./CommentForm";
import { Comment } from "@/types/types";

interface CommentListProps {
  type: "article" | "product";
  targetId: string;
}

export default function CommentList({ type, targetId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      const data = await getComments(type, targetId);
      setComments(data);
    } catch (error) {
      console.error("댓글 가져오기 실패:", error);
      setComments([]);
    }
  }, [type, targetId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleEdit = (commentId: string, content: string) => {
    setEditingId(commentId);
    setEditContent(content);
  };

  const handleUpdate = async (commentId: string) => {
    await updateComment(commentId, editContent);
    setEditingId(null);
    fetchComments();
  };

  const handleDelete = async (commentId: string) => {
    if (deletingId) return;
    setDeletingId(commentId);
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleSubmit = async (content: string) => {
    await postComment(type, targetId, content);
    fetchComments();
  };

  return (
    <div className="flex flex-col gap-10">
      <CommentForm type={type} onSubmit={handleSubmit} />
      <CommentBoard
        type={type}
        comments={comments}
        editingId={editingId}
        editContent={editContent}
        setEditContent={setEditContent}
        onEdit={handleEdit}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onCancel={() => setEditingId(null)}
      />
    </div>
  );
}
