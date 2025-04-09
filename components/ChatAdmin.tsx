'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, User, MessageSquare, Search, Edit2, Trash2, Reply, X, File } from 'lucide-react'
import { auth, db, storage } from '@/lib/firebase'
import { 
  collection, 
  query, 
  orderBy, 
  where,
  limit, 
  addDoc, 
  serverTimestamp,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useAuthState } from 'react-firebase-hooks/auth'
import MessageReactions from './MessageReactions'
import FileAttachment from './FileAttachment'
import { formatTimestamp, groupMessagesByDate, encryptMessage, decryptMessage, formatMessageText, isSpam, rateLimitCheck } from '@/utils/chatUtils'

interface ChatUser {
  id: string
  name: string
  type: 'guest' | 'registered'
  lastActive: any
  status: 'online' | 'offline'
  lastMessage?: string
  lastMessageTime?: any
  isTyping?: boolean
}

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

const ChatAdmin = () => {
  const [user] = useAuthState(auth)
  const [users, setUsers] = useState<ChatUser[]>([])
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [editingMessage, setEditingMessage] = useState<Message | null>(null)
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const [lastMessageTime, setLastMessageTime] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Fetch all users and their last messages
  useEffect(() => {
    const usersRef = collection(db, 'users')
    const q = query(
      usersRef,
      where('type', 'in', ['guest', 'registered']),
      orderBy('lastActive', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersList = snapshot.docs.map(doc => ({
        ...doc.data()
      })) as ChatUser[]
      setUsers(usersList)
    })

    return () => unsubscribe()
  }, [])

  // Fetch messages for selected user
  useEffect(() => {
    if (!selectedUser) return

    const messagesRef = collection(db, 'messages')
    const q = query(
      messagesRef,
      where('chatId', '==', selectedUser.id),
      orderBy('timestamp', 'desc'),
      limit(50)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[]
      setMessages(newMessages.reverse())
    })

    return () => unsubscribe()
  }, [selectedUser])

  const uploadFile = async (file: File) => {
    const fileRef = ref(storage, `chat-files/${selectedUser?.id}/${Date.now()}-${file.name}`)
    await uploadBytes(fileRef, file)
    return getDownloadURL(fileRef)
  }

  const handleReaction = async (messageId: string, reaction: string) => {
    const messageRef = doc(db, 'messages', messageId)
    const message = messages.find(m => m.id === messageId)
    
    if (!message) return

    const currentReactions = message.reactions || {}
    const currentUsers = currentReactions[reaction] || []
    const currentId = user?.uid

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
    if ((!newMessage.trim() && !selectedFile) || !user || !selectedUser) return

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
      const timestamp = serverTimestamp()

      let fileUrl, fileName, fileType
      if (selectedFile) {
        fileUrl = await uploadFile(selectedFile)
        fileName = selectedFile.name
        fileType = selectedFile.type
      }

      // Update last message in users collection
      await setDoc(doc(db, 'users', selectedUser.id), {
        lastMessage: newMessage,
        lastMessageTime: timestamp,
        lastActive: timestamp
      }, { merge: true })

      // Add the message
      const messageData = {
        text: encryptMessage(newMessage, user.uid),
        userId: user.uid,
        userName: user.displayName || user.email || 'Admin',
        timestamp: timestamp,
        isProfessional: true,
        chatId: selectedUser.id,
        isAdmin: true,
        fileUrl,
        fileName,
        fileType,
        replyTo: replyingTo ? {
          id: replyingTo.id,
          text: replyingTo.text,
          userName: replyingTo.userName
        } : undefined
      }

      await addDoc(collection(db, 'messages'), messageData)
      setNewMessage('')
      setSelectedFile(null)
      setReplyingTo(null)
      setLastMessageTime(currentTime)
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

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const messageGroups = groupMessagesByDate(messages)

  return (
    <div className="w-full h-[calc(100vh-5rem)] flex">
      {/* Users List Sidebar */}
      <div className="w-1/4 border-r bg-white overflow-hidden flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04c7d0] text-sm"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map((chatUser) => (
            <motion.button
              key={chatUser.id}
              onClick={() => setSelectedUser(chatUser)}
              className={`w-full p-4 text-left hover:bg-gray-50 border-b transition-colors ${
                selectedUser?.id === chatUser.id ? 'bg-gray-50' : ''
              }`}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#04c7d0] flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    chatUser.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 truncate">{chatUser.name}</h3>
                    <span className="text-xs text-gray-500">
                      {chatUser.lastMessageTime ? formatTimestamp(chatUser.lastMessageTime) : formatTimestamp(chatUser.lastActive)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {chatUser.lastMessage || (chatUser.type === 'guest' ? 'Guest User' : 'Registered User')}
                  </p>
                  {chatUser.isTyping && (
                    <p className="text-xs text-blue-500">Typing...</p>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedUser ? (
          <>
            <div className="bg-white border-b p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#04c7d0] flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    selectedUser.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div>
                  <h2 className="font-medium text-gray-900">{selectedUser.name}</h2>
                  <p className="text-sm text-gray-500">
                    {selectedUser.type === 'guest' ? 'Guest User' : 'Registered User'} · {
                      selectedUser.status === 'online' ? 'Online' : 'Last active ' + formatTimestamp(selectedUser.lastActive)
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {Object.entries(messageGroups).map(([date, groupMessages]) => (
                <div key={date} className="mb-4">
                  <div className="text-center mb-4">
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {date}
                    </span>
                  </div>
                  {groupMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-4 ${
                        message.isProfessional ? 'flex justify-end' : 'flex justify-start'
                      }`}
                    >
                      <div className="max-w-[70%]">
                        {message.replyTo && (
                          <div className="text-xs text-gray-500 mb-1">
                            Replying to {message.replyTo.userName}: {message.replyTo.text}
                          </div>
                        )}
                        <div
                          className={`rounded-lg p-3 ${
                            message.isProfessional
                              ? 'bg-[#04c7d0] text-white'
                              : 'bg-white text-gray-900'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {message.isProfessional ? (
                              <MessageSquare className="w-4 h-4" />
                            ) : (
                              <User className="w-4 h-4" />
                            )}
                            <span className="text-sm font-medium">{message.userName}</span>
                          </div>
                          <div 
                            className="text-sm"
                            dangerouslySetInnerHTML={{ 
                              __html: formatMessageText(decryptMessage(message.text, message.userId))
                            }}
                          />
                          {message.fileUrl && (
                            <div className="mt-2">
                              {message.fileType?.startsWith('image/') ? (
                                <img 
                                  src={message.fileUrl} 
                                  alt={message.fileName} 
                                  className="max-w-full rounded-lg"
                                />
                              ) : (
                                <a 
                                  href={message.fileUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-sm text-blue-500 hover:underline"
                                >
                                  <File className="w-4 h-4" />
                                  {message.fileName}
                                </a>
                              )}
                            </div>
                          )}
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs opacity-70">
                              {formatTimestamp(message.timestamp)}
                              {message.edited && ' (edited)'}
                            </span>
                            <div className="flex items-center gap-2">
                              {message.isProfessional && (
                                <>
                                  <button
                                    onClick={() => setEditingMessage(message)}
                                    className="text-xs opacity-70 hover:opacity-100"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => deleteMessage(message.id)}
                                    className="text-xs opacity-70 hover:opacity-100"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => setReplyingTo(message)}
                                className="text-xs opacity-70 hover:opacity-100"
                              >
                                <Reply className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <MessageReactions
                            messageId={message.id}
                            reactions={message.reactions || {}}
                            userId={user?.uid || ''}
                            onReact={handleReaction}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="p-4 bg-white border-t">
              {replyingTo && (
                <div className="mb-2 p-2 bg-gray-50 rounded-lg flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Replying to {replyingTo.userName}: {replyingTo.text}
                  </div>
                  <button
                    type="button"
                    onClick={() => setReplyingTo(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <FileAttachment
                file={selectedFile}
                onFileSelect={setSelectedFile}
                onRemove={() => setSelectedFile(null)}
              />
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04c7d0]"
                />
                <button
                  type="submit"
                  className="bg-[#04c7d0] text-white px-4 py-2 rounded-lg hover:bg-[#03b5bc] transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Select a conversation</h3>
              <p className="text-gray-500">Choose a user from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatAdmin 