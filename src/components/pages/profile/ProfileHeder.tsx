"use client";
import Image from "next/image";
import Link from "next/link";
import { CreatePost } from "./CreatePostModal";
import { EditProfile } from "./EditProfileModal";
import { useAppSelector } from "@/redux/hooks";

const ProfileHeder = () => {
  const user = useAppSelector((state) => state.userSlice.user);

  return (
    user && (
      <header className="border-b pb-10 pr-5">
        <div>
          {/* cover  */}
          <div
            style={{
              background:
                'url("https://i.ibb.co.com/HYDCmKS/blue-map-dot-matrix-technology-banner-background-2753309.webp")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="min-h-[30vh] bg-gray-300"
          ></div>
          {/* profile Image  */}
          <div className="relative">
            <Image
              className="w-[10rem] h-[10rem] object-cover border-4 border-gray-300 rounded-full -mt-[5rem] ml-[2rem]"
              src={user.img}
              width={200}
              height={200}
              alt={`${user.name} photo`}
            />
          </div>
          {/* user details  */}
          <div className="flex justify-between flex-col md:flex-row space-y-3">
            <div className="ml-[2rem] mt-5">
              <h2 className="flex items-center gap-1">
                <span className="text-2xl font-semibold ">{user?.name} </span>
                {user?.isVerified && (
                  <span>
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
              </h2>
              <p className="space-x-4">
                <Link href="/user/dashboard/following">
                  <span className="hover:underline">following</span>{" "}
                  {user.totalFollowing?.length}
                </Link>
                <Link href="/user/dashboard/follower">
                  <span className="hover:underline">follower</span>
                </Link>{" "}
                {user.totalFollower?.length}
              </p>
            </div>
            <div className="ml-[2rem]">
              <div className="flex space-x-2">
                <CreatePost />
                <EditProfile icon={true} title="Edit Profile" />
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  );
};

export default ProfileHeder;
