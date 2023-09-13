import prisma from "@/libs/prismadb"
import serverAuth from "@/libs/serverAuth";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route";
import { getGeolocation, getLocation } from "@/libs/utils";
import { headers } from "next/headers";

const CATEGORY_VV = 'vietviet';
const CATEGORY_VE = 'vietanh';
const CATEGORY_VC = 'viettrung';
const CATEGORY_CV = 'trungviet';


export const GET = async (
  request: Request
) => {
  try {
    const session = await getServerSession(authOptions) as {userId: string}

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') as string
    const word = searchParams.get('word') as string

    const headerList = headers()
    const forwarded = headerList.get('x-forwarded-for')
    console.log(headers())
    const ip = forwarded ? forwarded.split(/,/)[0] : "1.1.1.1"

    let data;

    if (category === CATEGORY_VE) {
      data = await prisma.ve.findFirst({
        where: {
          title: word,
        }
      })
    }

    if (category === CATEGORY_VV) {
      data = await prisma.vv.findFirst({
        where: {
          title: word,
        }
      })
    }

    await prisma.his.create({
      data: {
        word: word,
        category: category,
        userId: session?.userId,
        clientIp: ip,
        location: await getLocation(ip)
      }
    })

    return NextResponse.json(data)
  } catch (err) {
    console.log("[POSTS_GET]", err)
    return NextResponse.json({message: "Get Error", err}, { status: 501})
  }
}