import { Timestamp } from 'firebase/firestore'

export const formatTimestamp = (timestamp: Timestamp | null) => {
  if (!timestamp) return ''
  const date = timestamp.toDate()
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
  return date.toLocaleDateString()
}

export const groupMessagesByDate = (messages: any[]) => {
  const groups: { [key: string]: any[] } = {}
  
  messages.forEach(message => {
    const date = message.timestamp?.toDate().toLocaleDateString() || 'Unknown'
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(message)
  })
  
  return groups
}

export const encryptMessage = (message: string, key: string) => {
  // Simple encryption for demo purposes
  // In production, use a proper encryption library
  return btoa(message)
}

export const decryptMessage = (encryptedMessage: string, key: string) => {
  // Simple decryption for demo purposes
  // In production, use a proper encryption library
  return atob(encryptedMessage)
}

export const formatMessageText = (text: string) => {
  // Convert URLs to links
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const formattedText = text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${url}</a>`
  })

  // Convert markdown-style code blocks
  const codeRegex = /```([\s\S]*?)```/g
  return formattedText.replace(codeRegex, (_, code) => {
    return `<pre class="bg-gray-100 p-2 rounded"><code>${code}</code></pre>`
  })
}

export const isSpam = (message: string) => {
  // Basic spam detection
  const spamPatterns = [
    /http[s]?:\/\/[^\s]+/g, // URLs
    /[A-Z]{5,}/g, // Excessive caps
    /.{100,}/g, // Very long messages
    /[!@#$%^&*()_+]{5,}/g // Excessive special characters
  ]

  return spamPatterns.some(pattern => pattern.test(message))
}

export const rateLimitCheck = (lastMessageTime: number, currentTime: number) => {
  const MESSAGE_RATE_LIMIT = 1000 // 1 second between messages
  return currentTime - lastMessageTime < MESSAGE_RATE_LIMIT
} 