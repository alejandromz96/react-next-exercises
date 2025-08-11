import FetchedPost from "@/components/FetchedPost";
import Link from "next/link";

type FetchedPostPageProps = {
  params: { id: string };
};

const FetchedPostPage = async ({ params }: FetchedPostPageProps) => {
  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    return <p className="text-red-500">Invalid post ID</p>;
  }
  
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/exercises/fetched-posts"
          className="inline-block text-sm text-blue-500 hover:underline"
        >
          ← Back to Fetched Posts List
        </Link>
      </div>
      <FetchedPost id={id} />
    </div>
  );
};

export default FetchedPostPage;
