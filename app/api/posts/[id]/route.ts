import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export const GET = async (
  request: Request, 
  { params }: { params: {id: string} }
) => {

  try {
  
    const post = await prisma.post.findUnique({
      where: {
        id: params.id
      }
    })
    if (!post) {
      return NextResponse.json({message: "Post not found"}, { status: 404})
    }
    // throw new Error("hihi")
    return NextResponse.json(post)
  } catch (err) {
    console.log("[POSTS_GET]", err)
    return NextResponse.json({message: "Get Error", err}, { status: 501})
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: {id: string} }
) => {
  try {
    const body = await request.json()
    const {title, description} = body
    const updatePost = await prisma.post.update({
      where: {
        id: params.id
      },
      data: {
        title,
        description
      }
    })
    return NextResponse.json(updatePost)
  } catch (err) {
    console.log("[POSTS_UPDATE]", err)
    return new NextResponse("Internal Error", { status: 500})
  }
}

export const DELETE = async (
  request: Request,
  { params }: { params: {id: string} }
) => {
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: params.id
      }
    })
    return NextResponse.json({messae: "Post deleted", id: deletedPost.id})
  } catch (err) {
    console.log("[POSTS_DELETE]", err)
    return new NextResponse("Internal Error", { status: 500})
  }
}