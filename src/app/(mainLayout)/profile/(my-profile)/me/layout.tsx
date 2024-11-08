import ProfileHeder from "@/components/pages/profile/ProfileHeder";
import { getToken } from "@/utils/actions/auth";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const token = await getToken();
  return (
    <div>
      <ProfileHeder token={token} />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
