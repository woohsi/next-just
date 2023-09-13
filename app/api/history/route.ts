import { NextApiRequest } from "next"
import { NextRequest, NextResponse } from "next/server"

export const GET = (request: Request) => {
  const { searchParams } = new URL(request.url)
  const currentPage = searchParams.get('currentPage')
  const pageSize = searchParams.get('pageSize')

  return NextResponse.json({ ok: true, msg: "OK" })
}

export const POST = async (resquest: Request) => {

  // const ipGeolocation = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_YQXAHuWzI3Wnlo4xVIfMPudC30v7q&ipAddress=$`)
}