const PostsLayout = ({children}: {children: React.ReactNode}) => {
  return ( 
    <div className="bg-blue-600 p-4 min-h-screen">
      <div className="bg-white p-4 rounded-xl">
        { children }
      </div>
    </div>
   );
}
 
export default PostsLayout;