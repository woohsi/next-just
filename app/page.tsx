import { Metadata } from 'next'
import Image from 'next/image'
import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { signOut, signIn } from 'next-auth/react'
import LoginBtn from './(posts)/posts/login-btn'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'woo',
  description: 'hsi'
}

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <h1 className='text-blue-900 text-3xl'>Home</h1>
      <h2 className='text-2xl font-bold'>Server Session</h2>
      <pre>
        {JSON.stringify(session, null, "  ")}
      </pre>
      <h2 className='text-2xl font-bold'>Client Session</h2>
      <Suspense fallback={<p>My loading...</p>}>
        <LoginBtn />
      </Suspense>
    </div>
  )
}
