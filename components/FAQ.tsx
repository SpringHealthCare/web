'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import { Input } from '@/components/ui/input'

// FAQ data structure
const faqData = {
  'General Questions': [
    {
      question: "What services does Spring Health Care provide?",
      answer: "Spring Health Care offers a comprehensive range of services including Obstetric & Gynaecological Services, 3D/4D Scans, Fertility Treatment, Executive Men's Clinic, Women's Wellness Services, and more. Our services are designed to provide complete healthcare solutions for both men and women."
    },
    {
      question: "Do I need a referral to book an appointment?",
      answer: "No, you don't need a referral to book an appointment with us. You can directly schedule a consultation through our website, WhatsApp, or by calling our office."
    },
    {
      question: "What are your working hours?",
      answer: "We are open Monday to Friday from 8:00 AM to 6:00 PM, and Saturday from 9:00 AM to 4:00 PM. We are closed on Sundays and public holidays."
    }
  ],
  'Appointments & Bookings': [
    {
      question: "How can I book an appointment?",
      answer: "You can book an appointment in several ways: through our online booking form on the website, via WhatsApp, by calling us at 0559331679, or by visiting our facility in person."
    },
    {
      question: "What should I bring to my appointment?",
      answer: "Please bring any relevant medical records, previous scan reports, referral letters (if any), and a valid ID. For scan appointments, please follow any specific preparation instructions provided."
    },
    {
      question: "Can I reschedule or cancel my appointment?",
      answer: "Yes, you can reschedule or cancel your appointment. We appreciate at least 24 hours notice for any changes to allow other patients to use the slot."
    }
  ],
  'Services & Procedures': [
    {
      question: "What is included in the 3D/4D scan package?",
      answer: "Our 3D/4D scan package includes a detailed ultrasound examination, multiple 3D/4D images of your baby, gender determination (if desired), and digital copies of the images. The session typically takes 30-45 minutes."
    },
    {
      question: "How early can I get a gender scan?",
      answer: "We can determine your baby's gender with 95% accuracy as early as 16 weeks into your pregnancy. The scan also includes a general well-being check of your baby."
    },
    {
      question: "What fertility services do you offer?",
      answer: "We offer comprehensive fertility services including fertility assessments, ovulation tracking, fertility scans, and treatment planning. We work closely with couples to identify and address fertility challenges."
    }
  ],
  'Payment & Insurance': [
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash, credit/debit cards, mobile money, and bank transfers. Payment is required at the time of service."
    },
    {
      question: "Do you accept insurance?",
      answer: "Yes, we work with several insurance providers. Please contact our office to verify if we accept your specific insurance plan."
    },
    {
      question: "Are there any hidden costs?",
      answer: "No, we are transparent about our pricing. You will be informed of all costs before any procedure or treatment begins."
    }
  ]
}

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set())

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase())
  }

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category)
  }

  // Toggle question expansion
  const toggleQuestion = (question: string) => {
    const newExpanded = new Set(expandedQuestions)
    if (expandedQuestions.has(question)) {
      newExpanded.delete(question)
    } else {
      newExpanded.add(question)
    }
    setExpandedQuestions(newExpanded)
  }

  // Filter FAQ items based on search
  const filterFAQs = () => {
    if (!searchQuery) return faqData

    const filtered: { [key: string]: Array<{ question: string; answer: string }> } = {}

    Object.entries(faqData).forEach(([category, items]) => {
      const filteredItems = items.filter(
        item =>
          item.question.toLowerCase().includes(searchQuery) ||
          item.answer.toLowerCase().includes(searchQuery)
      )
      if (filteredItems.length > 0) {
        filtered[category] = filteredItems
      }
    })

    return filtered
  }

  const filteredData = filterFAQs()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-[#1D4451] mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Find answers to common questions about our services, appointments, and procedures.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search FAQ..."
              className="pl-10 border-gray-200 focus:border-[#04c7d0] focus:ring-[#04c7d0]"
              onChange={handleSearch}
            />
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {Object.entries(filteredData).map(([category, items], categoryIndex) => (
            <div
              key={category}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-[#04c7d0] to-[#7e40b6] text-white"
              >
                <h3 className="text-lg font-semibold">{category}</h3>
                {activeCategory === category ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>

              {/* Questions in Category */}
              {activeCategory === category && (
                <div className="p-6 space-y-4 bg-gradient-to-br from-[#04c7d0]/5 to-[#7e40b6]/5">
                  {items.map((item, itemIndex) => (
                    <div key={item.question} className="border rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleQuestion(item.question)}
                        className="w-full px-4 py-3 flex justify-between items-center text-left hover:bg-gray-50"
                      >
                        <h4 className="font-medium text-[#1D4451] pr-8">{item.question}</h4>
                        {expandedQuestions.has(item.question) ? (
                          <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {expandedQuestions.has(item.question) && (
                        <div className="px-4 py-3 bg-white border-t">
                          <p className="text-gray-600">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 