import useUser from "@/hooks/useUser"
import Image from "next/image";
import Avatar from "../Avatar";

interface UserBioProps {
  userId: string
}

const UserHero: React.FC<UserBioProps> = ({ userId }) => {
  const { data: fetchedUser, isLoading } = useUser(userId)
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {true && (
          <Image src={fetchedUser?.coverImage || '/images/cover.jpeg'} alt="Cover Image" fill style={{ objectFit: 'cover' }} />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
}

export default UserHero;