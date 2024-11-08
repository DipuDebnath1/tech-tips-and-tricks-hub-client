"use client";
import { useGetMyPostAllQuery } from "@/redux/api/postsApi";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import { TPost } from "@/utils/types";

const PostContent = ({ token }: { token: string }) => {
  const { data, isLoading } = useGetMyPostAllQuery(token);
  const [posts, setAllPost] = useState<TPost[]>([]);

  useEffect(() => {
    if (data?.success) {
      setAllPost(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <>loading all Post</>;
  }

  return (
    <div>
      {/* PostCard */}
      <div className="space-y-10 py-5">
        {posts && posts.length > 0 ? (
          posts.map((post, i) => <PostCard token={token} data={post} key={i} />)
        ) : (
          <div>
            <p className="text-center">not post here ...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostContent;
