import { Metadata } from 'next'
import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import LoginBtn from './posts/login-btn'
import { Suspense } from 'react'
import Header from '@/components/Header'
import SearchInput from '@/components/SearchInput'
import VietvietCard from '@/components/vietviet-card'
import VietanhCard from '@/components/vietanh-card'
import { headers } from 'next/headers'

export const metadata: Metadata = {
  title: 'govn',
  description: 'dict'
}

interface HomePageProps {
  searchParams: {
    word: string;
    category: string;
  }
}

export const revalidate = 20

const getData = async (c: string | null, w: string | null): Promise<any> => {
  console.log('test_url ', `https://${process.env.VERCEL_URL}/api/q?category=${c}&word=${w}`)
  const res = await fetch(`https://${process.env.VERCEL_URL}/api/q?category=${c}&word=${w}`, {
    headers: headers()
  })
  return res.json()
}


export default async function Home({
  searchParams
}: HomePageProps) {
  const session = await getServerSession(authOptions)

  let data: any;

  try {
    data = await getData(searchParams.category, searchParams.word)
  } catch (error) {
    console.log("Something wrong")
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
      <Header title='Search'>
        <SearchInput />
      </Header>
      <div>
        {searchParams.category == 'vietviet' && <VietvietCard data={data} />}
      </div>
      <div>
        {searchParams.category == 'vietanh' && <VietanhCard data={data} />}
      </div>
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
