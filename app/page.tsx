import { Metadata } from 'next'
import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import LoginBtn from './posts/login-btn'
import { Suspense } from 'react'
import Header from '@/components/Header'
import SearchInput from '@/components/SearchInput'
import VietvietCard from '@/components/vietviet-card'
import VietanhCard from '@/components/vietanh-card'
import ViettrungCard from '@/components/viettrung-card'
import { headers } from 'next/headers'

export const metadata: Metadata = {
  title: 'GOVN DICT - 世界上最好用的越南语词典|Từ Điển Tiếng Việt Tốt Nhất Trên Thế Giới|Best Vietnamese dictionary in the world',
  description: '越南语词典|越中词典|越越词典|越英词典|Từ điển tiếng Việt|Từ điển Việt Việt|Từ điển Việt Trung|Từ điển Việt Anh|Từ điển Trung Việt|d.woohsi.top'
}

interface HomePageProps {
  searchParams: {
    word: string;
    category: string;
  }
}

export const revalidate = 20

const getData = async (c: string | null, w: string | null): Promise<any> => {
  const session = await getServerSession(authOptions) as { userId: string }
  console.log('test_url ', `https://${process.env.VERCEL_URL}/api/q?category=${c}&word=${w}`)
  const res = await fetch(`http://${process.env.VERCEL_URL}/api/q?category=${c}&word=${w}&userId=${session?.userId}`)
  console.log(`res: ${res}`)
  return res.json()
}


export default async function Home({
  searchParams
}: HomePageProps) {

  let data: any;

  try {
    data = await getData(searchParams.category, searchParams.word)
  } catch (error) {
    console.log("Something wrong: ", error)
  }
  return (
    <div className='
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    '>
      <Header title='GOVN - Từ Điển Tiếng Việt'>
        <SearchInput />
      </Header>
      <div>
        {searchParams.category == 'vietviet' && <VietvietCard data={data} />}
      </div>
      <div>
        {searchParams.category == 'vietanh' && <VietanhCard data={data} />}
      </div>
      <div>
        {searchParams.category == 'viettrung' && <ViettrungCard data={data} />}
      </div>
      <div>
        {searchParams.category == 'trungviet' && <p>Not available now, but trung viet dict will be coming soon</p>}
      </div>
      { !data && <p>Nothing found ;(</p>}
      {/* <pre>
        {JSON.stringify(session, null, "  ")}
      </pre> */}
      {/* <h1 className='text-blue-900 text-3xl'>Home</h1>
      <h2 className='text-2xl font-bold'>Server Session</h2>
      
      <h2 className='text-2xl font-bold'>Client Session</h2>
      <Suspense fallback={<p>My loading...</p>}>
        <LoginBtn />
      </Suspense> */}
    </div>
  )
}
