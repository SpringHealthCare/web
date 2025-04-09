'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { AppointmentPopup } from './AppointmentPopup'

export default function Appointment() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const workingHours = [
    { day: 'Monday', hours: '07:00 - 6:00' },
    { day: 'Tuesday', hours: '07:00 - 6:00' },
    { day: 'Wednesday', hours: '07:00 - 6:00' },
    { day: 'Thursday', hours: '07:00 - 6:00' },
    { day: 'Friday', hours: '07:00 - 6:00' },
    { day: 'Saturday', hours: '07:00 - 5:00' },
    { day: 'Sunday', hours: 'Closed' },
  ]

  return (
    <div className="relative bg-gradient-to-br from-[#04c7d0] via-[#7e40b6] to-[#04c7d0] min-h-screen p-8">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 20px 20px, white 2px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <h1 className="text-white text-4xl font-bold mb-4">Book an Appointment</h1>
          <p className="text-gray-100 text-lg max-w-md">
            Schedule your visit now for personalized care in a comfortable environment. Your journey to a brighter, healthier smile begins here.
          </p>
        </div>

        <div className="relative">          
          <div className="flex flex-col md:flex-row items-center">
            {/* Schedule column */}
            <div className="w-full md:w-[40%] z-10">
              <div className="bg-gradient-to-br from-[#7e40b6] to-[#04c7d0] text-white p-8 rounded-lg shadow-xl">
                <h2 className="text-xl mb-6 font-semibold">Our Working Program</h2>
                <div className="space-y-4">
                  {workingHours.map((schedule) => (
                    <div key={schedule.day} className="flex justify-between items-center border-b border-white/20 pb-2">
                      <span className="text-gray-100">{schedule.day}</span>
                      <span className="text-gray-100">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image column */}
            <div className="w-full md:w-[65%] md:-ml-[5%] relative mt-8 md:mt-0">
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7e40b6]/40 to-[#04c7d0]/40 z-10" />
                <Image
                  src="https://drive.google.com/uc?export=view&id=15H174lGct3TSGpGNQHthIb8le__ZRczS"
                  alt="Dental Office Interior"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <Button 
                    className="bg-gradient-to-r from-[#7e40b6] to-[#04c7d0] text-white hover:opacity-90 px-8 py-6 text-lg shadow-lg transition-all duration-300 hover:scale-105"
                    onClick={() => setIsPopupOpen(true)}
                  >
                    Book an Appointment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppointmentPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  )
}
