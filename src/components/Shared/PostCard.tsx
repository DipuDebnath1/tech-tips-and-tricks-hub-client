/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TPost, TUser } from "@/utils/types";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { TokenDecode } from "@/utils/tokenDecode";
import { useDownVotesMutation, useUpVotesMutation } from "@/redux/api/postsApi";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Comments from "./Comments";
import { useAddCommentMutation } from "@/redux/api/commentApi";

const PostCard = ({
  data,
  token,
  comment,
}: {
  data: TPost;
  token?: any;
  comment?: true;
}) => {
  const [user, setUser] = useState<TUser>();
  const [post, setPost] = useState<TPost>(data);
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false);
  const router = useRouter();

  const [upVote] = useUpVotesMutation();
  const [downVote] = useDownVotesMutation();
  const [addComment, { isLoading }] = useAddCommentMutation();

  useEffect(() => {
    const data = TokenDecode(token);
    if (data) {
      setUser(data);
    }
  }, [token]);

  useEffect(() => {
    setPost(data);
  }, [data]);

  // check voted
  const isVoted = (allVote: any) => {
    const voted = allVote.find((item: any) => item === user?._id);
    return voted ? true : false;
  };

  // handle upVote
  const handleUpVote = async (postId: string) => {
    if (!user) {
      toast.error("please Login first");
      return router.push("/login");
    }
    try {
      const updateUpVote = [...post.upVotes, user._id];
      const updateDownVote = post.downVotes.filter((item) => item !== user._id);
      setPost({
        ...post,
        upVotes: [...updateUpVote],
        downVotes: [...updateDownVote],
      });
      await upVote(postId);
    } catch (err: any) {
      toast.error(err.message || "upVote Failed !!!");
    }
  };

  // handle downVote
  const handleDownVote = async (postId: string) => {
    if (!user) {
      toast.error("please Login first");
      return router.push("/login");
    }
    try {
      const updateDownVote = [...post.downVotes, user._id];
      const updateUpVote = post.upVotes.filter((item) => item !== user._id);
      setPost({
        ...post,
        downVotes: [...updateDownVote],
        upVotes: [...updateUpVote],
      });
      downVote(postId);
    } catch (err: any) {
      toast.error(err.message || "upVote Failed !!!");
    }
  };

  // handleShowCommentBox
  const handleShowCommentBox = () => {
    if (!user) {
      return router.push("/login");
    }
    setShowCommentBox(!showCommentBox);
  };

  const handleAddComment = async (e: any) => {
    e.preventDefault();
    if (!user) {
      return router.push("/login");
    }
    const content = e.target.addComment.value;
    try {
      const res = await addComment({ content, post: post?._id });
      if (res.data.success) {
        console.log(res.data);
        e.target.addComment.value = "";
        setShowCommentBox(!showCommentBox);
      }
    } catch (err: any) {
      toast.error(err.message || "comment add failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 border bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative">
      {post.isPremium && (
        <p
          className="absolute top-2 right-2  bg-orange-600 p-1 px-2 rounded text-white text-sm"
          style={{ letterSpacing: "1px" }}
        >
          Premium
        </p>
      )}
      <div className="flex items-center mb-4">
        <Link href={`/profile/${post.author._id}`}>
          <Image
            src={post.author.img}
            alt={`${post.author.name}'s profile`}
            className="w-[60px] h-[60px] rounded-full object-cover border-2 cursor-pointer"
            width={48}
            height={48}
          />
        </Link>
        <div className="ml-4">
          <Link href={`/profile/${post.author._id}`}>
            <h2 className="text-xl font-semibold cursor-pointer">
              {post.author.name}
            </h2>
          </Link>
          <p className="text-gray-500">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
      {!comment ? (
        <p className="text-gray-700 mb-4">{post.content.slice(0, 70)} ...</p>
      ) : (
        <p className="text-gray-700 mb-4">{post.content}</p>
      )}
      {post.images && (
        <div className="mb-4">
          <Link href={`/postDetails/${post._id}`}>
            <Image
              src={post.images}
              alt="post image"
              className="w-full rounded-lg cursor-pointer"
              width={500}
              height={300}
              layout="responsive"
            />
          </Link>
        </div>
      )}
      {/* upVotes */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-500 gap-2">
          {user && isVoted(post.upVotes) ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-blue-500"
              >
                <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
              </svg>
            </>
          ) : (
            <>
              <svg
                onClick={() => handleUpVote(post._id)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>
            </>
          )}
          {post.upVotes.length > 0 && post.upVotes.length}

          {/* Down Votes */}
          {user && isVoted(post.downVotes) ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-blue-500"
            >
              <path d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
            </svg>
          ) : (
            <svg
              onClick={() => handleDownVote(post._id)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
              />
            </svg>
          )}
          {post.downVotes.length > 0 && post.downVotes.length}
        </div>
        <div className="flex items-center gap-2  text-gray-500">
          <svg
            onClick={handleShowCommentBox}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          <Link href={`/postDetails/${post._id}`}>
            {post.comments > 0 && post.comments}
          </Link>
        </div>
      </div>

      {/* comment box  */}
      {showCommentBox && (
        <form onSubmit={handleAddComment}>
          <div className="flex justify-between items-start pt-5 gap-5">
            <textarea
              name="addComment"
              placeholder="comment ..."
              className="outline-none p-2 border w-full"
              id=""
              required
            ></textarea>
            <button className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600">
              {isLoading ? "posting" : "post"}
            </button>
          </div>
        </form>
      )}
      {comment && (
        <div>
          <Comments postId={post._id} user={user as TUser} />
        </div>
      )}
    </div>
  );
};

export default PostCard;
