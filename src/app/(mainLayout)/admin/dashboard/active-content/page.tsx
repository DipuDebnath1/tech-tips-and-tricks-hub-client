"use client";

import AdminPostCard from "@/components/pages/admin/AdminPostCard";
import { useGetAllPostsQuery } from "@/redux/api/postsApi";
import { allCategory } from "@/utils/const-data/category";
import { TPost } from "@/utils/types";
import { useEffect, useState } from "react";

const ManageContent = () => {
  const [category, setCategory] = useState("");
  const { data, isLoading } = useGetAllPostsQuery(category);
  const [posts, setPosts] = useState<TPost[]>([]);

  useEffect(() => {
    if (Array.isArray(data?.data)) {
      setPosts(data.data);
    }
  }, [data, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">loading . . .</div>
    );
  }

  const handleFilterCategory = (category: string) => {
    console.log(category);
    setCategory(category);
  };
  return (
    <>
      {/* post manage header  */}
      <div className="flex items-center justify-center gap-10 sticky top-[81px] border-b z-30 bg-white p-3">
        <div>
          <label htmlFor="category">Filter Content : </label>
          <select
            className=" bg-gray-200 p-2"
            onChange={(e) => handleFilterCategory(e.target.value)}
            name="category"
            id="category"
          >
            <option value="">All Content</option>
            {allCategory.map((category, i) => (
              <option value={category} key={i}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <h3 className="font-semibold">Active Content {posts.length}</h3>
      </div>
      {/* PostCard */}
      <div className="space-y-10 py-5 w-3/4 mx-auto">
        {posts && posts.length > 0 ? (
          posts.map((post, i) => <AdminPostCard data={post} key={i} />)
        ) : (
          <div>
            <p className="text-center">not post here ...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageContent;
