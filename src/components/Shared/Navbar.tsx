/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { LogOutUser } from "@/utils/actions/auth";
import { TokenDecode } from "@/utils/tokenDecode";
import { TUser } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = ({ token }: any) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [userMenu, setUserMenu] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      const data = TokenDecode(token);
      if (data) {
        setUser(data);
      }
    }
  }, [token]);

  // handle logout
  const handleLogout = () => {
    setShowMenu(false);
    setUserMenu(false);
    localStorage.removeItem("userToken");
    LogOutUser();
    setUser(null);
  };

  return (
    <header className="shadow sticky top-0 z-50 bg-white">
      <div className="flex h-[5rem] justify-between max-w-screen-2xl mx-auto py-2 px-5 items-center">
        {/* logo */}
        <div className="">
          <h1
            style={{ fontFamily: "cursive" }}
            className="text-2xl font-semibold "
          >
            <Link href={"/"}>TechInfo</Link>
          </h1>
        </div>
        {/* menubar  */}
        <nav className="hidden md:block">
          <ul className="flex justify-around items-center gap-5">
            <li>
              <Link href={"/"}>News Feed</Link>
            </li>
            {user && (
              <li>
                <Link href={`/${user.role}/dashboard`}>Dashboard</Link>
              </li>
            )}
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact</Link>
            </li>
          </ul>
        </nav>

        {/* profile */}
        <div className="flex items-center gap-3">
          <div>
            {user ? (
              <div className="relative">
                <figure>
                  <Image
                    src={"https://i.ibb.co.com/TLNKqt4/images.jpg"}
                    alt="user"
                    width={100}
                    height={100}
                    className="rounded-full w-16 h-16 object-cover border-2 shadow cursor-pointer"
                    onClick={() => setUserMenu(!userMenu)}
                  />
                </figure>

                {userMenu && (
                  <div className="absolute top-[75px] right-0 bg-gray-50 border z-50 rounded w-32">
                    <p>
                      <Link
                        className="block py-2 border-b px-4 hover:bg-gray-100"
                        href={`/${user.role}/dashboard`}
                        onClick={() => setUserMenu(!userMenu)}
                      >
                        Dashboard
                      </Link>
                    </p>
                    <p
                      onClick={handleLogout}
                      className="py-2 border-b px-6 hover:bg-gray-100 text-start cursor-pointer"
                    >
                      Logout
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <Link href={"/login"}>Sign In</Link>
            )}
          </div>
          {/* menu bar  */}
          <div className="md:hidden block">
            <svg
              onClick={() => setShowMenu(!showMenu)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-8 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* submenu  */}
      {showMenu && (
        <div className="absolute top-0 right-0 w-[20rem] min-h-screen bg-gray-100 py-5">
          <header className="flex justify-between items-center px-5">
            <h1
              style={{ fontFamily: "cursive" }}
              className="text-2xl font-semibold "
            >
              <Link href={"/"}>TechInfo</Link>
            </h1>
            <p onClick={() => setShowMenu(!showMenu)}>
              <svg
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </p>
          </header>
          <nav>
            <ul className="flex flex-col pt-5">
              <li className="border ">
                <Link
                  onClick={() => setShowMenu(!showMenu)}
                  className="py-2 px-4 hover:bg-gray-50 cursor-pointer block"
                  href={"/"}
                >
                  News Feed
                </Link>
              </li>
              {user && (
                <li className="border-b ">
                  <Link
                    onClick={() => setShowMenu(!showMenu)}
                    className="py-2 px-4 hover:bg-gray-50 cursor-pointer block"
                    href={`/${user.role}/dashboard`}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li className="border-b ">
                <Link
                  onClick={() => setShowMenu(!showMenu)}
                  className="py-2 px-4 hover:bg-gray-50 cursor-pointer block"
                  href={"/about"}
                >
                  About
                </Link>
              </li>
              <li className="border-b ">
                <Link
                  onClick={() => setShowMenu(!showMenu)}
                  className="py-2 px-4 hover:bg-gray-50 cursor-pointer block"
                  href={"/contact"}
                >
                  Contact
                </Link>
              </li>

              {user ? (
                <li>
                  <p
                    onClick={handleLogout}
                    className="py-2 px-4 hover:bg-red-500 cursor-pointer block border-b text-center bg-red-400 text-white"
                  >
                    Sign Out
                  </p>
                </li>
              ) : (
                <li>
                  <Link href={"/login"}>SignIn</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
