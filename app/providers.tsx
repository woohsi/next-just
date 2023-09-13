'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import { authOptions } from './api/auth/[...nextauth]/route'
import { Session } from 'next-auth'

export default function AuthProvider({
  session,
  children }: {
    session: Session | null
    children: React.ReactNode
  }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}