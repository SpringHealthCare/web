'use client'

import Chat from '@/components/Chat'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ChatPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="container mx-auto">
          <Chat />
        </div>
      </main>
      <Footer />
    </div>
  )
} 