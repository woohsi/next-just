import prisma from "@/libs/prismadb"
import serverAuth from "@/libs/serverAuth";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server"
import { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "../auth/[...nextauth]/route";
import { GetIpAddress, GetLocation } from "@/libs/geoip";
import { headers } from "next/headers";
import find from "@/libs/findPage";
import { getLocation } from "@/libs/utils";

const CATEGORY_VV = 'vietviet';
const CATEGORY_VE = 'vietanh';
const CATEGORY_VC = 'viettrung';
const CATEGORY_CV = 'trungviet';


export const GET = async (
  request: NextRequest
) => {
  try {

    // console.log(`url: ${request.url}, ${request.query}`)
    // const { category, word, userId } = request.query
    const {searchParams} = new URL(request.url!)
    const category = searchParams.get('category') as string
    const word =  searchParams.get('word') as string
    const userId = searchParams.get('userId') as string

    const headersList = headers()
    const userAgent = headersList.get('x-forwarded-for')
    headersList.forEach((v, k) => {
      console.log(`${k}: ${v}`)
    })
    console.log(`address: ${await getLocation(await GetIpAddress(request))}`)

    let data;

    if (category === CATEGORY_VE) {
      data = await prisma.ve.findFirst({
        where: {
          title: {
            equals: word.trim(),
            mode: 'insensitive',
          }
        }
      })
    }

    if (category === CATEGORY_VV) {
      data = await prisma.vv.findFirst({
        where: {
          title: {
            equals: word.trim(),
            mode: 'insensitive', 
          }
        }
      })
    }

    if (category === CATEGORY_VC) {
      console.log("viettrung word", word)
      data = await find(word.trim())
      console.log("viettrung data", data)
    }
    
    // if (userId === 'undefined') {
      
    //   await prisma.his.create({
    //     data: {
    //       word: word,
    //       category: category,
    //       clientIp: ip,
    //       location: await getLocation(ip)
    //     }
    //   }) 
    // } else {
    //   await prisma.his.create({
    //     data: {
    //       word: word,
    //       category: category,
    //       userId: userId,
    //       clientIp: ip,
    //       location: await getLocation(ip)
    //     }
    //   }) 
    // }

    
    console.log("[WORDS_GET]", `Got data ${data}`)
    return NextResponse.json(data)
  } catch (err) {
    console.log("[WORDS_GET]", err)
    return NextResponse.json({message: "Get Error", err}, { status: 501})
  }
}