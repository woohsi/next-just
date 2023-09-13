import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";



export async function GET(request: Request, response: NextResponse) {
  try {
    const { currentUser } = await serverAuth()
    
    return NextResponse.json(currentUser)
  } catch (error) {
    console.log("CURRENT_GET", error)
    return NextResponse.json({ message: "Internal error" }, { status: 500})
  }
}