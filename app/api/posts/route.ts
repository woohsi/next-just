import prisma from "@/lib/prismadb"
import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export const POST = async (request: NextRequest) => {
  try {
    const token = await getToken({ req: request })
    if (token) {
      // Signed in
      console.log("JSON Web Token", JSON.stringify(token, null, 2))
    }
    const body = await request.json()
    const {title, description} = body
    const newPost = await prisma.post.create({
      data: {
        title,
        description,
        content: "content",
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
  
    const posts = await prisma.post.findMany()
    // throw new Error("hihi")
    return NextResponse.json(posts)
  } catch (err) {
    console.log("[POSTS_GET]", err)
    return NextResponse.json({message: "Get Error", err}, { status: 501})
  }
}