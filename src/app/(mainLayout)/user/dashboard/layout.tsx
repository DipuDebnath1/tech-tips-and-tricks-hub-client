import ProfileHeder from "@/components/pages/profile/ProfileHeder";
import UserSideBar from "@/components/Shared/UserSideBar";
import { getToken } from "@/utils/actions/auth";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const token = await getToken();
  return (
    <div className="flex min-h-screen max-w-screen-2xl mx-auto ">
      <div className="lg:block lg:w-1/4 bg-white">
        <UserSideBar token={token} />
      </div>
      <div className="w-full lg:w-3/4">
        <ProfileHeder />
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
