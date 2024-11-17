/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { TPost, TUser } from "@/utils/types";
import PostCard from "../Shared/PostCard";
import { useCallback, useEffect, useState } from "react";
import { allCategory } from "@/utils/const-data/category";
import { useGetAllPostsQuery } from "@/redux/api/postsApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setToken } from "@/redux/userSlice";
import { useGetAllUserQuery } from "@/redux/api/adminApi";
import Image from "next/image";
import Link from "next/link";

const NewsFeed = ({ token }: { token: string }) => {
  const [category, setCategory] = useState("");
  const { data, isLoading } = useGetAllPostsQuery(category);
  const { data: usersData } = useGetAllUserQuery("");
  const [posts, setPosts] = useState<TPost[]>([]);
  const [users, setUsers] = useState<TUser[]>([]);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice.user);

  if (token) {
    dispatch(setToken(token));
  }

  // postData
  useEffect(() => {
    if (Array.isArray(usersData?.data)) {
      setUsers(usersData.data);
    }
  }, [usersData]);
  // userData
  useEffect(() => {
    if (Array.isArray(data?.data)) {
      setPosts(data.data);
    }
  }, [users]);

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
      {/* sidebar menu icon open  */}
      <div className="lg:hidden block fixed top-[6rem] left-5 z-30">
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="size-8 cursor-pointer bg-white p-1 rounded border"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      {/*  Category list  */}
      <div
        className={`${
          showSidebar ? "block" : "hidden"
        } fixed top-[5rem] border-b lg:block lg:static w-2/3 lg:w-1/4  border-r z-40 `}
      >
        <div className="sticky space-y-5 py-5 px-5 top-[6rem] bg-white lg:py-0 pl-0 pr-5 rounded h-[100vh] max-h-[calc(100vh-5rem)] overflow-auto">
          <div className="space-y-2">
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
          {user && !user?.isVerified && user.role == "user" && (
            <div className="border p-5 mt-5 rounded space-y-2">
              <h3 className="text-xl font-semibold">Subscribe to Premium</h3>
              <p>
                Subscribe to unlock new features and if eligible, receive a
                share of revenue.
              </p>
              <button className="px-3 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white">
                <Link href={`/profile/${user._id}`}>Subscribe</Link>
              </button>
            </div>
          )}
        </div>
        {/* sidebar menu icon close  */}
        <div className=" block lg:hidden absolute top-5 right-5">
          <svg
            onClick={() => setShowSidebar(!showSidebar)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {/* PostCard */}
      <div className="space-y-10 py-5 lg:w-2/4">
        {posts && posts.length > 0 ? (
          posts.map((post, i) => <PostCard token={token} data={post} key={i} />)
        ) : (
          <div>
            <p className="text-center">not post here ...</p>
          </div>
        )}
      </div>
      {/* user bar*/}
      <div className={` hidden lg:block lg:w-1/4 border-l`}>
        <div className="sticky top-[6rem] py-5 pl-5  space-y-2  max-h-[calc(100vh-5rem)] overflow-auto">
          {users.length > 0 &&
            users.map((user, i) => (
              <div key={i}>
                <Link href={`/profile/${user._id}`}>
                  <div className="flex items-center gap-5 bg-gray-100 p-2 rounded">
                    <figure className="relative">
                      <Image
                        src={user.img}
                        height={100}
                        width={100}
                        className="h-[50px] w-[50px] rounded-full object-cover border-2"
                        alt={`${user.name} img`}
                      />
                      {user?.isVerified && (
                        <span className="absolute right-1 bottom-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-4  text-blue-800 shadow-2xl"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </figure>
                    <h2>{user.name}</h2>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
