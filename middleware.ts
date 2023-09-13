import { NextRequest, NextResponse } from "next/server"
import prisma from '@/libs/prismadb'
export { default } from "next-auth/middleware"

export const config = { matcher: ["/api/qq"] }

export const middleware = async (
  request: NextRequest
) => {

  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const word = searchParams.get('word')

  if (request.nextUrl.pathname.startsWith("/api/q") && category && word) {
    console.log("history +1")
    
  }
  return NextResponse.next()
}