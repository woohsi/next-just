
const PostsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div className="bg-neutral-900 p-4 min-h-screen">
    //   <div className="bg-neutral-700 p-4 rounded-xl">
    //     { children }
    //   </div>
    // </div>
    <div className="h-full">{children}</div>
  );
}

export default PostsLayout;