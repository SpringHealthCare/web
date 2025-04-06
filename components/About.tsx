'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trophy, Syringe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AboutPopup } from './AboutPopup'
import { useState } from 'react'

export default function About() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Dotted pattern background */}
      <div className="absolute top-0 left-1/4 w-48 h-48 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(#04c7d0 2px, transparent 2px)',
          backgroundSize: '24px 24px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Image
              src="https://drive.google.com/uc?export=view&id=1byKolDi3pvkKAEfuBH44ZZKsi8iXzPcl"
              alt="Medical consultation"
              width={600}
              height={500}
              className="rounded-2xl shadow-lg"
            />
          </motion.div>

          {/* Right column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-[#04c7d0] font-medium">About</span>
            
            <h2 className="text-[#1D4451] text-4xl font-bold">
              Obs and Gynae Clinic
            </h2>
            
            <p className="text-gray-600 text-lg">
              Our Gynaecological pelvic scan offers a thorough examination of your 
              womb, fallopian tubes and ovaries. This helps in detecting many 
              gynaecological conditions.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-[#04c7d0]/10 p-3 rounded-lg">
                  <Trophy className="w-6 h-6 text-[#04c7d0]" />
                </div>
                <div>
                  <h3 className="text-[#1D4451] font-semibold text-xl mb-2">
                    Years of Excellence
                  </h3>
                  <p className="text-gray-600">
                    At SHC, we are passionate about providing exceptional care in a 
                    warm and welcoming environment.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-[#04c7d0]/10 p-3 rounded-lg">
                  <Syringe className="w-6 h-6 text-[#04c7d0]" />
                </div>
                <div>
                  <h3 className="text-[#1D4451] font-semibold text-xl mb-2">
                    100% Satisfied Patients
                  </h3>
                  <p className="text-gray-600">
                    Over 10,000 satisfied patients have entrusted their Fertility care, 
                    Obstetrics, Antenatal, 4D scans and Gynaecological care to Spring 
                    Health Care Ltd.
                  </p>
                </div>
              </div>
            </div>

            <Button
              variant="link"
              className="text-[#04c7d0] hover:text-[#7e40b6] font-medium p-0 h-auto mt-6"
              onClick={() => setIsPopupOpen(true)}
            >
              More about Us
            </Button>
          </motion.div>
        </div>
      </div>
      <AboutPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </section>
  )
}

