/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";

export const TokenDecode = (token: string) => {
  if (!token) {
    return false;
  }
  const decoded: any = jwtDecode(token);
  return decoded?.data ? decoded?.data : false;
};
