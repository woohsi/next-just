"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { redirect } from "next/navigation"
import { getToken } from "next-auth/jwt"
import { useState, useEffect } from "react"


const delay = async (ms) => await new Promise(
  resolve => setTimeout(resolve, ms)
)

export default function LoginBtn() {
  // {
  //   required: true,
  //     onUnauthenticated() {
  //     redirect("/api/auth/signin?callbackUrl=/posts")
  //   },
  // }
  const [showComponent, setShowComponent] = useState(false);
  const { data: session, status } = useSession()
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowComponent(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (status == "loading") {
    return <div>Loading</div>
  }
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        {status} <br />
        <pre>
          {JSON.stringify(session, undefined, "  ")}
        </pre>
        <button className="border-blue-900 border-2 rounded-md p-1" onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button className="border-blue-900 border-2 rounded-md p-1" onClick={() => signIn()}>Sign in</button>
    </>
  )
}
