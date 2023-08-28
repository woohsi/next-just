
import NewUser from "@/app/(posts)/new-user/page"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"
import { hash } from "bcrypt"

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json()
    const { email, password } = body
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    console.log(existingUser)
    let newUser
    if (existingUser) {
      newUser = await prisma.user.update({
        where: {
          email: email
        },
        data: {
          hashedPassword: await hash(password, 12)
        }
      })
    } else {
      newUser = await prisma.user.create({
        data: {
          email: email,
          hashedPassword: await hash(password, 12)
        }
      })
    }
    
    return NextResponse.json(newUser)
  } catch (err) {
    console.log("[POSTS_POST]", err)
    return new NextResponse("Internal Error", { status: 500})
  }
}