"use client";

import { useGetAProductQuery } from "@/redux/api/postsApi";
import PostCard from "../Shared/PostCard";

const PostDetails = ({ token, postId }: { token: string; postId: string }) => {
  const { data, isLoading } = useGetAProductQuery(postId);
  if (isLoading) {
    return <p className="text-center ">Loading</p>;
  }
  return (
    <div className="mt-5">
      {/* / */}
      <PostCard comment={true} token={token} data={data.data} />
      {/* / */}
    </div>
  );
};

export default PostDetails;
