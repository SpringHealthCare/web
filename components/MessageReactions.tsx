import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, ThumbsUp, Laugh, Angry, Smile } from 'lucide-react'

interface MessageReactionsProps {
  messageId: string
  reactions: { [key: string]: string[] }
  userId: string
  onReact: (reaction: string) => void
}

const REACTIONS = [
  { emoji: '❤️', icon: Heart, label: 'Love' },
  { emoji: '👍', icon: ThumbsUp, label: 'Like' },
  { emoji: '😄', icon: Laugh, label: 'Laugh' },
  { emoji: '😊', icon: Smile, label: 'Smile' },
  { emoji: '😠', icon: Angry, label: 'Angry' }
]

export default function MessageReactions({ messageId, reactions, userId, onReact }: MessageReactionsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleReaction = (reaction: string) => {
    onReact(reaction)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Add reaction"
      >
        <Smile className="w-4 h-4" />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg p-2 flex gap-1"
        >
          {REACTIONS.map(({ emoji, icon: Icon, label }) => (
            <button
              key={emoji}
              onClick={() => handleReaction(emoji)}
              className={`p-1 rounded-full hover:bg-gray-100 transition-colors ${
                reactions[emoji]?.includes(userId) ? 'bg-blue-50' : ''
              }`}
              aria-label={label}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </motion.div>
      )}

      {Object.entries(reactions).length > 0 && (
        <div className="flex gap-1 mt-1">
          {Object.entries(reactions).map(([emoji, users]) => (
            <span
              key={emoji}
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                users.includes(userId) ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {emoji} {users.length}
            </span>
          ))}
        </div>
      )}
    </div>
  )
} 