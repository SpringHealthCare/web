'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function About() {
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
              About Spring Health Care Ltd
            </h2>
            
            {/* Brief History Section */}
            <div>
              <h3 className="text-lg font-semibold text-[#04c7d0] mb-3">Brief History</h3>
              <p className="text-gray-600">
                Spring Health Care Limited, formerly known as Info Health Limited, started operations in October 2009. Beginning with a focus on cervical and prostate cancer awareness and screening, the organization expanded its services to include comprehensive Obstetric & Gynaecological Services. Through consistency in providing excellent and quality Obs. & Gynae. Services, Spring Health Care Ltd. has grown to become a trusted provider of quality healthcare services.
              </p>
            </div>

            {/* Founder Biography Section */}
            <div>
              <h3 className="text-lg font-semibold text-[#04c7d0] mb-3">Our Founder</h3>
              <p className="text-gray-600">
                Dr. Francis Bitasimi Bilson founded Spring Health Care Limited with a vision to operate a private diagnostic centre providing individualized care. A graduate of the University of Ghana Medical School and a Specialist Obstetrician-Gynaecologist, Dr. Bilson was known for his innovative approach to healthcare, including the MEDICS 24/7 project during the COVID-19 pandemic and the establishment of the Spring Health Care Ltd Men's clinic.
              </p>
            </div>

            {/* Read More Button */}
            <Link href="/about">
              <Button 
                className="bg-gradient-to-r from-[#04c7d0] to-[#7e40b6] text-white hover:opacity-90 transition-opacity"
              >
                Read Full Story
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

