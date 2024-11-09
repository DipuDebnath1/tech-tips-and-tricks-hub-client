import PostContent from "@/components/Shared/PostContent";
import { getToken } from "@/utils/actions/auth";
import React from "react";

const Profile = async () => {
  const token = await getToken();
  return (
    <div>
      <PostContent token={token} />
    </div>
  );
};

export default Profile;
