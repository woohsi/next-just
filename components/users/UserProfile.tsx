"use client"

import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";
import useUser from "@/hooks/useUser";

interface UserProfileProps {
  userId: string
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {

  return (
    <div>
      {/* <Header /> */}
      <UserHero userId={userId} />
      <UserBio userId={userId} />
      <PostFeed userId={userId} />
    </div>
  );
}

export default UserProfile;