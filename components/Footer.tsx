'use client'

import { Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer className="bg-teal-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Spring Health Care</h3>
            <p className="mb-4">Providing exceptional healthcare services tailored to meet your needs.</p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100063697982667" className="hover:text-teal-300"><Facebook size={24} /></a>
              
              <a href="#" className="hover:text-teal-300"><Instagram size={24} /></a>
              
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-teal-300" onClick={(e) => handleScroll(e, '#about')}>About Us</a></li>
              <li><a href="#services" className="hover:text-teal-300" onClick={(e) => handleScroll(e, '#services')}>Our Services</a></li>
              <li><a href="#team" className="hover:text-teal-300" onClick={(e) => handleScroll(e, '#team')}>Our Team</a></li>
              <li><a href="#appointment" className="hover:text-teal-300" onClick={(e) => handleScroll(e, '#appointment')}>Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-teal-300" onClick={(e) => handleScroll(e, '#services')}>Obstetrics</a></li>
              <li><a href="#services" className="hover:text-teal-300" onClick={(e) => handleScroll(e, '#services')}>Gynecology</a></li>
              <li><a href="#services" className="hover:text-teal-300" onClick={(e) => handleScroll(e, '#services')}>Fertility Treatment</a></li>
              <li><a href="#services" className="hover:text-teal-300" onClick={(e) => handleScroll(e, '#services')}>Ultrasound Scans</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <p className="mb-2">Gliffard Road, Opp. Shell Filing Station, Accra, Ghana</p>
            <p className="mb-2">Phone: +233 55 933 1679</p>
            <p className="mb-2">Email: springhealthltd@gmail.com</p>
            <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
            <p>Sat - 9:00 AM - 4:00 PM</p>
          </div>
        </div>
        <div className='flex flex-row w-full justify-between'>
          <div className="border-t border-teal-700 mt-8 pt-8 text-center items-start w-full">
            <p>&copy; 2025 Spring Health Care Ltd. All rights reserved.</p>
          </div>
          <div className="border-t border-teal-700 mt-8 pt-8 text-center items-start w-full">
            <p>&copy; 2025 Created By KoalTechs</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

