import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const PostPage = (
  { params }: { params: {id: string} }
) => {
  const session = getServerSession(authOptions)
 
  return ( 
      <div>
        page
        <pre>
          {JSON.stringify(session)}
        </pre>
      </div>
   );
}
 
export default PostPage;
