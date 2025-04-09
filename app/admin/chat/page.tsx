'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import ChatAdmin from '@/components/ChatAdmin'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AdminChatPage() {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user?.email?.includes('@springhealth.com')) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#04c7d0]"></div>
      </div>
    )
  }

  if (!user?.email?.includes('@springhealth.com')) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <ChatAdmin />
      </main>
      <Footer />
    </div>
  )
} 