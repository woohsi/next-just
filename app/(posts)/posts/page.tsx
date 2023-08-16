import { PostType } from "@/types/PostType";
import axios from "axios";

import Link from 'next/link'

// export const revalidate = 20
// export const dynamic = 'force-dynamic'

const PostsPage = async ({
  searchParams
}: {
  searchParams: {[key: string]: string | string[] | undefined}
}) => {
  console.log(searchParams.id)
  const response = await fetch("http://localhost:3001/posts", {

  })
  const posts = await response.json() as PostType[]
  console.log('posts: ', posts)

  const response2 = await fetch(`http://localhost:3001/posts/${searchParams.id}`)
  const post = await response2.json() as PostType
  console.log('post: ', post)
  // const response3 = await axios.get<PostType[]>("http://localhost:3001/posts")
  // const posts = response3.data

  return ( 
    <div>
      <h1 className="text-3xl">All Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}><Link href={`http://localhost:3000/posts/${post.id}`}>{post.title}</Link></li>
        ))}
      </ul>
    </div>
   );
}
 
export default PostsPage;