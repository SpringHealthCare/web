'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'

interface GuestChatEntryProps {
  onGuestEntry: (name: string) => void
}

export default function GuestChatEntry({ onGuestEntry }: GuestChatEntryProps) {
  const [guestName, setGuestName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestName.trim()) {
      setError('Please enter your name')
      return
    }
    onGuestEntry(guestName.trim())
  }

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-6"
      >
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#04c7d0] rounded-full flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Welcome to Spring Health Chat</h2>
          <p className="mt-2 text-gray-600">Please enter your name to start chatting with our healthcare professionals</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04c7d0] focus:border-[#04c7d0]"
              maxLength={50}
            />
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-red-500 text-sm"
              >
                {error}
              </motion.p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#04c7d0] text-white py-2 px-4 rounded-lg hover:bg-[#03b5bc] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#04c7d0]"
          >
            Start Chat
          </button>
        </form>

        <p className="mt-4 text-xs text-center text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  )
} 