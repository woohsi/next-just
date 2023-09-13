import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

const PostPage = async (
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions)

  return (
    <div>
      page {params.id}
      <pre>
        {JSON.stringify(session)}
      </pre>
    </div>
  );
}

export default PostPage;
