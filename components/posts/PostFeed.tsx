"use client"

import usePosts from "@/hooks/usePosts";
import useUser from "@/hooks/useUser";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {

  const { data: posts = [] } = usePosts(userId);
  return (
    <div>
      {posts.map((post: Record<string, any>,) => (
        // <div key={post.id}>{ post?.content }</div>
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </div>
  );
}

export default PostFeed;