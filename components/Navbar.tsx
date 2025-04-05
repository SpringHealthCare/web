'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { href: '#about', label: 'About Us' },
    { href: '#services', label: 'Services' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#appointment', label: 'Contact' },
    { href: '#team', label: 'Meet Us' },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      })
    }
    if (isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="#" 
            className={cn(
              'text-xl font-semibold transition-colors duration-300',
              isScrolled ? 'text-teal-600' : 'text-white'
            )}
            onClick={(e) => handleScroll(e, '#')}
          >
            Spring Health Care Ltd.
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors duration-300 hover:text-teal-500',
                  isScrolled ? 'text-gray-600' : 'text-white'
                )}
                onClick={(e) => handleScroll(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className={isScrolled ? 'text-gray-600' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-gray-600' : 'text-white'} />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <motion.div
          className={cn(
            'md:hidden fixed inset-0 bg-white z-40',
            isOpen ? 'block' : 'hidden'
          )}
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : '100%' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xl text-gray-800 hover:text-teal-600 transition-colors duration-300"
                onClick={(e) => handleScroll(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}

