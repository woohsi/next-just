
import UserProfile from "@/components/users/UserProfile";

const UserPage = ({
  params
}: {
  params: { userId: string }
}) => {


  return (
    <div>
      <UserProfile userId={params.userId} />
    </div>
  );
}

export default UserPage;