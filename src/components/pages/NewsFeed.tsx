/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { TPost } from "@/utils/types";
import PostCard from "../Shared/PostCard";
import { useCallback, useEffect, useState } from "react";
import { allCategory } from "@/utils/const-data/category";
import { useGetAllPostsQuery } from "@/redux/api/postsApi";

const NewsFeed = ({ token }: { token: string }) => {
  const [category, setCategory] = useState("");
  const { data, isLoading } = useGetAllPostsQuery(category);
  const [posts, setPosts] = useState<TPost[]>([]);

  useEffect(() => {
    if (Array.isArray(data?.data)) {
      setPosts(data.data);
    }
  }, [data, isLoading]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (Array.isArray(data?.data)) {
        setPosts((prevPosts) => {
          return [...prevPosts, ...data.data];
        });
      }
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [data, handleScroll]);

  if (isLoading) {
    return <div className="text-center text-4xl">Loading</div>;
  }

  return (
    <div className="flex">
      {/* allCategory */}
      <div className="border-r w-1/4">
        <div className="sticky space-y-2 top-[6rem] bg-white pr-5 rounded">
          <h2 className="text-xl font-semibold">Category :</h2>
          <div className="space-y-2">
            {allCategory.map((item, i) => (
              <p
                onClick={() => setCategory(item)}
                key={i}
                className={`bg-gray-100 py-2 pl-5 rounded cursor-pointer ${
                  category === item && "border-l-4 border-blue-900 border"
                }`}
              >
                {item}
              </p>
            ))}
            <p
              onClick={() => setCategory("")}
              className={`bg-gray-100 py-2 pl-5 rounded cursor-pointer ${
                category === "" && "border-l-4 border-blue-900 border"
              }`}
            >
              All
            </p>
          </div>
        </div>
      </div>
      {/* PostCard */}
      <div className="space-y-10 py-5 w-3/4">
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

export default NewsFeed;
