'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQCategory {
  category: string
  questions: FAQItem[]
}

const faqData: FAQCategory[] = [
  {
    category: 'General Questions',
    questions: [
      {
        id: 'gen-1',
        question: 'What are your operating hours?',
        answer: 'We are open Monday to Friday from 8:00 AM to 5:00 PM, and Saturday from 9:00 AM to 1:00 PM. We are closed on Sundays and public holidays.'
      },
      {
        id: 'gen-2',
        question: 'Do I need to make an appointment?',
        answer: 'While walk-ins are welcome, we highly recommend making an appointment to ensure you receive prompt attention and minimize waiting time.'
      },
      {
        id: 'gen-3',
        question: 'What documents should I bring for my first visit?',
        answer: 'Please bring your ID card, insurance card (if applicable), and any relevant medical records or test results from previous consultations.'
      }
    ]
  },
  {
    category: 'Appointments & Bookings',
    questions: [
      {
        id: 'app-1',
        question: 'How do I book an appointment?',
        answer: 'You can book an appointment through our website, by calling our reception, or by visiting our facility in person.'
      },
      {
        id: 'app-2',
        question: 'Can I reschedule or cancel my appointment?',
        answer: 'Yes, you can reschedule or cancel your appointment up to 24 hours before your scheduled time. Please contact our reception to make changes.'
      },
      {
        id: 'app-3',
        question: 'What happens if I miss my appointment?',
        answer: 'If you miss your appointment without prior notice, you may be subject to a missed appointment fee. Please contact us as soon as possible if you need to reschedule.'
      }
    ]
  },
  {
    category: 'Services & Procedures',
    questions: [
      {
        id: 'svc-1',
        question: 'What services do you offer?',
        answer: 'We offer a wide range of healthcare services including general consultations, specialized treatments, diagnostic services, and preventive care programs.'
      },
      {
        id: 'svc-2',
        question: 'Do you provide emergency services?',
        answer: 'We handle urgent cases during our operating hours. For life-threatening emergencies, please call emergency services immediately.'
      },
      {
        id: 'svc-3',
        question: 'How do I prepare for a procedure?',
        answer: 'Preparation instructions vary depending on the procedure. Your healthcare provider will give you specific instructions during your consultation.'
      }
    ]
  },
  {
    category: 'Payment & Insurance',
    questions: [
      {
        id: 'pay-1',
        question: 'What payment methods do you accept?',
        answer: 'We accept cash, credit/debit cards, mobile money, and most major insurance plans. Please check with our reception for specific payment options.'
      },
      {
        id: 'pay-2',
        question: 'Do you accept insurance?',
        answer: 'Yes, we accept most major insurance plans. Please bring your insurance card and any necessary documentation for your visit.'
      },
      {
        id: 'pay-3',
        question: 'Can I get an estimate of costs before my visit?',
        answer: 'Yes, we can provide cost estimates for most services. Please contact our reception for detailed pricing information.'
      }
    ]
  }
]

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<number[]>([])
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([])

  const toggleCategory = (index: number) => {
    setExpandedCategories(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const toggleQuestion = (id: string) => {
    setExpandedQuestions(prev =>
      prev.includes(id)
        ? prev.filter(qId => qId !== id)
        : [...prev, id]
    )
  }

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04c7d0]"
        />
      </div>

      <div className="space-y-6">
        {filteredFAQs.map((category, idx) => (
          <div key={category.category} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(idx)}
              className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-[#04c7d0] to-[#7e40b6] text-white"
            >
              <h2 className="text-lg font-semibold">{category.category}</h2>
              <ChevronDown
                className={cn(
                  'transform transition-transform duration-200',
                  expandedCategories.includes(idx) ? 'rotate-180' : ''
                )}
              />
            </button>

            <AnimatePresence>
              {expandedCategories.includes(idx) && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 space-y-4">
                    {category.questions.map((item) => (
                      <div key={item.id} className="border rounded-lg">
                        <button
                          onClick={() => toggleQuestion(item.id)}
                          className="w-full px-4 py-3 flex justify-between items-center text-left hover:bg-gray-50"
                        >
                          <h3 className="font-medium pr-8">{item.question}</h3>
                          <ChevronDown
                            className={cn(
                              'flex-shrink-0 transform transition-transform duration-200',
                              expandedQuestions.includes(item.id) ? 'rotate-180' : ''
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {expandedQuestions.includes(item.id) && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="px-4 py-3 text-gray-600 border-t">
                                {item.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <p className="text-center text-gray-600">
          No FAQs found matching your search. We&apos;re here to help - please try different keywords or contact us directly.
        </p>
      )}
    </div>
  )
}

export default FAQ 