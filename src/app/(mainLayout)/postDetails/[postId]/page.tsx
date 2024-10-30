import PostDetails from "@/components/pages/PostDetails";
import { getToken } from "@/utils/actions/auth";

const PostDetailsPage = async ({ params }: { params: { postId: string } }) => {
  const token = await getToken();
  console.log(token);
  return (
    <div>
      {/* / */}
      <PostDetails postId={params.postId as string} token={token as string} />
      {/* / */}
    </div>
  );
};

export default PostDetailsPage;
