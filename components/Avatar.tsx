import useUser from "@/hooks/useUser";
import Image from "next/image";

interface AvatarProps {
  userId: string
  isLarge?: boolean
  hasBorder?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: fetchedUser, isLoading } = useUser(userId)

  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-32 w-32' : 'h-12 w-12'}
        rounded-full
        hover:opacity-90
        cursor-pointer
        relative
      `}
    >
      <Image
        fill
        alt="Avatar"
        className="rounded-full object-cover"
        src={fetchedUser?.profileImage || '/images/placeholder.png' || fetchedUser?.image}
      />
    </div>
  );
}

export default Avatar;