import prisma from "@/libs/prismadb"
import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import serverAuth from "@/libs/serverAuth"

export const POST = async (request: NextRequest) => {
  try {
    const { currentUser } = await serverAuth();
    const token = await getToken({ req: request })
    if (token) {
      // Signed in
      console.log("JSON Web Token", JSON.stringify(token, null, 2))
    }
    const body = await request.json()
    const {title, description, body: content} = body
    const newPost = await prisma.post.create({
      data: {
        title,
        description,
        content: content,
        userId: currentUser.id
      }
    })
    return NextResponse.json(newPost)
  } catch (err) {
    console.log("[POSTS_POST]", err)
    return new NextResponse("Internal Error", { status: 500})
  }
}

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId');

    let posts;
    if (userId) {
      posts = await prisma.post.findMany({
        where: {
          userId
        },
        include: {
          user: true,
          comments: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      
    } else {
      posts = await prisma.post.findMany({
        include: {
          user: true,
          comments: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    }
    // throw new Error("hihi")
    return NextResponse.json(posts)
  } catch (err) {
    console.log("[POSTS_GET]", err)
    return NextResponse.json({message: "Get Error", err}, { status: 501})
  }
}