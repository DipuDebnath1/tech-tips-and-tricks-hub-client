import PostContent from "@/components/Shared/PostContent";
import { getToken } from "@/utils/actions/auth";

const userProfile = async () => {
  const token = await getToken();
  return (
    <div>
      <PostContent token={token} />
    </div>
  );
};

export default userProfile;
