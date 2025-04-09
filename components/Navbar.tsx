'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import { handleNavLinkClick } from '@/utils/scrollUtils'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasEnoughContent, setHasEnoughContent] = useState(false)
  const pathname = usePathname()
  const [user] = useAuthState(auth)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const checkContentHeight = () => {
      const bodyHeight = document.body.scrollHeight
      const viewportHeight = window.innerHeight
      setHasEnoughContent(bodyHeight > viewportHeight * 1.5)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', checkContentHeight)
    checkContentHeight() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkContentHeight)
    }
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About', sectionId: 'about' },
    { href: '/team', label: 'Team', sectionId: 'team' },
    { href: '/services', label: 'Services', sectionId: 'services' },
    { href: '/faq', label: 'FAQ' },
    { href: '/chat', label: 'Chat', sectionId: 'chat' },
    ...(user?.email?.includes('@springhealth.com') ? [{ href: '/admin/chat', label: 'Admin Chat' }] : []),
  ]

  // Determine if the navbar should be transparent
  const shouldBeTransparent = pathname === '/' && !isScrolled && hasEnoughContent

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldBeTransparent
          ? 'bg-transparent'
          : 'bg-white/90 backdrop-blur-md shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className={`text-2xl font-bold ${
              shouldBeTransparent ? 'text-white' : 'text-[#04c7d0]'
            }`}>
              Spring Health Care
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.sectionId ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleNavLinkClick(e, link.sectionId!, pathname)
                    if (isOpen) setIsOpen(false)
                  }}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    shouldBeTransparent
                      ? 'text-white hover:text-gray-200'
                      : 'text-gray-700 hover:text-[#04c7d0]'
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    shouldBeTransparent
                      ? 'text-white hover:text-gray-200'
                      : 'text-gray-700 hover:text-[#04c7d0]'
                  }`}
                  onClick={() => isOpen && setIsOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
            <a
              href="tel:+233559331679"
              className="flex items-center gap-2 text-white bg-[#04c7d0] hover:bg-[#7e40b6] px-4 py-2 rounded-full transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Call Us</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#04c7d0] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              link.sectionId ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleNavLinkClick(e, link.sectionId!, pathname)
                    setIsOpen(false)
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    shouldBeTransparent
                      ? 'text-white hover:bg-white/10'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    shouldBeTransparent
                      ? 'text-white hover:bg-white/10'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
            <a
              href="tel:+233559331679"
              className="flex items-center gap-2 text-white bg-[#04c7d0] hover:bg-[#7e40b6] px-4 py-2 rounded-full transition-colors mt-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us</span>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar

