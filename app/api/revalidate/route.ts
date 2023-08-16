import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
 
export async function GET(request: NextRequest) {
  const response = NextResponse.json({ revalidated: true, now: Date.now() })
  const path = request.nextUrl.searchParams.get('path') as string
  revalidatePath(path)
  response.cookies.set('show-banner', 'false')
  return response
}