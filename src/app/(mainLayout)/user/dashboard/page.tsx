import PostContent from "@/components/Shared/PostContent";
import { getToken } from "@/utils/actions/auth";

const UserDashboard = async () => {
  const token = await getToken();
  return (
    <div>
      <PostContent token={token} />
    </div>
  );
};

export default UserDashboard;
