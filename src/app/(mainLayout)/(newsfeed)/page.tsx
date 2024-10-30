import NewsFeed from "@/components/pages/NewsFeed";
import { getToken } from "@/utils/actions/auth";

export default async function Home() {
  const token = await getToken();
  return (
    <div>
      <main className="min-h-screen relative max-w-screen-2xl mx-auto py-2 px-5">
        <NewsFeed token={token} />
      </main>
    </div>
  );
}
