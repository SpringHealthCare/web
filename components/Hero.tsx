'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { AppointmentPopup } from './AppontmentPopup';
import { useState } from 'react';

export default function Hero() {

   const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#2A9D8F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-screen py-20">
          {/* Left column - Text content */}
          <div className="text-white space-y-6">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              A service that leaves you with a Smile, Confidence and Comfort.
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl opacity-90 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We strive to provide exceptional healthcare services tailored to meet your needs. 
              Our consultations are designed to ensure that you receive personalized care and 
              attention from our team of experienced healthcare professionals.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                onClick={()=> setIsPopupOpen(true)}
                className="inline-block bg-[#1B5E56] text-white px-8 py-3 rounded-md font-medium 
                          hover:bg-[#164e46] transition-colors duration-300 cursor-pointer"
              >
                Book an Appointment
              </a>
              <a
                href="#services"
                className="inline-block bg-white text-[#2A9D8F] px-8 py-3 rounded-md font-medium 
                          hover:bg-gray-100 transition-colors duration-300"
              >
                Our Services
              </a>
            </motion.div>
          </div>
          
          {/* Right column - Image */}
          <motion.div 
            className="relative h-screen lg:h-screen rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
        src="https://drive.google.com/uc?export=view&id=1k15v2c-KWBqmx92_xpTYVJPvKF_LieG8"
        alt="Healthcare professional with patient"
        fill
        className="object-cover"
        priority
      />
          </motion.div>
        </div>
      </div>
      <div><AppointmentPopup isOpen={isPopupOpen} onClose={()=> setIsPopupOpen(false)}/></div>
    </div>
  )
}

