import { PostType } from "@/types/PostType";
import axios from "axios";

import Link from 'next/link'
import LoginBtn from "./login-btn";
import Header from "@/components/Header";
import Form from "@/components/Form";
import PostFeed from "@/components/posts/PostFeed";

// export const revalidate = 20
export const dynamic = 'force-dynamic'

const PostsPage = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  // console.log(searchParams.id)
  // const response = await fetch("http://localhost:3001/posts", {

  // })
  // const posts = await response.json() as PostType[]
  // console.log('posts: ', posts)

  // const response2 = await fetch(`http://localhost:3001/posts/${searchParams.id}`)
  // const post = await response2.json() as PostType
  // console.log('post: ', post)
  // const response3 = await axios.get<PostType[]>("http://localhost:3001/posts")
  // const posts = response3.data

  return (
    <div className=" bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto"
    >
      {/* <div>
        <LoginBtn />
      </div> */}
      <Header title="Posts" className="from-bg-neutral-900">
        <div>test</div>
      </Header>
      <Form placeholder="Ask questions or share your thoughts" />
      <PostFeed />
      {/* <div>
        {posts.map((post) => (
          <li key={post.id}><Link href={`http://localhost:3000/posts/${post.id}`}>{post.title}</Link></li>
        ))}
      </div> */}
    </div>
  );
}

export default PostsPage;