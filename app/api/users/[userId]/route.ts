import prisma from "@/libs/prismadb"
import serverAuth from "@/libs/serverAuth"
import { NextResponse } from "next/server"


export const GET = async (
  request: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.userId
      }
    })

    const postCount = await prisma.post.count({
      where: {
        userId: user?.id
      }
    })

    const followingCount = user?.followingIds.length

    const followerCount = await prisma.user.count({
      where: {
        followingIds: {
          has: user?.id
        }
      }
    })

    return NextResponse.json({
      ...user,
      postCount,
      followingCount,
      followerCount
    })
  } catch (error) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 })
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: { userId: string } }
) => {

  const { currentUser } = await serverAuth();
  try {
    const body = await request.json()
    const { name, username, bio, profileImage, coverImage } = body;

    if (!name || !username) {
      throw new Error('Missing fields');
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage
      }
    });

    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 })
  }
}