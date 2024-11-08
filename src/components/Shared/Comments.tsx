/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDeleteCommentMutation,
  useFindAllCommentQuery,
} from "@/redux/api/commentApi";
import { TComment, TUser } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Comments = ({ postId, user }: { postId: string; user: TUser | null }) => {
  const { data } = useFindAllCommentQuery(postId);
  const [deleteComment, { isLoading: isCommentDeleting }] =
    useDeleteCommentMutation();
  const [comments, setComments] = useState<TComment[]>();
  const [deleteItems, setDeleteItems] = useState("");

  useEffect(() => {
    if (data?.success) {
      setComments(data?.data);
    }
  }, [data]);

  const handleCommentDelete = async (commentId: string) => {
    setDeleteItems(commentId);
    try {
      const res = await deleteComment({
        postId: postId,
        commentId: commentId,
      }).unwrap();
      if (res?.success && res?.data?.deletedCount > 0) {
        toast.success(res.message || "comment delete Success");
      }
    } catch (err: any) {
      toast.error(err.message || "comment delete failed !!!");
    }
  };

  return (
    <>
      {comments && comments.length > 0 && (
        <div className="mt-5 space-y-3">
          <p>Comments</p>
          <hr />
          <div className="space-y-2">
            {comments.map((comment) => (
              <div
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
                key={comment._id}
              >
                <div className="flex gap-4 items-center">
                  <Link
                    href={`/profile/${comment.author._id}`}
                    className="text-blue-700 underline"
                  >
                    <Image
                      width={100}
                      height={100}
                      src={comment.author.img}
                      alt={`${comment.author.name} img`}
                      className="h-[40px] w-[40px] rounded-full"
                    />
                  </Link>
                  <p className="flex flex-col">
                    <Link
                      href={`/profile/${comment.author._id}`}
                      className="text-blue-700 underline"
                    >
                      {comment.author.name}
                    </Link>{" "}
                    <span className="text-sm">{comment.content}</span>
                  </p>
                </div>
                <p>
                  {user && user._id === comment.author._id && (
                    <p
                      onClick={() => handleCommentDelete(comment._id)}
                      className="text-red-500"
                    >
                      {isCommentDeleting && deleteItems === comment._id ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-4 text-red-500 cursor-pointer"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </p>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
