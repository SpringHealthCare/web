'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, FileText } from 'lucide-react'
import { auth, db, storage } from '@/lib/firebase'
import { 
  collection, 
  query, 
  orderBy, 
  where,
  limit, 
  addDoc, 
  setDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  startAfter,
  getDocs,
  deleteDoc,
  updateDoc
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useAuthState } from 'react-firebase-hooks/auth'
import GuestChatEntry from './GuestChatEntry'
import MessageReactions from './MessageReactions'
import FileAttachment from './FileAttachment'
import { formatTimestamp, groupMessagesByDate, encryptMessage, decryptMessage, formatMessageText, isSpam, rateLimitCheck } from '@/utils/chatUtils'

interface Message {
  id: string
  text: string
  userId: string
  userName: string
  timestamp: any
  isProfessional: boolean
  isAutomated?: boolean
  chatId: string
  status: 'sending' | 'delivered' | 'read'
  reactions?: { [key: string]: string[] }
  fileUrl?: string
  fileName?: string
  fileType?: string
  replyTo?: {
    id: string
    text: string
    userName: string
  }
  edited?: boolean
}

const Chat = () => {
  const [user] = useAuthState(auth)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [guestName, setGuestName] = useState('')
  const [guestId, setGuestId] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [editingMessage, setEditingMessage] = useState<Message | null>(null)
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const [lastMessageTime, setLastMessageTime] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesStartRef = useRef<HTMLDivElement>(null)

  const handleGuestEntry = async (name: string) => {
    setGuestName(name)
    // Generate a unique ID for the guest
    const id = `guest_${Date.now()}`
    setGuestId(id)

    // Create a guest user document in Firestore
    try {
      await setDoc(doc(db, 'users', id), {
        id,
        name,
        type: 'guest',
        lastActive: serverTimestamp(),
        status: 'online'
      })
    } catch (error) {
      console.error('Error creating guest user:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!guestId && !user) return

    const messagesRef = collection(db, 'messages')
    const q = query(
      messagesRef,
      where('chatId', 'in', [guestId || user?.uid || '', 'system']),
      orderBy('timestamp', 'desc'),
      limit(50)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[]

      // Mark messages as read
      newMessages.forEach(async (message) => {
        if (message.userId !== (user?.uid || guestId) && message.status === 'delivered') {
          await setDoc(doc(db, 'messages', message.id), {
            status: 'read'
          }, { merge: true })
        }
      })

      setMessages(newMessages.reverse())
    })

    return () => unsubscribe()
  }, [guestId, user])

  // Track online/offline status
  useEffect(() => {
    if (!guestId && !user) return

    const currentId = user ? user.uid : guestId
    
    // Set online status
    setDoc(doc(db, 'users', currentId), {
      status: 'online',
      lastActive: serverTimestamp(),
      isTyping: false
    }, { merge: true })

    // Set offline status on unmount
    return () => {
      setDoc(doc(db, 'users', currentId), {
        status: 'offline',
        lastActive: serverTimestamp(),
        isTyping: false
      }, { merge: true })
    }
  }, [guestId, user])

  const handleTyping = () => {
    if (typingTimeout) clearTimeout(typingTimeout)
    setIsTyping(true)
    
    const currentId = user ? user.uid : guestId
    if (currentId) {
      setDoc(doc(db, 'users', currentId), {
        isTyping: true
      }, { merge: true })
    }
    
    const timeout = setTimeout(() => {
      setIsTyping(false)
      if (currentId) {
        setDoc(doc(db, 'users', currentId), {
          isTyping: false
        }, { merge: true })
      }
    }, 3000)
    
    setTypingTimeout(timeout)
  }

  const uploadFile = async (file: File) => {
    const currentId = user ? user.uid : guestId
    const fileRef = ref(storage, `chat-files/${currentId}/${Date.now()}-${file.name}`)
    await uploadBytes(fileRef, file)
    return getDownloadURL(fileRef)
  }

  const handleReaction = async (messageId: string, reaction: string) => {
    const messageRef = doc(db, 'messages', messageId)
    const message = messages.find(m => m.id === messageId)
    
    if (!message) return

    const currentReactions = message.reactions || {}
    const currentUsers = currentReactions[reaction] || []
    const currentId = user ? user.uid : guestId

    if (currentUsers.includes(currentId)) {
      // Remove reaction
      const updatedUsers = currentUsers.filter(id => id !== currentId)
      if (updatedUsers.length === 0) {
        delete currentReactions[reaction]
      } else {
        currentReactions[reaction] = updatedUsers
      }
    } else {
      // Add reaction
      currentReactions[reaction] = [...currentUsers, currentId]
    }

    await updateDoc(messageRef, {
      reactions: currentReactions
    })
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() && !selectedFile) return

    const currentTime = Date.now()
    if (rateLimitCheck(lastMessageTime, currentTime)) {
      alert('Please wait a moment before sending another message')
      return
    }

    if (isSpam(newMessage)) {
      alert('Your message appears to be spam. Please try again.')
      return
    }

    try {
      if (user || guestId) {
        const currentId = user ? user.uid : guestId
        const currentName = user ? (user.displayName || user.email) : guestName
        const timestamp = serverTimestamp()

        let fileUrl, fileName, fileType
        if (selectedFile) {
          fileUrl = await uploadFile(selectedFile)
          fileName = selectedFile.name
          fileType = selectedFile.type
        }

        // Update user's last active timestamp and last message
        await setDoc(doc(db, 'users', currentId), {
          id: currentId,
          name: currentName,
          type: user ? 'registered' : 'guest',
          lastActive: timestamp,
          status: 'online',
          lastMessage: newMessage,
          lastMessageTime: timestamp,
          isTyping: false
        }, { merge: true })

        // Add the message
        const messageData = {
          text: encryptMessage(newMessage, currentId),
          userId: currentId,
          userName: currentName,
          timestamp: timestamp,
          isProfessional: false,
          chatId: currentId,
          isGuest: !user,
          status: 'sending',
          fileUrl,
          fileName,
          fileType,
          replyTo: replyingTo ? {
            id: replyingTo.id,
            text: replyingTo.text,
            userName: replyingTo.userName
          } : undefined
        }

        const messageRef = await addDoc(collection(db, 'messages'), messageData)
        await setDoc(messageRef, { status: 'delivered' }, { merge: true })
        
        setNewMessage('')
        setSelectedFile(null)
        setReplyingTo(null)
        setLastMessageTime(currentTime)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    }
  }

  const editMessage = async (message: Message, newText: string) => {
    if (!newText.trim()) return

    try {
      const messageRef = doc(db, 'messages', message.id)
      await updateDoc(messageRef, {
        text: encryptMessage(newText, message.userId),
        edited: true
      })
      setEditingMessage(null)
    } catch (error) {
      console.error('Error editing message:', error)
      alert('Failed to edit message. Please try again.')
    }
  }

  const deleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      await deleteDoc(doc(db, 'messages', messageId))
    } catch (error) {
      console.error('Error deleting message:', error)
      alert('Failed to delete message. Please try again.')
    }
  }

  const loadMoreMessages = async () => {
    if (!hasMore || loading) return
    
    setLoading(true)
    try {
      const lastMessage = messages[0]
      const messagesRef = collection(db, 'messages')
      const q = query(
        messagesRef,
        where('chatId', 'in', [guestId || user?.uid || '', 'system']),
        orderBy('timestamp', 'desc'),
        startAfter(lastMessage.timestamp),
        limit(20)
      )

      const snapshot = await getDocs(q)
      const newMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[]

      setMessages(prev => [...newMessages, ...prev])
      setHasMore(newMessages.length === 20)
    } catch (error) {
      console.error('Error loading more messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    if (target.scrollTop === 0 && hasMore) {
      loadMoreMessages()
    }
  }

  const messageGroups = groupMessagesByDate(messages)

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      {!user && !guestId ? (
        <GuestChatEntry onGuestEntry={handleGuestEntry} />
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4" onScroll={handleScroll}>
            <div ref={messagesStartRef} />
            {Object.entries(messageGroups).map(([date, dateMessages]) => (
              <div key={date} className="space-y-4">
                <div className="text-center">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    {date}
                  </span>
                </div>
                {dateMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.userId === (user?.uid || guestId) ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.userId === (user?.uid || guestId)
                          ? 'bg-[#04c7d0] text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.replyTo && (
                        <div className="text-xs mb-1 opacity-75">
                          Replying to {message.replyTo.userName}: {message.replyTo.text}
                        </div>
                      )}
                      {message.fileUrl && (
                        <div className="mb-2">
                          {message.fileType?.startsWith('image/') ? (
                            <img
                              src={message.fileUrl}
                              alt={message.fileName || 'Uploaded file'}
                              className="max-w-full rounded-lg"
                            />
                          ) : (
                            <a
                              href={message.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-sm hover:underline"
                            >
                              <FileText className="w-4 h-4 mr-1" />
                              {message.fileName || 'Download file'}
                            </a>
                          )}
                        </div>
                      )}
                      <div className="flex items-start">
                        <div className="flex-1">
                          <p className="text-sm">{message.text}</p>
                          <div className="flex items-center mt-1 space-x-2 text-xs opacity-75">
                            <span>{message.userName}</span>
                            <span>{formatTimestamp(message.timestamp)}</span>
                            {message.edited && <span>(edited)</span>}
                          </div>
                        </div>
                        <MessageReactions
                          messageId={message.id}
                          reactions={message.reactions || {}}
                          userId={user?.uid || guestId}
                          onReact={handleReaction}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value)
                  handleTyping()
                }}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04c7d0]"
              />
              <FileAttachment
                onFileSelect={setSelectedFile}
                onRemove={() => setSelectedFile(null)}
                file={selectedFile}
              />
              <button
                type="submit"
                disabled={!newMessage.trim() && !selectedFile}
                className="bg-[#04c7d0] text-white p-2 rounded-lg hover:bg-[#03b5bc] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            {isTyping && (
              <div className="text-xs text-gray-500 mt-1">
                {user?.displayName || guestName} is typing...
              </div>
            )}
          </form>
        </>
      )}
    </div>
  )
}

export default Chat 