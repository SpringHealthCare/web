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
    <footer className="bg-gradient-to-br from-[#04c7d0] via-[#7e40b6] to-[#04c7d0] text-white py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 20px 20px, white 2px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Spring Health Care</h3>
            <p className="mb-4 text-gray-100">Providing exceptional healthcare services tailored to meet your needs.</p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100063697982667" 
                 className="hover:text-white text-gray-200 transition-colors duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" 
                 className="hover:text-white text-gray-200 transition-colors duration-300">
                <Instagram size={24} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-200 hover:text-white transition-colors duration-300" onClick={(e) => handleScroll(e, '#about')}>About Us</a></li>
              <li><a href="#services" className="text-gray-200 hover:text-white transition-colors duration-300" onClick={(e) => handleScroll(e, '#services')}>Our Services</a></li>
              <li><a href="#team" className="text-gray-200 hover:text-white transition-colors duration-300" onClick={(e) => handleScroll(e, '#team')}>Our Team</a></li>
              <li><a href="#appointment" className="text-gray-200 hover:text-white transition-colors duration-300" onClick={(e) => handleScroll(e, '#appointment')}>Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-200 hover:text-white transition-colors duration-300" onClick={(e) => handleScroll(e, '#services')}>Obstetrics</a></li>
              <li><a href="#services" className="text-gray-200 hover:text-white transition-colors duration-300" onClick={(e) => handleScroll(e, '#services')}>Gynecology</a></li>
              <li><a href="#services" className="text-gray-200 hover:text-white transition-colors duration-300" onClick={(e) => handleScroll(e, '#services')}>Fertility Treatment</a></li>
              <li><a href="#services" className="text-gray-200 hover:text-white transition-colors duration-300" onClick={(e) => handleScroll(e, '#services')}>Ultrasound Scans</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <p className="mb-2 text-gray-200">Gliffard Road, Opp. Shell Filing Station, Accra, Ghana</p>
            <p className="mb-2 text-gray-200">Phone: +233 55 933 1679</p>
            <p className="mb-2 text-gray-200">Email: springhealthltd@gmail.com</p>
            <p className="text-gray-200">Mon - Fri: 8:00 AM - 6:00 PM</p>
            <p className="text-gray-200">Sat - 9:00 AM - 4:00 PM</p>
          </div>
        </div>
        <div className='flex flex-row w-full justify-between'>
          <div className="border-t border-white/20 mt-8 pt-8 text-center items-start w-full">
            <p className="text-gray-200">&copy; 2025 Spring Health Care Ltd. All rights reserved.</p>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center items-start w-full">
            <p className="text-gray-200">&copy; 2025 Created By KoalTechs</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

