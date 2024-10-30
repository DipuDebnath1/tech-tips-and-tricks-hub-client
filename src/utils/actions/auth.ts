"use server";

import { cookies } from "next/headers";

// login user

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LoginUser = async (userData: any) => {
  const res = await fetch(`http://localhost:5000/api/auth/signin`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    cache: "no-store",
  });
  const user = await res.json();
  if (user.success) {
    cookies().set("userToken", user.token);
    return user;
  }
  return user;
};

// logout user
export const LogOutUser = async () => {
  cookies().delete("userToken");
};
// logout user
export const getToken = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("userToken");
  return token?.value || "";
};