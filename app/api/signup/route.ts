
import NewUser from "@/app/(dict)/new-user/page"
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"
import { hash } from "bcrypt"

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { username, email, password } = body
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    let newUser
    if (existingUser) {
      console.log('User exists(set password): ', email)
      newUser = await prisma.user.update({
        where: {
          email: email
        },
        data: {
          hashedPassword: await hash(password, 12)
        }
      })
    } else {
      console.log('Create new user: ', email)
      newUser = await prisma.user.create({
        data: {
          email: email,
          username: username,
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