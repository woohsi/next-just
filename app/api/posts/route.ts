import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const {title, description} = body
    const newPost = await prisma.post.create({
      data: {
        title,
        description
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