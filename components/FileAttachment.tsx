import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, FileText, Image, File } from 'lucide-react'

interface FileAttachmentProps {
  onFileSelect: (file: File) => void
  onRemove: () => void
  file?: File
}

export default function FileAttachment({ onFileSelect, onRemove, file }: FileAttachmentProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      onFileSelect(droppedFile)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      onFileSelect(selectedFile)
    }
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-6 h-6" />
    }
    if (file.type === 'application/pdf') {
      return <FileText className="w-6 h-6" />
    }
    return <File className="w-6 h-6" />
  }

  return (
    <div className="space-y-2">
      {file ? (
        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
          {getFileIcon(file)}
          <span className="text-sm truncate flex-1">{file.name}</span>
          <button
            onClick={onRemove}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Remove file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-6 h-6 text-gray-400" />
            <p className="text-sm text-gray-600">
              Drag and drop a file here, or click to select
            </p>
            <p className="text-xs text-gray-500">
              Supported formats: Images, PDF, DOC, TXT
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
} 