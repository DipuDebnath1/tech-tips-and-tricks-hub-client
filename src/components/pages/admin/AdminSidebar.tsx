"use client";
import { useUserDataQuery } from "@/redux/api/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setToken, setUser } from "@/redux/userSlice";
import { TokenDecode } from "@/utils/tokenDecode";
import Link from "next/link";
import { useEffect, useState } from "react";

const AdminSidebar = ({ token }: { token: string }) => {
  const decodeToken = TokenDecode(token);
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
            {/* <title></title> */}
            <li className="flex items-center gap-1 border-b py-3">
              <Link className="text-xl font-semibold " href={"/user/dashboard"}>
                Admin Panel
              </Link>
            </li>
            {/* sidebar Items  */}
            <li className="pt-3">
              <Link
                className="block bg-gray-100 py-2 px-5 rounded"
                href={"/admin/dashboard"}
              >
                Dashboard
              </Link>
            </li>
            <li className="pt-3">
              <Link
                className="block bg-gray-100 py-2 px-5 rounded"
                href={"/admin/dashboard/profile"}
              >
                Profile
              </Link>
            </li>

            <li className="pt-3">
              <Link
                className="block bg-gray-100 py-2 px-5 rounded"
                href={"/admin/dashboard/manage-user"}
              >
                Manage Users
              </Link>
            </li>
            <li className="pt-3">
              <Link
                className="block bg-gray-100 py-2 px-5 rounded"
                href={"/admin/dashboard/active-content"}
              >
                Manage Active Content
              </Link>
            </li>
            <li className="pt-3">
              <Link
                className="block bg-gray-100 py-2 px-5 rounded"
                href={"/admin/dashboard/deleted-content"}
              >
                Manage Deleted Content
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

export default AdminSidebar;
