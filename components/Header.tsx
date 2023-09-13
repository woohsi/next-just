"use client"

import useCurrentUser from "@/hooks/useCurrentUser";
import { twMerge } from "tailwind-merge";
import SButton from "./SButton";

import { FaUserAlt } from "react-icons/fa"
import useAuthModal from "@/hooks/useAuthModal";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({
  children,
  className,
  title,
}) => {

  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const { data: currentUser } = useCurrentUser()

  return ( 
    <div className={twMerge(`
      h-fit
      bg-gradient-to-b
      from-yellow-500
      p-6
      `,
      className
    )}>
      <div className="flex justify-between items-center mb-2">
        <div className="text-3xl">
          {/* <div className="flex items-center p-1 text-xl text-white bg-slate-600 font-medium rounded-sm opacity-85">
            G<span className="text-yellow-400">OVN</span>
          </div> */}
          {title}
        </div>
        <div>
          {currentUser ? (
            <div className="flex gap-x-4 items-center">
              <SButton
                onClick={() => signOut()}
                className="bg-white px-6 py-2"
              >
                Logout
              </SButton>
              <SButton
                onClick={() => router.push(`/users/${currentUser?.id}`)}
                className="bg-white"
              >
                <FaUserAlt />
              </SButton>
            </div>
          ) : (
              <div className="flex gap-x-4 items-center">
                <div>
                  <SButton
                    onClick={registerModal.onOpen}
                    className="
                    bg-transparent 
                    text-neutral-300 
                    font-medium
                  "
                  >
                    Sign up
                  </SButton>
                </div>
                <div>
                  <SButton
                    onClick={() => signIn()}
                    className="bg-white px-6 py-2"
                  >
                    Log in
                  </SButton>
                </div>
              </div>
          )}
        </div>
      </div>
      {/* <div>
        { JSON.stringify(currentUser) }
      </div> */}
      { children }
    </div>
   );
}
 
export default Header