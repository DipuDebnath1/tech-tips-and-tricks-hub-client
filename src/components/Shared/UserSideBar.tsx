"use client";
import { useUserDataQuery } from "@/redux/api/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setToken, setUser } from "@/redux/userSlice";
import { TokenDecode } from "@/utils/tokenDecode";
import Link from "next/link";
import { useEffect, useState } from "react";

const UserSideBar = ({ token }: { token: string }) => {
  const decodeToken = TokenDecode(token);
  // const [user, setUser] = useState<TUser>();
  const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice.user);
  const { data, isLoading } = useUserDataQuery(decodeToken._id);

  // set token in state
  if (token) {
    dispatch(setToken(token));
  }
  useEffect(() => {
    if (data?.success) {
      dispatch(setUser(data.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center ">
        <p>Loading Sidebar ...</p>
      </div>
    );
  }

  return (
    user && (
      <>
        <div
          className={`${
            !showSidebar && "hidden"
          }  fixed lg:block top-[5rem] left-0 z-40 px-5 min-h-[85vh] bg-white w-full lg:w-full  border-r py-5 lg:sticky md:top-[5rem]`}
        >
          <ul>
            <li className="flex items-center gap-1 border-b py-3">
              <Link className="text-xl font-semibold " href={"/user/dashboard"}>
                {user?.name}
              </Link>{" "}
              {user?.isVerified && (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5  text-blue-800 shadow-2xl"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </li>
            <li className="pt-3">
              <Link
                className="block bg-gray-100 py-2 px-5 rounded"
                href={"/user/dashboard/follower"}
              >
                Follower
              </Link>
            </li>
            <li className="pt-3">
              <Link
                className="block bg-gray-100 py-2 px-5 rounded"
                href={"/user/dashboard/following"}
              >
                Following
              </Link>
            </li>

            <li className="pt-3">
              <Link
                className="block bg-gray-100 py-2 px-5 rounded"
                href={"/user/dashboard/verify-apply"}
              >
                Apply Verify
              </Link>
            </li>
          </ul>

          {/* sidebar menu icon close  */}
          <div className=" block lg:hidden absolute top-5  right-5">
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
      </>
    )
  );
};

export default UserSideBar;
