import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { exclude } from "@/utils/helpers";

const serverAuth = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    throw new Error("Not signed in")
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      posts: true,
    }
  })

  if (!currentUser) {
    throw new Error("Not signed in")
  }

  const userWithoutPassword = exclude(currentUser, ["hashedPassword"])
  
  return { currentUser: currentUser }

}
 
export default serverAuth;